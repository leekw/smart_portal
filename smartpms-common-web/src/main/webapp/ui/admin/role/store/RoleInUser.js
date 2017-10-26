Ext.define('Ui.admin.role.store.RoleInUser', {
    extend: 'Ext.data.Store',
    model: 'Ui.admin.role.model.RoleInUser',
    autoDestroy: true,
    pageSize : 200,
    remoteSort : true,
    proxy: {
        type: 'ajax',
        enablePaging : true,
        url: G_PATH + '/role/user/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'data.users',
            totalProperty : 'data.total'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : {
        	maxRowSize : 0,
        	start : 0, 
        	limit : 200
        }
    },
    autoLoad : true,
    listeners : {
    	beforeload : function(store, op, eOpts) {
    		var proxy = store.getProxy();
    		proxy.extraParams.page = store.currentPage;
    	}
    }
});