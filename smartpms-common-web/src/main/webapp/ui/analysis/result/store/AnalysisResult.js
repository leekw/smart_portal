Ext.define('Ui.analysis.result.store.AnalysisResult', {
    extend: 'Ext.data.Store',
    model: 'Ui.analysis.result.model.AnalysisResult',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/analysis/result/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'analaysisresults'
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