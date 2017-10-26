Ext.define('Ext.ncutoverm.store.CutoverMain', {
    extend: 'Ext.data.Store',
    model: 'Ext.ncutoverm.model.CutoverMain',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/cutover/main/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'info'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0, mode : '작업지연'}
    },
    autoLoad : true,
    remoteFilter : false
});