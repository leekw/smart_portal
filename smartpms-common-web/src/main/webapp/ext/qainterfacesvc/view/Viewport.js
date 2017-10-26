Ext.define('Ext.qainterfacesvc.view.Viewport', {
    extend: 'Ext.Viewport',    
    overflowY : 'auto',
    requires: [
       'Ext.qainterfacesvc.view.QaInterfacePanel', 
       'Ext.qainterfacesvc.view.QaInterfaceSummaryGrid',
       'Ext.qainterfacesvc.view.ProgramGrid',
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
