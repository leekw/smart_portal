Ext.define('Ext.nmenu.view.Viewport', {
    extend: 'Ext.Viewport',    
    overflowY : 'auto',
    
    requires: [
        'Ext.nmenu.view.MenuPanel',
        'Ext.nmenu.view.FileGrid',
        'Ext.nmenu.view.MenuServiceGrid'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'menupanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
