Ext.define('Ui.android.analysis.controller.Analysis', {
    extend: 'Ext.app.Controller',
    stores: ['Analysis'],
    models: [],

    views: ['AnalysisPanel','AnalysisGrid'],

    refs: [{
        ref: 'AnalysisPanel',
        selector: 'analysispanel'
    }],
    
    init: function() {

        this.control({
            'analysispanel': {
            }
        });
        
    }
});