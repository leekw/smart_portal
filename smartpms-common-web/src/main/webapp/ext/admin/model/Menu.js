Ext.define('Ext.admin.model.Menu', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		type : 'string',
		mapping : 'resourceId'
	}, {
		name : 'text',
		type : 'string',
		mapping : 'resourceName'
	},{
		name : 'resouceId',
		type : 'string',
		mapping : 'resourceId'
	}, {
		name : 'resourceName',
		type : 'string',
		mapping : 'resourceName'
	}, {
		name : 'leaf',
		type : 'boolean',
		mapping : 'leaf'
	}, {
		name : 'resourceTypeCode',
		type : 'string',
		mapping : 'resourceTypeCode'
	}, {
		name : 'url',
		type : 'string',
		mapping : 'url'
	}, {
		name : 'sortNo',
		type : 'int',
		mapping : 'sortNo'
	}, {
		name : 'mainResourceYn',
		type : 'string',
		mapping : 'mainResourceYn'
	}]
});