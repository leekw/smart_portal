Ext.define('Ui.android.collection.model.CollectionAnalysisTree', {
	extend : 'Ext.data.Model',
	fields : [{
        name : 'leaf',
        type : 'boolean',
        mapping : 'leaf'
    }, {
		name : 'analysisContents',
		type : 'string',
		mapping : 'analysisContents'
	}, {
        name : 'analysisExported',
        type : 'string',
        mapping : 'analysisExported'
    }  ]
});