Ext.define('Ext.main.store.Main', {
    extend: 'Ext.data.Store',
    model: 'Ext.main.model.Main',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/jira/cutover/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'cutovers'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0, cutoverTh : '전환이행 시나리오', jobStep:'PA1-1 본오픈' }
    },
    autoLoad : true,
    remoteFilter : false
});