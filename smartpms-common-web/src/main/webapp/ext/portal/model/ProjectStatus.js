Ext.define('Ext.portal.model.ProjectStatus', {
    extend: 'Ext.data.Model',
    fields: [
        'mainLight',
        'connUserLight',
        'bizLight',
        'iscLight',
        'useYn',
        { name: 'limitConnectionCount', type: 'int' },
        'cutoverStartDate',
        'cutoverEndDate',
        'defectStartDate',
        'defectEndDate'
    ]
});