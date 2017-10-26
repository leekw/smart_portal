Ext.define('Ext.dlog.store.DLogDetail', {
    extend: 'Ext.data.Store',
    model: 'Ext.dlog.model.DLogDetail',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/dlog/detail/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'details'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0}
    },
    autoLoad : true,
    remoteFilter : false
});