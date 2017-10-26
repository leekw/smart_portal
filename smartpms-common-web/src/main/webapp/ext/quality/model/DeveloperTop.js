Ext.define('Ext.quality.model.DeveloperTop', {
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