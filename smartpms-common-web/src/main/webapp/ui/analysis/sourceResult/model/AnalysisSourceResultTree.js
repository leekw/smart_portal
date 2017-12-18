Ext.define('Ui.analysis.sourceResult.model.AnalysisSourceResultTree', {
	extend : 'Ext.data.Model',
	fields : [{
        name : 'id',
        type : 'string',
        mapping : 'resourceId'
    },{
		name : 'leaf',
        type : 'boolean',
		mapping : 'leaf'
	},{
        name : 'text',
        type : 'string',
        mapping : 'className'
    }, {
		name : 'refClass',
		type : 'string',
		mapping : 'refClass'
	}, {
		name : 'classInterface',
		type : 'string',
		mapping : 'classInterface'
	}, {
		name : 'analysisList',
		type : 'string',
		mapping : 'analysisList'
	}, {
        name : 'analysisModul',
        type : 'string',
        mapping : 'analysisModul'
    } ]
});