Ext.define('Ext.qainterfacesys.store.Program', {
    extend: 'Ext.data.Store',
    model: 'Ext.qainterfacesys.model.Program',
    autoDestroy: false,
    pageSize : 300,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/quality/interface/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'data.details',
            totalProperty : 'data.total'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0, start : 0, limit : 300}
    },
    remoteFilter : false,
    autoLoad : false,
    listeners : {
    	beforeload : function(store, op, eOpts) {
    		var proxy = store.getProxy();
    		proxy.extraParams.page = store.currentPage;
    	},
    	filterchange : function(store, filters) {
    		if (!filters || !filters.length) {
    			
    		}
    	},
    	load : function( store, records, successful, eOpts ) {
    		
    		
    	}
    }
});