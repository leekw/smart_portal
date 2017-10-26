Ext.define('Ext.nmenu.store.MenuService', {
    extend: 'Ext.data.Store',
    model: 'Ext.nmenu.model.MenuTree',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        enablePaging : true,
        url: G_PATH + '/resource/service/list/get.json',
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