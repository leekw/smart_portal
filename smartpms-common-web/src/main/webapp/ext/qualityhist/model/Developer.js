Ext.define('Ext.qualityhist.model.Developer', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
		'developer',
		'programType',
		'pgTotal',
		'pgComplete',
		'pgDelay',
		'loc',
		'minStartDateStr',
		'underStatement',
		'avgCoverage',
		'unUsedSource',
		'notRun',
		'utCoverage',
		'runTarget'
    ]
});