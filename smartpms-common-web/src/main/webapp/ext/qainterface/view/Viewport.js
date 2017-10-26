Ext.define('Ext.qainterface.view.Viewport', {
    extend: 'Ext.Viewport',    
    overflowY : 'auto',
    requires: [
       'Ext.qainterface.view.QaInterfacePanel', 
       'Ext.qainterface.view.QaInterfaceSummaryGrid',
       'Ext.qainterface.view.ProgramGrid',
       'Ext.ux.BoxReorderer'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'qainterfacepanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
