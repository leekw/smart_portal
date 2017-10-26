Ext.define('Ext.meta.store.Meta', {
    extend: 'Ext.data.Store',
    model: 'Ext.meta.model.Meta',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/meta/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'metas'
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