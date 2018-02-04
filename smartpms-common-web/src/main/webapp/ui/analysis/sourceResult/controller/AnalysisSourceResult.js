Ext.define('Ui.analysis.sourceResult.controller.AnalysisSourceResult', {
    extend: 'Ext.app.Controller',
    stores: ['AnalysisSourceResult','OperationGrid','AnalysisSourceResultTree','AnalysisSourceResultHighRankTree'],
    models: ['AnalysisSourceResultTree'
    //    ,'OperationGrid'
    ],

    views: ['AnalysisSourceResultPanel'
            ,'AnalysisSourceResultGrid'
            ,'AnalysisSourceResultTree'
            ,'OperationGrid'
            ,'AnalysisSourceResultHighRankTree'
    ],

    refs: [{
        ref: 'analysissourceresultgrid',
        selector: 'analysissourceresultgrid'
    }],
    
    init: function() {

        this.control({
            'analysissourceresultgrid': {
            }
        });
        
    }
});