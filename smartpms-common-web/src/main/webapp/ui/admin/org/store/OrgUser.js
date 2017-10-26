Ext.define('Ui.admin.org.store.OrgUser', {
    extend: 'Ext.data.Store',
    model: 'Ui.admin.org.model.OrgUser',
    autoDestroy: true,
    pageSize : 200,
    remoteSort : true,
    proxy: {
        type: 'ajax',
        enablePaging : true,
        url: G_PATH + '/based/res/org/user/list/get.json',
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