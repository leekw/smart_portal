Ext.define('Ui.admin.user.view.UserGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.usergrid',
    id : 'user-grid',
    minHeight : 650,
    border: false,
    initComponent: function() {
    	
        this.store = 'User';
                
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            pluginId: 'rowEditing',
            listeners : {
            	edit : function(editor, e) {
            		UserHandler._modifyRoles(e.record.data.userId, e.record.data.roles);
            	}
            }
        });
        
        this.plugins = [rowEditing];
       
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'no',
			width: 40,
			align:'center'
		}),
		{
			header : '',
			dataIndex : 'photoPath',
			width : 50,
			align: 'center',
			renderer : function(value) {
				value = (value == null || value == '' ? G_PATH + '/resources/images/profile-icon.png' : value); 
				return '<img src="' + value + '" style="border-radius:23px;" width="28" height="28">';
			}
		},
        { 
            header: '사용자 아이디',
            dataIndex: 'userId',
            width: 100
        }, { 
            header: '사용자 이름',
            dataIndex: 'userName',
            align : 'center',
            width: 150,
            flex: 1
        }, { 
            header: '소속조직',
            align : 'center',
            dataIndex: 'defaultOrgId',
            width: 200
        }, { 
            header: '이메일',
            align : 'center',
            dataIndex: 'emailAddress',
            width: 150
        }, { 
            header: '상태',
            align : 'center',
            dataIndex: 'status',
            width: 80
        }, { 
            header: '유형',
            align : 'center',
            dataIndex: 'userType',
            width: 80
        }
        
        ];
        
        this.bbar = this.paging= Ext.create('Ext.toolbar.Paging',
        		{
        			store : this.store,
        			displayInfo: true
        		});
        
        this.tbar = [{
        	xtype : 'textfield',
        	name : 'userId',
        	id : 'searchUserId',
        	fieldLabel: '사용자 아이디',
        	labelWidth: 90
         },{
        	 xtype : 'textfield',
        	name : 'userName',
        	id : 'searchUserName',
        	fieldLabel: '사용자 명',
        	labelWidth: 90
         },
         {
            text: '조회',
            action:'search-user-record',
            ui : 'gray'
        }];
        
        this.callParent(arguments);
    },
    listeners : {
    	resize : function (self, width, height) {
    		this.setMaxHeight(Ext.getCmp('user-panel').getHeight() - 60);
    	}
    }
});

var UserHandler = {
	_modifyRoles : function(_userId, _roles) {
		var param = {userId : _userId, roles : _roles};
		var useGrid = Ext.getCmp('user-grid');
		var url = G_PATH + '/user/role/modify.json';
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
    				useGrid.getStore().load();
    			}
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', '저장중 오류가 발생되었습니다.');
    	    }
    	});
	},
	_accessUser : function(_userId, _checked) {
		var useGrid = Ext.getCmp('user-grid');
		var param = {userId:_userId, accessYn: (_checked ? 'Y' : 'N')};
		var url = G_PATH + '/user/access/modify.json';
		Ext.Ajax.request({
    	    url: url,
    	    method: 'POST',
    	    jsonData: Ext.encode(param),
    	    success: function(response){
    	    	var result = JSON.parse(response.responseText);
    	    	if (result.error != null) {
    				Ext.Msg.alert('Exception', result.error.message);
    			} else {
    				useGrid.getStore().load();
    			}
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', '저장중 오류가 발생되었습니다.');
    	    }
    	});
	}
};
