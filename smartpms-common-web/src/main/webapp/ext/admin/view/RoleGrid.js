Ext.define('Ext.admin.view.RoleGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.rolegrid',
    id : 'role-grid',
    title: '역할 관리',
    minHeight: 300,
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
                				Ext.Msg.alert('Compete', '저장 완료되었습니다.');
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
    	
        this.store = 'Role';
       
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'no',
			width: 40
		}), { 
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
            width: 150,
            editor: {
		        allowBlank: false
		    },
            flex: 1
        }
        ];
        
        this.tbar = [
        {
            text: '추가',
            action:'add-role-record',
            ui : 'gray'
        },{
        	itemId: 'removeItem',
            text: '삭제',
            disabled: true,
            action:'remove-role-record',
            ui : 'gray'
        }];
        
        this.callParent(arguments);
    }
});    
