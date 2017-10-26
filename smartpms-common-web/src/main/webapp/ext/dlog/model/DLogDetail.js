Ext.define('Ext.dlog.model.DLogDetail', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
		'dlogSeq',
		'team',
		'module',
		'tmValue',
		'openPhase',
		'dbtPhase',
		'intDocId',
		'docName',
		'docDescription',
		'taskRunRange',
		'comDueDate',
		'refDueDate',
		'signOffType',
		'qaVerifyYn',
		'trakingYn',
		'templateYn',
		'bizReviewYn',
		'smReviewYn',
		'fileType',
		'fileNamingRule',
		'crJiraId',
		'refSignOffYn',
		'multiDocReviewYn',
		'dlogDescription',
		'refDueDesc',
		'comDueDesc',
		'reviewTerm',
		'taskGroupKey',
		'phaseId',
		'checklistYn'
    ]
});