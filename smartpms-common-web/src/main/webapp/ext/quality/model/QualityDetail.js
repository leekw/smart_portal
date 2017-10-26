Ext.define('Ext.quality.model.QualityDetail', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
		'module',
		'function',
		'verifyType',
		'uiCount',
		'esbCount',
		'sjCount',
		'bocCount',
		'boCount',
		'doCount',
		'dtoCount',
		'etcCount',
		'totCount'
    ]
});