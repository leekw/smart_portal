Ext.define('Ext.changerequest.store.RepositoryCombo', {
    extend: 'Ext.data.Store',
    model: 'Ext.changerequest.model.Repository',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/changerequest/repository/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'combos'
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