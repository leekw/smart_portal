Ext.define('Ext.meta.model.Meta', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
		'metaSeq',
		'metaDiv',
		'metaName',
		'metaFullName',
		'metaDescription',
		'sysInfo',
		'remark',
		'metaType'
    ]
});