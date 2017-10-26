Ext.define('Ext.login.model.OrgTree', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		type : 'string',
		mapping : 'orgId'
	}, {
		name : 'text',
		type : 'string',
		mapping : 'orgName'
	}, {
		name : 'leaf',
		type : 'boolean',
		mapping : 'leaf'
	}, {
		name : 'orgType',
		type : 'string',
		mapping : 'orgType'
	}, {
		name : 'orgDiv',
		type : 'string',
		mapping : 'orgDiv'
	}]
});