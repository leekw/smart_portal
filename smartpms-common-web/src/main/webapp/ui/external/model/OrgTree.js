Ext.define('Ui.external.model.OrgTree', {
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
		name : 'parentId',
		type : 'string',
		mapping : 'parentOrgId'
	}]
});