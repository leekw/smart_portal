Ext.define('Ext.qualitytest.model.ChartData', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
        'programType',
        'programCount',
        'programRunCount',
        'programRatio',
        'relCount',
        'relRunCount',
        'module'
    ]
});