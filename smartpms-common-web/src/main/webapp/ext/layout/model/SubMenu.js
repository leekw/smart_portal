Ext.define('Ext.layout.model.SubMenu', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		type : 'string',
		mapping : 'resourceId'
	}, {
		name : 'text',
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
		name : 'resourceContent',
		type : 'string',
		mapping : 'resourceContent'
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