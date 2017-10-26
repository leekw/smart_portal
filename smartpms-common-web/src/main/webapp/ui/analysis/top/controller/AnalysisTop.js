Ext.define('Ui.analysis.top.controller.AnalysisTop', {
    extend: 'Ext.app.Controller',
    stores: ['AnalysisWeb', 'AnalysisApp', 'AnalysisLib'],
    models: [],

    views: ['AnalysisWebGrid', 'AnalysisAppGrid', 'AnalysisLibGrid','AnalysisTopPanel'],

    refs: [{
        ref: 'analysisWebGrid',
        selector: 'analysiswebgrid'
    }],
    
    init: function() {

        this.control({
            'analysiswebgrid': {
            }
        });
        
    }
});