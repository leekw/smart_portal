Ext.define('Ui.analysis.summary.store.AnalysisSummary', {
    extend: 'Ext.data.Store',
    autoDestroy: true,
    model: 'Ui.analysis.summary.model.AnalysisSummary',
    grouper : {
    	groupFn : function(item) {
    		return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;"><b>' + item.get("serviceName") + item.get("repoName") + '</b></span>';
    	}
    },
    proxy: {
        type: 'ajax',
        url: G_PATH + '/analysis/summary/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'analaysissummarys'
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