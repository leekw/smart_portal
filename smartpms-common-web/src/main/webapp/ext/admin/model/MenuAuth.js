Ext.define('Ext.admin.model.MenuAuth', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'resouceId',
		type : 'string',
		mapping : 'resourceId'
	}, {
		name : 'resourceName',
		type : 'string',
		mapping : 'resourceName'
	}, {
		name : 'resourceType',
		type : 'string',
		mapping : 'resourceType'
	}, {
		name : 'includeYn',
		type : 'string',
		mapping : 'includeYn'
	}, {
		name : 'exclude',
		type : 'boolean',
		mapping : 'exclude'
	}]
});