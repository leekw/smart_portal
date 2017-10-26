Ext.define('Ext.stabilizationm.model.Statistic', {
    extend: 'Ext.data.Model',
    fields: [
        'channel',
        { name: 'target', type: 'int' },
        { name: 'data1', type: 'int' },
        { name: 'data2', type: 'int' },
        { name: 'data3', type: 'int' },
        { name: 'data4', type: 'int' },
        { name: 'data5', type: 'int' },
        { name: 'data6', type: 'int' },
        { name: 'data11', type: 'int' },
        { name: 'data22', type: 'int' },
        { name: 'data33', type: 'int' },
        { name: 'data44', type: 'int' },
        { name: 'data55', type: 'int' },
        { name: 'data66', type: 'int' },
        'day',
        'mode',
        'ownDay',
        'srtDay',
        'dataRatio',
        'label',
        'targetHours'
    ]
});