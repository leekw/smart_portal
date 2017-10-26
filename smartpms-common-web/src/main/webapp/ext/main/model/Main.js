Ext.define('Ext.main.model.Main', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
		'jobId',
		{ name: 'startExpectDate', type: 'date', dateFormat:'Y/m/d H:i'},
		{ name: 'endExpectDate', type: 'date', dateFormat:'Y/m/d H:i'},
		{ name: 'duration', type: 'int'},
		'systemType',
		'jobStep',
		'jobType',
		'xCategory',
		'yCategory',
		'jobSortId',
		'task',
		'activity',
		'jobExecutionTeam',
		'jobExecutor',
		'backup',
		'jobCheckList',
		'caution',
		{ name: 'startExecutionDate', type:'date', dateFormat:'Y/m/d H:i'},
		{ name: 'endExecutionDate', type:'date', dateFormat:'Y/m/d H:i'},
		'supervisor',
		'ktSupervisor',
		'etc',
		'jiraId',
		'jiraStatus',
		'jiraDueDate',
		'resolution',
		'cutoverTh',
		'assignee',
		'issueLink',
		'preJob',
		'jiraStatusDesc'
    ]
});