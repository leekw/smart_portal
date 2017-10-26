Ext.define('Ext.ncutoverm.model.CutoverMain', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
		'jobId',
		'taskDate',
		'task',
		'jobExecutionTeam',
		'jiraId',
		'jiraStatus',
		'resolution',
		'itemStatus',
		'jobExecutor',
		'caution'
    ]
});