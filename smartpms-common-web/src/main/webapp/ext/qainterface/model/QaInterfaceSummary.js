Ext.define('Ext.qainterface.model.QaInterfaceSummary', {
    extend: 'Ext.data.Model',
    requires: [
       'Ext.date.*'
    ], 
    fields: [
        'sourceTeam',
        'sourceModule',
        'targetTeam',
        'targetModule'
    ]
});