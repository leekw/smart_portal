Ext.define('Ext.quality.model.Org', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
		'orgId',
		'orgName',
		'originalOrgName'
    ]
});