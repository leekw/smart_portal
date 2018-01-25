Ext.define('Ui.analysis.sourceResult.view.AnalysisSourceResultViewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ui.analysis.sourceResult.view.AnalysisSourceResultPanel',
        'Ui.analysis.sourceResult.view.AnalysisSourceResultGrid',
        'Ui.analysis.sourceResult.view.AnalysisSourceResultTree',
        'Ui.analysis.sourceResult.view.AnalysisSourceResultHighRankTree',
        'Ui.analysis.sourceResult.view.OperationGrid'

    ],
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'analysissourceresultpanel'
                }
            ]
        });

        me.callParent(arguments);
    }
});
