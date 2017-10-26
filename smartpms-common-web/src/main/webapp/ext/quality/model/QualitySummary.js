Ext.define('Ext.quality.model.QualitySummary', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
		'module',
		'function',
		'pgTotal',
		'pgComplete',
		'pgDelay',
		'unUsedSource',
		'notRun',
		'utCoverage',
		'totalStatus',
		'runTarget',
		'avgTotalFunction',
		'avgRunFunction',
		'totalFunction',
		'runFunction',
		'sitTarget',
        'sitNotest',
        'sitSumCoverage',
        'underSitCoverage'
    ]
});