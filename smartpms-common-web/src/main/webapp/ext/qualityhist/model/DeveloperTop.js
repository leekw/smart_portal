Ext.define('Ext.qualityhist.model.DeveloperTop', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
		'developer',
		'rankCount',
		'verifyScore'
    ]
});