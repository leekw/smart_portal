Ext.define('Ext.sample.store.Sample', {
    extend: 'Ext.data.Store',
    model: 'Ext.sample.model.Sample',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/sample/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'samples'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0 }
    },
    autoLoad : true
});