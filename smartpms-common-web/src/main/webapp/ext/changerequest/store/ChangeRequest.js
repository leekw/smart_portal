Ext.define('Ext.changerequest.store.ChangeRequest', {
    extend: 'Ext.data.Store',
    model: 'Ext.changerequest.model.ChangeRequest',
    autoDestroy: true,
    pageSize : 100,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/changerequest/target/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'data.targets',
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
        	limit : 100,
        	filterUser : true
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