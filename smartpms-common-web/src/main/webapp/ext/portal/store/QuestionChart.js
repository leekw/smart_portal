Ext.define('Ext.portal.store.QuestionChart', {
    extend: 'Ext.data.Store',
    model: 'Ext.portal.model.QuestionChart',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/question/chart/get.json',
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
    autoLoad : false
});