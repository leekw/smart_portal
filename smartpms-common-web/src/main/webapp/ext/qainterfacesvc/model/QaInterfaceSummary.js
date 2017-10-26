Ext.define('Ext.qainterfacesvc.model.QaInterfaceSummary', {
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