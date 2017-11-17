Ext.define('Ui.analysis.source.controller.AnalysisSource', {
    extend: 'Ext.app.Controller',
    stores: ['AnalysisSource'],
    models: [],

    views: ['AnalysisSourceGrid','AnalysisSourcePanel'],

    refs: [{
        ref: 'analysisSourceGrid',
        selector: 'analysissourcegrid'
    }],
    
    init: function() {

        this.control({
            'analysissourcegrid': {
            }
        });
        
    }
});