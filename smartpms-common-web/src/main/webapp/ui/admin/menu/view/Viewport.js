Ext.define('Ui.admin.menu.view.Viewport', {
    extend: 'Ext.Viewport',    
    overflowY : 'auto',
    
    requires: [
        'Ui.admin.menu.view.MenuPanel',
        'Ui.admin.menu.view.FileGrid',
        'Ui.admin.menu.view.MenuServiceGrid'
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
