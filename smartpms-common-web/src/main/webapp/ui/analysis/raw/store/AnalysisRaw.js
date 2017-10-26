Ext.define('Ui.analysis.raw.store.AnalysisRaw', {
    extend: 'Ext.data.Store',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/analysis/raw/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'analaysisraws'
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