Ext.define('Ui.android.collection.store.Collection', {
    extend: 'Ext.data.Store',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/analysis/source/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'analysissources'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0 ,mobile :'Y'}
    },
    autoLoad : true
});