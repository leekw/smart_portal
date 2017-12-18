Ext.define('Ui.analysis.sourceResult.controller.AnalysisSourceResult', {
    extend: 'Ext.app.Controller',
    stores: ['AnalysisSourceResult'],
    models: ['AnalysisSourceResultTree'],

    views: ['AnalysisSourceResultPanel'
            ,'AnalysisSourceResultTree'
            ,'MethodGrid'
    ],

    refs: [{
        ref: 'analysissourceresulttree',
        selector: 'analysissourceresulttree'
    }],
    
    init: function() {

        this.control({
            'analysissourceresulttree': {
            }
        });
        
    }
});