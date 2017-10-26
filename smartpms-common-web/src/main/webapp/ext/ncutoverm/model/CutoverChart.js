Ext.define('Ext.ncutoverm.model.CutoverChart', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
		'name',
		'data1',
		'totalCount',
		'cnt'
    ]
});