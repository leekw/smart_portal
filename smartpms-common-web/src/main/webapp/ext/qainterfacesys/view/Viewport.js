Ext.define('Ext.qainterfacesys.view.Viewport', {
    extend: 'Ext.Viewport',    
    overflowY : 'auto',
    requires: [
       'Ext.qainterfacesys.view.QaInterfacePanel', 
       'Ext.qainterfacesys.view.QaInterfaceSummaryGrid',
       'Ext.qainterfacesys.view.ProgramGrid',
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
