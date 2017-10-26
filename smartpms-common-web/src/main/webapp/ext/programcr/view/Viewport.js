Ext.Loader.loadScript({url:G_PATH + '/ext/common/CommonCode.js'});
Ext.Loader.loadScript({url:G_PATH + '/ext/common/Org.js'});
Ext.define('Ext.programcr.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    border: false,
    requires: [
       'Ext.programcr.view.ProgramPanel',
       'Ext.programcr.view.CRPanel',
       'Ext.programcr.view.CRGrid',
       'Ext.ux.BoxReorderer',
       'Ext.programcr.view.ProgramGrid',
       'Ext.programcr.view.ProgramBatchForm',
       'Ext.programcr.view.WBSCRForm',
       'Ext.programcr.view.SourceProgramGrid'
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
