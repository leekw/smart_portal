Ext.Loader.loadScript({url:G_PATH + '/ui/common/CommonCode.js'});
Ext.define('Ui.analysis.source.view.AnalysisSourceViewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ui.analysis.source.view.AnalysisSourceGrid',
        'Ui.analysis.source.view.AnalysisSourcePanel'
    ],
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'analysissourcepanel'
                }
            ]
        });

        me.callParent(arguments);
    }
});
