Ext.define('Ext.role.view.RoleGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.rolegrid',
    id : 'role-grid',
    minHeight: 250,
    maxHeight: 250,
    initComponent: function() {
    	
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            pluginId: 'rowEditing',
            listeners : {
            	edit : function(editor, e) {
            		var param = {roleId : e.record.data.roleId, roleName: e.record.data.roleName, roleDescription: e.record.data.roleDescription, mode: e.record.data.mode};
            		var grid = Ext.getCmp('role-grid');
            		var url = url = G_PATH + '/role/save.json';
            		Ext.Ajax.request({
                	    url: url,
                	    method: 'POST',
                	    jsonData: Ext.encode(param),
                	    success: function(response){
                	    	var result = JSON.parse(response.responseText);
                	    	if (result.error != null) {
                				Ext.Msg.alert('Exception', result.error.message);
                			} else {
                				Ext.Msg.alert('Complete', '저장 완료되었습니다.');
                				grid.getStore().load();
                			}
                	    },
                	    failure: function(){
                	    	Ext.Msg.alert('Error', '저장중 오류가 발생되었습니다.');
                	    }
                	});
            	}
            }
        });
    	
    	this.plugins = [rowEditing];
    	
    	this.selModel = {
        	selType: 'checkboxmodel',
        	mode : 'SINGLE',
        	listeners : {
        		select : function(check, record, index, eOpts ) {
        			var grid = Ext.getCmp('role-inuser-grid');
        			var store = grid.getStore();
        			var proxy = store.getProxy();
            		proxy.extraParams.page = '1';
            		proxy.extraParams.roleId = record.data.roleId;
            		store.load();
            		
            		var grid2 = Ext.getCmp('role-auth-grid');
            		var store2 = grid2.getStore();
        			var proxy2 = store2.getProxy();
        			proxy2.extraParams.roleId = record.data.roleId;
        			store2.load();
        			
        			var grid3 = Ext.getCmp('service-auth-grid');
            		var store3 = grid3.getStore();
        			var proxy3 = store3.getProxy();
        			proxy3.extraParams.roleId = record.data.roleId;
        			store3.load();
        		}
        	}
        };
    	
        this.store = 'Role';
       
        this.columns = [
		{ 
            header: 'Role 아이디',
            dataIndex: 'roleId',
            width: 150,
            editor: {
		        allowBlank: false
		    }
        }, { 
            header: 'Role 이름',
            dataIndex: 'roleName',
            width: 200,
            editor: {
		        allowBlank: false
		    }
        }, { 
            header: 'Role 설명',
            dataIndex: 'roleDescription',
            editor: {
		        allowBlank: false
		    },
            flex: 1
        }
        ];
        
        this.tbar = [
        {
			xtype : 'label',
			width : '100%',
			html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800 !important"><i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;Role 정보</span></div>'
				  + '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._addRole()"><i class="x-fa fa-plus" style="padding-right:5px;"></i></span>'
				  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._removeRole()"><i class="x-fa fa-trash" style="padding-right:5px;"></i></span>'
				  + '</div>'
				  + '</div>'
		 }
        ];
        
        this.callParent(arguments);
    }
});    
