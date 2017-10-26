Ext.define('Ui.admin.role.model.RoleAuth', {
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
		name : 'resourceDepth',
		type : 'string',
		mapping : 'resourceDepth'
	}, {
		name : 'resourceTypeCode',
		type : 'string',
		mapping : 'resourceTypeCode'
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