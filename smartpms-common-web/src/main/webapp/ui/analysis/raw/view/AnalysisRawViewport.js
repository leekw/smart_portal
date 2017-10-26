Ext.Loader.loadScript({url:G_PATH + '/ui/common/CommonCode.js'});
Ext.define('Ui.analysis.raw.view.AnalysisRawViewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ui.analysis.raw.view.AnalysisRawGrid',
        'Ui.analysis.raw.view.AnalysisRawPanel'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'analysisrawpanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
