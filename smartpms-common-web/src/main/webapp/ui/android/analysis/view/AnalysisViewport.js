Ext.Loader.loadScript({url:G_PATH + '/ui/common/CommonCode.js'});
Ext.define('Ui.android.analysis.view.AnalysisViewport', {
    extend: 'Ext.Viewport',
    layout: 'fit',

    requires: [
        'Ui.android.analysis.view.AnalysisPanel',
        'Ui.android.analysis.view.AnalysisGrid'

    ],

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            items: [
                {
                    xtype: 'analysispanel'
                }
            ]
        });

        me.callParent(arguments);
    }
});