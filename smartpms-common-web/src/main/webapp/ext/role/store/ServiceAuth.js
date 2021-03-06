Ext.define('Ext.role.store.ServiceAuth', {
    extend: 'Ext.data.Store',
    model: 'Ext.role.model.ServiceAuth',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        enablePaging : true,
        url: G_PATH + '/service/auth/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'resources'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : {
        	maxRowSize : 0
        }
    },
    autoLoad : false,
    listeners : {
    	beforeload : function(store, op, eOpts) {
    	}
    }
});