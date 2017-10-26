Ext.define('MenuTypeCombo', {
    extend: 'Ext.data.Model',
    fields: [
        'label',
        'value'
    ]
});
var CommonCode = {
	_getMenuTypeData : function() {
		var comboData = Ext.create('Ext.data.Store', {
			fields : ['label','value'],
			model : 'MenuTypeCombo',
			data : [
				{'label':'MENU', 'value':'MENU'},
				{'label':'PAGE', 'value':'PAGE'},
				{'label':'IMAGE', 'value':'IMAGE'}
			],
			autoLoad : false
		});
		return comboData;
	}	
};
var isMenuFileAttach = false;
var unlockMenu = null;
var combo = CommonCode._getMenuTypeData();
Ext.define('Ui.admin.menu.view.MenuTree', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.menutree',
	id : 'sub-menu',
    minHeight: 610,
    maxHeight: 610,
    margin: '0 0 0 2',
    bodyPadding: 10,
	border: false, 
	rootVisible :false,
	scroll : 'vertical',
	store: 'MenuTree',
	columns: [{
		xtype : 'treecolumn',
		text : '메뉴/화면명',
		width : 200,
		locked : true,
		dataIndex : 'text',
		editor: {
	        allowBlank: false
	    }
	},{
		text : '메뉴 유형',
		width: 100,
		align:'center',
		dataIndex : 'resourceTypeCode',
		editor: {
        	xtype: 'combobox',
        	displayField : 'label',
        	valueField : 'value',
			queryMode : 'local',
        	store : combo,
	        allowBlank: true
	    }
	},{
		xtype: 'checkcolumn',
		text : '메인여부',
		align:'center',
		width: 80,
		dataIndex : 'mainResource',
		editor: {
			xtype : 'checkbox',
	        allowBlank: false
	    }
	},{
		text : 'URL',
		width : 130,
		flex:1,
		dataIndex : 'url',
		editor: {
	        allowBlank: true
	    }
	}],
	listeners : {
		beforecellclick: function(tree, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
			if (Ext.getCmp('file-upload') != null) {
				Ext.getCmp('file-remove').setDisabled(true);
				isMenuFileAttach = false;
			}
			var data = record.data.resourceId;
			var grid = Ext.getCmp('sub-menu');
			var store = grid.getStore();
			var proxy = store.getProxy();
		    if (proxy != null) {
		    	if (data != 'root') {
		    		proxy.extraParams.parentResourceId = data;
		    	}
		    	
		    }
		    var form = Ext.getCmp('menu-form');
			form.getForm().loadRecord(record);
			var grid1 = Ext.getCmp('menu-service-grid');
			var store1 = grid1.getStore();
			var proxy1 = store1.getProxy();
			proxy1.extraParams.resourceId = data;
			store1.load();
			
    		if (record.data.resourceTypeCode == 'IMAGE') {
    			if (Ext.getCmp('file-upload') != null) {
    				isMenuFileAttach = true;
            		Ext.getCmp('file-remove').setDisabled(false);
            	}
    		}
    		var grid2 = Ext.getCmp('menu-file-grid');
    		var store2 = grid2.getStore(); 
        	var proxy2 = store2.getProxy();
        	proxy2.extraParams.resourceId = data;
        	store2.load();
		},
		beforeitemexpand : function( node, eOpts ) {
		},
		beforeload : function(store, operation, eOpts) {
			
		},
		beforeitemdblclick : function(grid, record, item, index, e, eOpts) {
			
			
		},
		itemdblclick : function( grid, record, item, index, e, eOpts ) {
			var content = Ext.getCmp('resourceContent');
			content.setReadOnly(false);
			
		}
	},
	plugins:[
		Ext.create('Ext.grid.plugin.RowEditing', {
		    clicksToMoveEditor: 1,
		    autoCancel: false,
		    pluginId: 'rowEditing',
		    listeners : {
		    	edit : function(editor, e) {
		    		var grid = Ext.getCmp('sub-menu');
		    		var cotnent = Ext.getCmp('resourceContent').getValue();
            		var params, url;
            		var isModify = false;
            		if (e.record.data.resourceId == null || e.record.data.resourceId == '') {
	                	params = {resourceName: e.record.data.text, parentResourceId : e.record.data.parentResourceId
	                			, url: e.record.data.url, resourceTypeCode: e.record.data.resourceTypeCode , resourceContent : cotnent, mainResourceYn : e.record.data.mainResource ? 'Y' : 'N'};
	                	url = G_PATH + '/permit/res/add.json';
	                	isModify = false;
            		} else {
            			params = {resourceId : e.record.data.resourceId, resourceName: e.record.data.text, parentResourceId : e.record.data.parentResourceId
            					, url: e.record.data.url, resourceTypeCode: e.record.data.resourceTypeCode, resourceContent : cotnent, mainResourceYn : e.record.data.mainResource ? 'Y' : 'N'};
	                	url = G_PATH + '/permit/res/content/modify.json';
	                	isModify = true;
            		}
        			Ext.Ajax.request({
	    	    	    url: url,
	    	    	    method: 'POST',
	    	    	    jsonData: Ext.encode(params),
	    	    	    success: function(response){
	    	    	    	var result = JSON.parse(response.responseText);
	    	    	    	if (result.error != null) {
	    	    				Ext.Msg.alert('Exception', result.error.message);
	    	    			} else {
	    	    				Ext.Msg.alert('Complete', '저장 되었습니다.');
	    	    				var store = grid.getStore();
	    	    				var proxy = store.getProxy();
	    	     		    	proxy.extraParams.parentResourceId = 'TOP';
	    	     		    	store.load();
	    	    			}
	    	    	    },
	    	    	    failure: function(){
	    	    	    	Ext.Msg.alert('Error', '저장 중 오류가 발생되었습니다.');
	    	    	    }
	    	    	});
        			var content = Ext.getCmp('resourceContent');
        			content.setReadOnly(true);
        			if (isModify) {
        				var url = G_PATH + '/permit/res/complete/modify.json';
						Ext.Ajax.request({
				    	    url: url,
				    	    method: 'POST',
				    	    jsonData: Ext.encode({resourceId:e.record.data.resourceId}),
				    	    success: function(response){
				    	    },
				    	    failure: function(){
				    	    	Ext.Msg.alert('Error', 'Processing Error');
				    	    }
				    	});
        			}
		    	},
		    	canceledit : function( editor, e, eOpts ) {
		    		var content = Ext.getCmp('resourceContent');
        			content.setReadOnly(true);
        			
        			if (e.record.data.resourceId != null && e.record.data.resourceId != '') {
	        			var url = G_PATH + '/permit/res/complete/modify.json';
						Ext.Ajax.request({
				    	    url: url,
				    	    method: 'POST',
				    	    jsonData: Ext.encode({resourceId:e.record.data.resourceId}),
				    	    success: function(response){
				    	    },
				    	    failure: function(){
				    	    	Ext.Msg.alert('Error', 'Processing Error');
				    	    }
				    	});
        			}
		    	},
		    	beforeedit : function(editor, e, eOpts ) {
		    		if (e.record.data.resourceId != null && e.record.data.resourceId != '') {
			    		if (unlockMenu == null || e.record.data.resourceId != unlockMenu) {
			    			Ext.Msg.alert('Info', '수정할 메뉴는 먼저 잠금해제를 해야 합니다.');
			    			return false;
			    		}
		    		}
		    	}
		    }
		})
	],
	viewConfig: {
		plugins : {
			ptype: 'treeviewdragdrop',
			enableDrag : G_IS_HADNS == 'Y' ? true : false
		},
		listeners: {
			beforedrop: function(node, data, overModel, dropPosition) {
			},
			drop: function(node, data, overModel, dropPosition) {
				var sendData = [];
				var source = data.records[0].data.parentResourceId;
				var target = dropPosition == 'append' ?  overModel.data.resourceId : overModel.data.parentResourceId;
				if (source != target) {
					data.records[0].data.parentResourceId = target;
				}
				var treeData = target === "TOP" ? Ext.getCmp('sub-menu').getStore().root.childNodes  : Ext.getCmp('sub-menu').getStore().getNodeById(target).childNodes;
				for (var i=0;i < treeData.length;i++) {
					var temp = treeData[i];
					sendData.push({resourceId : temp.data.resourceId, parentResourceId: temp.data.parentResourceId, sortNo : i});
				}
				var url = G_PATH + '/permit/res/modify.json';
				Ext.Ajax.request({
		    	    url: url,
		    	    method: 'POST',
		    	    jsonData: Ext.encode(sendData),
		    	    success: function(response){
		    	    	var result = JSON.parse(response.responseText);
		    	    	if (result.error != null) {
		    				Ext.Msg.alert('Exception', result.error.message);
		    			} else {
		    				var grid = Ext.getCmp('sub-menu');
		     		    	var store = grid.getStore();
		     		    	var proxy = store.getProxy();
		     		    	proxy.extraParams.parentResourceId = 'TOP';
		     		    	store.load();
		    			}
		    	    },
		    	    failure: function(){
		    	    	Ext.Msg.alert('Error', 'Sort Processing Error');
		    	    }
		    	});
			},
			itemcontextmenu: function(tree, record, item, index, e, eOpts) {
			},
			afterrender : function(p, eOpt) {
				
			}
		}
	}
});
var parentId;
var parentName;
var resourceType;
var ContextMenu = {
	_removeMenu : function() {
	},
	_remove : function(btn) {
	},
	_openMenu : function() {

	},
	_openMenuCheck : function(selectedData, isForce) {
		
	},
	_openMenuByModify : function(selectedData) {
		
	},
	_openMenuWindow : function (btn) {
		
	}
};

