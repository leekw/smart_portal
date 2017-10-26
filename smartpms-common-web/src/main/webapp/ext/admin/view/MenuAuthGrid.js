Ext.define('Ext.admin.view.MenuAuthGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.menuauthgrid',
    id : 'menu-auth-grid',
    plugins: 'gridfilters',
    maxHeight: 450,
    minHeight: 450,
    title : '역할에 포함된 권한',
    multiSelect : true,
    viewConfig : {
    	plugins : {
    		ptype : 'gridviewdragdrop',
    		dropGroup : 'menuGridDDGroup',
    		enableDrop : true,
    		enableDrag : true,
    		copy : false
    	},
    	listeners: {
			beforedrop: function(node, data, overModel, dropPosition) {
				if (SELECTED_ROlE_ID == null) {
					Ext.Msg.alert('Info', '리소스를 설정할 Role을 선택하십시오.');
					return false;
				}
			},
			drop: function(node, data, overModel, dropPosition) {
				var menu = Ext.getCmp('menu-tree');
				var param = {roleId : SELECTED_ROlE_ID, resourceId : data.records[0].data.resourceId, includeYn : 'Y'};
				
				var url = G_PATH + '/resource/role/add.json';
				var grid = Ext.getCmp('menu-auth-grid');
				Ext.Ajax.request({
		    	    url: url,
		    	    method: 'POST',
		    	    jsonData: Ext.encode(param),
		    	    success: function(response){
		    	    	var result = JSON.parse(response.responseText);
		    	    	if (result.error != null) {
		    				Ext.Msg.alert('Exception', result.error.message);
		    			} else {
		    				grid.getStore().load();
		    			}
//		    	    	menu.getStore().getProxy().extraParams.parentResourceId = 'LIMIT';
//	    				menu.getStore().getProxy().extraParams.viewType ='ALL'; 
//	    				menu.getStore().load();
		    	    },
		    	    failure: function(){
		    	    	Ext.Msg.alert('Error', '저장중 오류가 발생되었습니다.');
//		    	    	menu.getStore().getProxy().extraParams.parentResourceId = 'LIMIT';
//	    				menu.getStore().getProxy().extraParams.viewType ='ALL'; 
//	    				menu.getStore().load();
		    	    }
		    	});
				
			}
    	}
    },
    initComponent: function() {
    	
        this.store = 'MenuAuth';
        
       
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'no',
			width: 40
		}), { 
            header: '리소스 아이디',
            dataIndex: 'resourceId',
            width: 150
        }, { 
            header: '리소스 명',
            dataIndex: 'resourceName',
            width: 200,
            filter: {
            	type: 'string'
            },
            
            flex:1
        }, { 
            header: '리소스 유형',
            dataIndex: 'resourceType',
            width: 150,
            filter: {
            	type: 'list'
            }
        }, { 
            header: '제외여부',
            dataIndex: 'exclude',
            columnHeaderCheckbox : true,
            width: 100,
            xtype:'checkcolumn',
            listeners : {
            	checkchange : function ( checkbox, rowIndex, checked, eOpts ) {
            		var grid = Ext.getCmp('menu-auth-grid');
            		var data = grid.getStore().getAt(rowIndex).data;
            		var resourceId = data.resourceId;
            		var roleId = data.roleId;
            		AuthHandler._exclude(resourceId, roleId, checked);
            	}
            }
        }
        ];
        
        this.tbar = [{
            text: '삭제',
            action:'remove-resource-record',
            ui : 'gray'
        }];
        
        this.callParent(arguments);
    },
    listeners : {
    	
    }
});    

var AuthHandler = {
	_exclude : function(resourceId, roleId, checked) {
		var grid = Ext.getCmp('menu-auth-grid');
		var param = {resourceId:resourceId, roleId: roleId, includeYn: (checked ? 'N' : 'Y')};
		var url = G_PATH + '/resource/role/modify.json';
		Ext.Ajax.request({
    	    url: url,
    	    method: 'POST',
    	    jsonData: Ext.encode(param),
    	    success: function(response){
    	    	var result = JSON.parse(response.responseText);
    	    	if (result.error != null) {
    				Ext.Msg.alert('Exception', result.error.message);
    			} else {
    				grid.getStore().getProxy().extraParams.roleId = SELECTED_ROlE_ID;
    				grid.getStore().load();
    			}
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', '저장중 오류가 발생되었습니다.');
    	    }
    	});
	}	
};