Ext.define('Ext.role.store.UserCombo', {
    extend: 'Ext.data.Store',
    model: 'Ext.role.model.User',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/user/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'data.users'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : {
        	maxRowSize : 10
        }
    },
    autoLoad : true,
    listeners : {
    	beforeload : function(store, op, eOpts) {

    	}
    }
});