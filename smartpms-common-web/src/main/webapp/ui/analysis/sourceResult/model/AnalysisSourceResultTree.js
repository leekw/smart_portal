Ext.define('Ui.analysis.sourceResult.model.AnalysisSourceResultTree', {
	extend : 'Ext.data.Model',
	fields : [{
        name : 'leaf',
        type : 'boolean',
        mapping : 'leaf'
    }, {
		name : 'assetName',
		type : 'string',
		mapping : 'assetName'
	}, {
        name : 'relationType',
        type : 'string',
        mapping : 'relationType'
    }, {
        name : 'analysisAssetId',
        type : 'string',
        mapping : 'analysisAssetId'
    }, {
        name : 'sourceRefId',
        type : 'string',
        mapping : 'sourceRefId'
    }, {
        name : 'targetRefId',
        type : 'string',
        mapping : 'targetRefId'
    }   ]
});