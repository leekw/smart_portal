Ext.define('Ui.analysis.summary.model.AnalysisSummary', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
		'serviceName',
		'repoName',
		'analysisDateByString',
		'orderNo',
		'team',
		'manager',
		'criticalCount',
		'highCount',
		'majorCount',
		'lowCount',
		'measureStatus',
		'veeringCheck1',
		'veeringCheck2',
		'finalStatus'
    ]
});