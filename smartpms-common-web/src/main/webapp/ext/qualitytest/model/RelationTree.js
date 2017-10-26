Ext.define('Ext.qualitytest.model.RelationTree', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		type : 'string',
		mapping : 'relationId'
	}, {
		name : 'text',
		type : 'string',
		mapping : 'relationText'
	}, {
		name : 'leaf',
		type : 'boolean',
		mapping : 'leaf'
	}]
});