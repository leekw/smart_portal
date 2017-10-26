Ext.define('Ext.program.model.SourceProgramListJira', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
		'programId',
		'programName',
		'team',
		'module',
		'developer',
		'fileName',
		'programType',
		'programSmallType',
		'startDateStr',
		'dueDateStr',
		{ name: 'issueId', type: 'int'},
		'interfaceId',
		'useFlag',
		'task',
		'phase',
		'iteration',
		'srFlag',
		'donRatio',
		'mode',
		'oldStartDateStr',
		'oldDueDateStr'
    ]
});