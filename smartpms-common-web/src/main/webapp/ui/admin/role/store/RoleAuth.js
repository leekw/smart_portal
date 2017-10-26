Ext.define('Ui.admin.role.store.RoleAuth', {
    extend: 'Ext.data.Store',
    model: 'Ui.admin.role.model.RoleAuth',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        enablePaging : true,
        url: G_PATH + '/role/auth/list/get.json',
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