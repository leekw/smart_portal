Ext.define('Ext.qualityhist.model.QualityHistSummary', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
        'team',
		'module',
		'pgTotal1',
		'pgTotal2',
		'pgDelay1',
		'pgDelay2',
		'delayRatio1',
		'delayRatio2',
		'unusedSource1',
		'unusedSource2',
		'utTarget1',
		'utTarget2',
		'utNoTest1',
		'utNoTest2',
		'utNoTestRatio1',
		'utNoTestRatio2',
		'runTarget1',
		'runTarget2',
		'notRun1',
		'notRun2',
		'runRatio1',
		'runRatio2'
    ]
});