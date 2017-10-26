Ext.Loader.loadScript({url:G_PATH + '/ext/common/CommonCode.js'});
Ext.Loader.loadScript({url:G_PATH + '/ext/common/Org.js'});
Ext.define('Ext.programvf.view.Viewport', {
    extend: 'Ext.Viewport',    
    overflowY : 'auto',
    requires: [
       'Ext.programvf.view.CRPanel',
       'Ext.programvf.view.CRGrid',
       'Ext.programvf.view.ProgramPanel',
       'Ext.programvf.view.WidgetTop',
       'Ext.programvf.view.VerifyResult',
       'Ext.programvf.view.VerifyGrid',
       'Ext.programvf.view.ProgramGrid',
       'Ext.programvf.view.VolumeGrid',
       'Ext.ux.BoxReorderer'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'programpanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
