Ext.define('Ui.admin.menu.model.MenuTree', {
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
		name : 'parentResourceId',
		type : 'string',
		mapping : 'parentResourceId'
	},{
		name : 'resourceId',
		type : 'string',
		mapping : 'resourceId'
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