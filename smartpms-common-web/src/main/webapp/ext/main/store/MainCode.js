Ext.define('Ext.main.store.MainCode', {
    extend: 'Ext.data.Store',
    model: 'Ext.main.model.MainCode',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/jira/cutover/th/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'codes'
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