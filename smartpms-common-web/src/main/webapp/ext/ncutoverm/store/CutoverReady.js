Ext.define('Ext.ncutoverm.store.CutoverReady', {
    extend: 'Ext.data.Store',
    model: 'Ext.ncutoverm.model.CutoverMain',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/cutover/main/assignready/get.json',
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
        extraParams : { maxRowSize : 0}
    },
    autoLoad : true,
    remoteFilter : false
});