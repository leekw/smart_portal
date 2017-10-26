Ext.define('Ext.quality.model.Program', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
		'team',
		'module',
		'function',
		'developer',
		'programType',
		'programId',
		'loc',
		'unusedYn',
		'utCaseType',
		'issueId',
		'startDate',
		'dueDate',
		'doneRatio',
		'runYn',
		'statement',
		'utJiraId',
		'totalFunction',
		'runFunction'
    ]
});