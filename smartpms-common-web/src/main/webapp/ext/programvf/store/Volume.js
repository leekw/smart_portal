Ext.define('Ext.programvf.store.Volume', {
    extend: 'Ext.data.Store',
    model: 'Ext.programvf.model.Volume',
    autoDestroy: true,
    groupField: 'developer',
    proxy: {
        type: 'ajax',
        url: G_PATH + '/changerequest/volume/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'volumes'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0}
    },
    autoLoad : false
});