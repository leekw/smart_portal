Ext.define('Ui.analysis.sourceResult.store.AnalysisSourceResult', {
	extend : 'Ext.data.Store',
 	proxy : {
        type: 'ajax',
        url: G_PATH + '/analysis/source/result/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'analysissourceresult'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        defaultRootProperty: 'analysissourceresult',
        extraParams : { maxRowSize : 0}

    },
	autoLoad: true
	
});
