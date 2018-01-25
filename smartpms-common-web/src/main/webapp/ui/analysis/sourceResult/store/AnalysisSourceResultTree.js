Ext.define('Ui.analysis.sourceResult.store.AnalysisSourceResultTree', {
    extend : 'Ext.data.TreeStore',
    model : 'Ui.analysis.sourceResult.model.AnalysisSourceResultTree',
    proxy : {
        type: 'ajax',
        url: G_PATH + '/analysis/source/low/lank/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'analysissourceresults'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        defaultRootProperty: 'analysissourceresults',
        extraParams : { maxRowSize : 0}

    },
    root : {
        id : 'root',
        text : '차세대 PMO',
        expanded : true,

    },
    autoLoad: false

});
