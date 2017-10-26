Ext.define('Ui.analysis.raw.controller.AnalysisRaw', {
    extend: 'Ext.app.Controller',
    stores: ['AnalysisRaw'],
    models: [],

    views: ['AnalysisRawGrid','AnalysisRawPanel'],

    refs: [{
        ref: 'analysisRawGrid',
        selector: 'analysisrawgrid'
    }],
    
    init: function() {

        this.control({
            'analysisrawgrid': {
            }
        });
        
    }
});