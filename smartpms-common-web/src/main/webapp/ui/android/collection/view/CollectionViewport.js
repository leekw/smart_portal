Ext.Loader.loadScript({url:G_PATH + '/ui/common/CommonCode.js'});
Ext.define('Ui.android.collection.view.CollectionViewport', {
    extend: 'Ext.Viewport',
    layout: 'fit',

    requires: [
        'Ui.android.collection.view.CollectionPanel',
        'Ui.android.collection.view.CollectionGrid',
        'Ui.android.collection.view.CollectionAnalysisTree'
    ],

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            items: [
                {
                    xtype: 'collectionpanel'
                }
            ]
        });

        me.callParent(arguments);
    }
});