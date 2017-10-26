Ext.define('Ext.sample.model.Sample', {
    extend: 'Ext.data.Model',
    fields: [
        'areaCode',
        'serviceCode',
        { name: 'facilities', type: 'bool' },
        { name: 'use', type: 'bool' },
        'remark',
        'facilitiesYn',
        'useYn',
        'dataMode'
    ]
});