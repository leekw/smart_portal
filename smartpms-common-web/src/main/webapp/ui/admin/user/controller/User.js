Ext.define('Ui.admin.user.controller.User', {
    extend: 'Ext.app.Controller',
    stores: ['User','Role'],
    models: ['User','Role'],

    views: ['UserGrid'],

    refs: [{
        ref: 'userGrid',
        selector: 'usergrid'
    }],
    
    init: function() {

        this.control({
            'usergrid': {
            	
            },
            'button[action=search-user-record]' : {
            	click : this.searchUserInfo
            }
        });
        
    },
    
    
    searchUserInfo : function() {
    	var grid = this.getUserGrid();
    	var store = grid.getStore();
    	var userId = Ext.getCmp('searchUserId').getValue();
    	var userName = Ext.getCmp('searchUserName').getValue();
    	var proxy = store.getProxy();
    	proxy.extraParams.userId = userId;
    	proxy.extraParams.userName = userName;
    	store.currentPage = 1;
    	store.load();
    	
    }
    
    
});