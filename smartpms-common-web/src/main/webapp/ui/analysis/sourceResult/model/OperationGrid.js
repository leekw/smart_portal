Ext.define('Ui.analysis.sourceResult.model.OperationGrid', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
	 'assetOpName',
	 'assetOpCode',
	 'argumentType',
	 'returnType',
	 'analysisAssetId',

    ]
});