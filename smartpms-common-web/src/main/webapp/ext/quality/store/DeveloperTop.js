Ext.define('Ext.quality.store.DeveloperTop', {
    extend: 'Ext.data.Store',
    model: 'Ext.quality.model.DeveloperTop',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/quality/developer/top/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'developers'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0, topList : ['notRun', 'utCoverage']}
    },
    autoLoad : false
});