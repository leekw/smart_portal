Ext.define('Ext.sample.model.SampleCode', {
    extend: 'Ext.data.Model',
    fields: [
        'codeCategoryId',
        'codeCategoryName',
        { name: 'use', type: 'bool' },
        'remark',
        'useYn'
    ]
});