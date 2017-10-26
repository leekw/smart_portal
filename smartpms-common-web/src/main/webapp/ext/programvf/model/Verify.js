Ext.define('Ext.programvf.model.Verify', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
		'verifyCount',
		'dateCount',
		'formatCount',
		'reqCount',
		'newCount',
		'etcCount'
    ]
});