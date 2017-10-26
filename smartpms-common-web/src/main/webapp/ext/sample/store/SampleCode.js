Ext.define('Ext.sample.store.SampleCode', {
    extend: 'Ext.data.Store',
    model: 'Ext.sample.model.SampleCode',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/sample/code/category/list/get.json',
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