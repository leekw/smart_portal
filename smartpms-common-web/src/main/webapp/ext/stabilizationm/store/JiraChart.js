Ext.define('Ext.stabilizationm.store.JiraChart', {
    extend: 'Ext.data.Store',
    model: 'Ext.stabilizationm.model.Statistic',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/jira/chart/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'datas'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0, day : DateUtil._formatDateYmd(new Date(), 0) }
    },
    autoLoad : true
});