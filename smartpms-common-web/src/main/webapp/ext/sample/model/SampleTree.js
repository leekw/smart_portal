
Ext.define('Ext.sample.model.SampleTree', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		type : 'string',
		mapping : 'id'
	}, {
		name : 'text',
		type : 'string',
		mapping : 'text'
	}, {
		name : 'leaf',
		type : 'boolean',
		mapping : 'leaf'
	}, {
		name : 'checked',
		type : 'boolean',
		mapping : 'checked'
	}]
});