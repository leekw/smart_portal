Ext.define('Ext.admin.store.Role', {
    extend: 'Ext.data.Store',
    model: 'Ext.admin.model.Role',
    autoDestroy: true,
    remoteSort : true,
    proxy: {
        type: 'ajax',
        enablePaging : true,
        url: G_PATH + '/role/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'roles'
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
    autoLoad : true,
    listeners : {
    	beforeload : function(store, op, eOpts) {
    	}
    }
});