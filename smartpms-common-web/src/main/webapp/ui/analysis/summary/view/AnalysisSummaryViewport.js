Ext.Loader.loadScript({url:G_PATH + '/ui/common/CommonCode.js'});
Ext.define('Ui.analysis.summary.view.AnalysisSummaryViewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ui.analysis.summary.view.AnalysisSummaryGrid',
        'Ui.analysis.summary.view.AnalysisTeamGrid',
        'Ui.analysis.summary.view.AnalysisManagerGrid',
        'Ui.analysis.summary.view.AnalysisSummaryPanel'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'analysissummarypanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
