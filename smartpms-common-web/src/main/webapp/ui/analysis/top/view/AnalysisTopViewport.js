Ext.Loader.loadScript({url:G_PATH + '/ui/common/CommonCode.js'});
Ext.define('Ui.analysis.top.view.AnalysisTopViewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ui.analysis.top.view.AnalysisWebGrid',
        'Ui.analysis.top.view.AnalysisAppGrid',
        'Ui.analysis.top.view.AnalysisLibGrid',
        'Ui.analysis.top.view.AnalysisTopPanel'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'analysistoppanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
