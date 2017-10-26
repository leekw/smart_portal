Ext.define('Ext.stabilization.controller.StabilizationDashboard', {
    extend: 'Ext.app.Controller',
    stores: ['BizProcess', 'ConnUser','ConnUserChart','Wfm','Question','Itsm','Helf','BizProcessChart','CompareChart','JiraLevel','JiraChart'],
    models: ['Statistic'],

    views: [],

    refs: [
    ],
    
    init: function() {

        this.control({

        });
        
    }
});