Ext.define('Ui.analysis.result.model.AnalysisResult', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
		'serviceName',
		'repoName',
		'analysisDateByString',
		'orderNo',
		'cwe',
		'securityRule',
		'severity',
		'file',
		'source',
		'targetYn',
		'remark',
		'attachFileUrl',
		'status',
		'refKey',
		'tool',
		'analysisResultId'
    ]
});