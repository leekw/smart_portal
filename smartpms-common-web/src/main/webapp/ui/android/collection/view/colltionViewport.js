Ext.Loader.loadScript({url:G_PATH + '/ui/common/CommonCode.js'});
Ext.define('Ui.analysis.source.view.AndroidViewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ui.analysis.source.view.AnalysisSourcePanel',
        'Ui.analysis.source.view.AnalysisSourceGrid'
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
