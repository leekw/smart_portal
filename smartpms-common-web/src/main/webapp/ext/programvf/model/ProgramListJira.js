Ext.define('Ext.programvf.model.ProgramListJira', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
		'programId',
		'programName',
		'team',
		'module',
		'subModule',
		'developer',
		'fileName',
		'filePath',
		'programType',
		'programSmallType',
		'wbsNumber',
		'startDateStr',
		'dueDateStr',
		{ name: 'issueId', type: 'int'},
		'interfaceId',
		'useFlag',
		'task',
		'phase',
		'iteration',
		'srFlag',
		'taskDetail',
		'srNo',
		'donRatio',
		'mode',
		'crRequester',
		'crRequestDateStr',
		'crUpdateDateStr',
		'crStatus',
		'crReason',
		'oldStartDateStr',
		'oldDueDateStr'
    ]
});