Ext.define('Ext.role.view.RoleInUserGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.roleinusergrid',
    id : 'role-inuser-grid',
    maxHeight: 550,
    minHeight: 550,
    multiSelect: true,
    initComponent: function() {
    	
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            pluginId: 'rowEditing',
            listeners : {
            	beforeedit : function( editor, context, eOpts ) {
            		if (context.record.data.mode == 'R') {
            			return false;
            		}
            	},
            	edit : function(editor, e) {
            		var param = {roleId : e.record.data.roleId, userId: e.record.data.userId};
            		var grid = Ext.getCmp('role-inuser-grid');
            		var url = url = G_PATH + '/role/user/save.json';
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
    	
        this.store = 'RoleInUser';
       
        this.columns = [
        { 
            header: '사용자 아이디',
            dataIndex: 'userId',
            width : 120,
            editor: {
            	xtype : 'usercombobox',
		        allowBlank: false
		    }
        }, { 
            header: '사용자 이름',
            dataIndex: 'userName',
            flex:1
        }, { 
            header: 'Role 이름',
            dataIndex: 'roleName'
        }, { 
            header: 'Role 아이디',
            dataIndex: 'roleId',
            hidden : true
        }
        ];
        
        this.bbar = this.paging= Ext.create('Ext.toolbar.Paging',
		{
			store : this.store,
			displayInfo: false
		});
        
        this.tbar = [
        {
			xtype : 'label',
			width : '100%',
			html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800 !important"><i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;Role에 포함된 사용자</span></div>'
				  + '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._addRoleInUser()"><i class="x-fa fa-plus" style="padding-right:5px;"></i></span>'
				  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._removeRoleInUser()"><i class="x-fa fa-trash" style="padding-right:5px;"></i></span>'
				  + '</div>'
				  + '</div>'
		 }
        ];
        
        this.callParent(arguments);
    }
});    
