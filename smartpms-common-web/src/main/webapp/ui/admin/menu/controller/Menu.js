Ext.define('Ui.admin.menu.controller.Menu', {
    extend: 'Ext.app.Controller',
    stores: ['MenuTree', 'File','MenuService'],
    models: ['MenuTree', 'File'],

    views: ['MenuTree'],

    refs: [{
    	ref: 'menuTree',
        selector: 'menutree'
    }],
    
    init: function() {

        this.control({
        	'menutree' : {
        		beforeload : this.subMenuBeforeLoad
        	},
            '#resourceTypeSelect' : {
            	change : this.changeResourceType
            }
        });
        
    },
	changeResourceType : function() {
		var cmp = Ext.getCmp('menu-form');
		var value = cmp.getValues().resourceTypeCode;
		var obj = Ext.getCmp('resourceContent');
		var url = Ext.getCmp('resource-url');
		if (value == "IMAGE") {
			obj.setReadOnly(false);
			url.setReadOnly(true);
		} else if(value == "MENU") {
			obj.setReadOnly(true);
			url.setReadOnly(true);
		} else {
			obj.setReadOnly(true);
			url.setReadOnly(false);
		}
		
	},
	subMenuBeforeLoad : function(store, operation, eOpts) {
		var proxy = store.getProxy();
	    var node = operation.node;
	    if (node != null && proxy != null) {
	    	if (node.data.id != 'root') {
	    		proxy.extraParams.parentResourceId = node.data.id;
	    	}
	    	
	    }
	},
	reload : function() {
		var tree = this.getMenuTree();
		tree.getStore().reload();
	}
    
});

var TreeAction = {
	modifyLock : function() {
		var grid = Ext.getCmp('sub-menu');
    	var selectMenu = grid.getSelectionModel().getSelection()[0];
    	if (selectMenu == null) {
    		Ext.Msg.alert('Info', '잠금해제할 대상을 선택하십시오.');
    		return false;
    	}
    	var url = G_PATH + '/permit/res/check/modify.json';
	   	Ext.Ajax.request({
	       url: url,
	       method: 'POST',
	       jsonData: Ext.encode({resourceId:selectMenu.data.resourceId, force : true}),
	       success: function(response){
	        var result = JSON.parse(response.responseText);
	        unlockMenu = null;
	   		if (result.error != null) {
 		   		Ext.MessageBox.confirm('Confirm', result.error.message + '.작업을 무시하고 수정하겠습니까?', function(btn) {
	   				if (btn == "yes") {
	   					unlockMenu = selectMenu.data.resourceId;
	   					Ext.Msg.alert('Info', '잠금해제 되었습니다.');
	   				}
	   			});
	   		} else {
	   			Ext.Msg.alert('Info', '잠금해제 되었습니다.');
	   			unlockMenu = selectMenu.data.resourceId;
	   		}
	       },
	       failure: function(){
	    	   Ext.Msg.alert('Error', 'Processing Error');
	       }
	   });
	},
	addMenu : function() {
		var content = Ext.getCmp('resourceContent');
    	var grid = Ext.getCmp('sub-menu');
    	var selectMenu = grid.getSelectionModel().getSelection()[0];
    	var parentResourceId = null;
    	var selectedIndex = 0;
    	content.setValue('');
		if (selectMenu == null) {
			parentResourceId = 'TOP';
			grid.getStore().getRootNode().appendChild({
				text : '',
				parentId : 'TOP',
				parentResourceId : 'TOP'
			});
			grid.getView().refresh();
		} else {
			if (selectMenu.data.resourceTypeCode != "MENU") {
				Ext.Msg.alert('Warning', '분류 타입의 메뉴에만 추가 가능합나디.');
				return false;
			}
			parentResourceId = selectMenu.data.resourceId;
			selectMenu.appendChild({
				text : '',
				parentId : parentResourceId,
				parentResourceId : parentResourceId
			});
			
			grid.getView().refresh();
			selectMenu.expand();
		}
		var content = Ext.getCmp('resourceContent');
		content.setReadOnly(false);
	},
	removeMenu : function() {
		var grid = Ext.getCmp('sub-menu');
    	var selectMenu = grid.getSelectionModel().getSelection()[0];
    	if (selectMenu == null) {
    		Ext.Msg.alert('Info', '삭제할 대상을 선택하십시오.');
    		return false;
    	}
    	Ext.MessageBox.confirm('Confirm', '선택한 메뉴를 삭제하겠습니까(복구 불가)?', function(btn){
    		if (btn == 'yes') {
    			if (selectMenu != null) {
	    			var formData = {resourceId : selectMenu.data.id };
	   			var url = G_PATH + '/permit/res/remove.json';
	   			Ext.Ajax.request({
	   	    	    url: url,
	   	    	    method: 'POST',
	   	    	    jsonData: Ext.encode(formData),
	   	    	    success: function(response){
	   	    	    	var result = JSON.parse(response.responseText);
	   	    	    	if (result.error != null) {
	   	    				Ext.Msg.alert('Exception', result.error.message);
	   	    			} else {
	   	    				Ext.Msg.alert('Complete', '삭제 되었습니다.');
	   	    				var store = grid.getStore();
 		   	    			var proxy = store.getProxy();
 		     		    	proxy.extraParams.parentResourceId = 'TOP';
	   	    				store.reload();
	   	    			}
	   	    	    },
	   	    	    failure: function(){
	   	    	    	Ext.Msg.alert('Error', '삭제 처리 중 오류가 발생되었습니다.');
	   	    	    }
	   	    	});
    			}
    		}
    	});
	}
};
var GridAction = {
	_addService : function() {
		var menuGrid = Ext.getCmp('sub-menu');
		var selectMenu = menuGrid.getSelectionModel().getSelection()[0];
		if (selectMenu != null) {
			var grid = Ext.getCmp('menu-service-grid');
			var rowEditing = grid.getPlugin('rowEditing');
	    	var store = grid.getStore();
	    	rowEditing.cancelEdit();

	        var r = Ext.create('Ext.nmenu.model.MenuTree', {
	        	parentResourceName : selectMenu.data.resourceName,
	        	parentResourceId : selectMenu.data.resourceId,
	        	resourceTypeCode : 'CONTENT'
	        });

	        store.insert(0, r);
	        rowEditing.startEdit(0, 0);
		} else {
			Ext.Msg.alert('Info', '서비스를 추가 할 메뉴/화면을 선택하십시오.');
		}
		
	},
	_removeSercie : function() {
		var grid = Ext.getCmp('menu-service-grid');
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	var record = sm.getSelection();
    	var params = new Array();
    	for (var i=0;i < record.length;i++) {
    		var r = record[i].data;
    		params.push({resourceId : r.id});
    	}
    	if (params.length > 0) {
			var url = url = G_PATH + '/permit/res/list/remove.json';
			Ext.Ajax.request({
	    	    url: url,
	    	    method: 'POST',
	    	    jsonData: Ext.encode(params),
	    	    success: function(response){
	    	    	var result = JSON.parse(response.responseText);
	    	    	if (result.error != null) {
	    				Ext.Msg.alert('Exception', result.error.message);
	    			} else {
	    				Ext.Msg.alert('Complete', '삭제 되었습니다.');
	    				grid.getStore().load();
	    			}
	    	    },
	    	    failure: function(){
	    	    	Ext.Msg.alert('Error', '삭제중 오류가 발생되었습니다.');
	    	    }
	    	});
    	} else {
    		Ext.Msg.alert('Info', '삭제할 내용이 없습니다.');
    	}
	},
	_saveService : function() {
		
	}
};