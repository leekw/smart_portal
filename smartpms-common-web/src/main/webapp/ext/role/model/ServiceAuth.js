Ext.define('Ext.role.model.ServiceAuth', {
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
		name : 'parentResourceName',
		type : 'string',
		mapping : 'parentResourceName'
	}, {
		name : 'url',
		type : 'string',
		mapping : 'url'
	}, {
		name : 'roleId',
		type : 'string',
		mapping : 'roleId'
	}, {
		name : 'exclude',
		type : 'boolean',
		mapping : 'exclude'
	}, {
		name : 'include',
		type : 'boolean',
		mapping : 'include'
	}]
});