Ext.define('Ext.program.model.ChangeRequestJira', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
		'jiraId',
		'jiraSummary',
		'jiraStatus',
		'jiraDescription',
		'jiraCreateDate',
		'jiraAssignee',
		'jiraReporter',
		'team',
		'module'
    ]
});