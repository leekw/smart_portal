Ext.define('Ui.admin.org.view.Viewport', {
    extend: 'Ext.Viewport',    
    overflowY : 'auto',
    
    requires: [
        'Ui.admin.org.view.OrgPanel',
        'Ui.admin.org.view.OrgUserGrid',
        'Ui.admin.org.view.OrgRoleGrid'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'orgpanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
