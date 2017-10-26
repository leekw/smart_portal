Ext.define('Ext.qualitytest.controller.QualityTest', {
    extend: 'Ext.app.Controller',
    stores: ['RelationTree','Program','ProgramPieChart','ModulePieChart','HistLineChart','ProgramOrg','ChangeBarChart'],
    models: ['RelationTree','Program','ChartData'],

    views: [],

    refs: [
		
    ],
    
    init: function() {

        this.control({
        	
        });
    }
});
