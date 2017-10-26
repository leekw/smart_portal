Ext.Loader.loadScript({url:G_PATH + '/ext/common/CommonCode.js'});
Ext.Loader.loadScript({url:G_PATH + '/ext/common/Org.js'});
Ext.define('Ext.program.view.Viewport', {
    extend: 'Ext.Viewport',
    layout: 'fit',
    border: false,
    requires: [
       'Ext.program.view.ProgramPanel',
       'Ext.program.view.CRPanel',
       'Ext.ux.BoxReorderer',
       'Ext.program.view.SourceProgramGrid',
       'Ext.program.view.ProgramGrid',
       'Ext.program.view.ProgramBatchForm',
       'Ext.program.view.WBSCRForm'
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