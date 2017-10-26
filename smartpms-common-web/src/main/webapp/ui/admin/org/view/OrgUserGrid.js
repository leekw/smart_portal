Ext.define('Ui.admin.org.view.OrgUserGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.orgusergrid',
    id : 'org-user-grid',
    maxHeight: 585,
    minHeight: 585,
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
            		var tree = Ext.getCmp('org-tree');
            		var nodes = tree.getSelectionModel().selected;
            		var orgId = nodes.items[0].id;
            		if (orgId == null) {
            			Ext.Msg.alert('Info', '조직을 선택하십시오');
            			return fasle;
            		}
            		var param = {defaultOrgId : orgId, userId: e.record.data.userId};
            		var grid = Ext.getCmp('role-user-grid');
            		var url = url = G_PATH + '/permit/res/org/user/save.json';
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
    	
        this.store = 'OrgUser';
       
        this.columns = [
        new Ext.grid.RowNumberer({
			header : 'no',
			align:'center',
			width: 40
		}),
        { 
            header: '사용자 아이디',
            dataIndex: 'userId',
            width : 120,
            align:'center',
            editor: {
            	xtype : 'usercombobox',
		        allowBlank: false
		    }
        }, { 
            header: '사용자 이름',
            align:'center',
            dataIndex: 'userName',
            flex:1
        }, { 
            header: '사용자 상태',
            align:'center',
            dataIndex: 'status'
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
			html: '<div><div style="float:left;font-size:15px;font-weight:600"></div>'
				  + '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._addUser()"><i class="x-fa fa-plus" style="padding-right:5px;"></i></span>'
				  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._removeUser()"><i class="x-fa fa-trash" style="padding-right:5px;"></i></span>'
				  + '</div>'
				  + '</div>'
		 }
        ];
        
        this.callParent(arguments);
    }
});    
