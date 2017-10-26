Ext.define('Ext.nmenu.controller.Menu', {
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
			var url = url = G_PATH + '/resource/list/remove.json';
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