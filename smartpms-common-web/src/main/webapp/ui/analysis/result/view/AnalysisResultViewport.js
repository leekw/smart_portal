Ext.Loader.loadScript({url:G_PATH + '/ui/common/CommonCode.js'});
Ext.define('Ui.analysis.result.view.AnalysisResultViewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ui.analysis.result.view.AnalysisResultGrid',
        'Ui.analysis.result.view.AnalysisResultPanel'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'analysisresultpanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
