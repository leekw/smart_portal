Ext.define('Ext.portal.store.BizProcessChart', {
    extend: 'Ext.data.Store',
    model: 'Ext.portal.model.Statistic',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/bizprocess/chart/get.json',
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
        extraParams : { maxRowSize : 0 }
    },
    autoLoad : true
});