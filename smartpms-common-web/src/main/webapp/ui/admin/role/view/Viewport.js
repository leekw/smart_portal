Ext.define('Ui.admin.role.view.Viewport', {
    extend: 'Ext.Viewport',    
    overflowY : 'auto',
    
    requires: [
        'Ui.admin.role.view.RolePanel',
        'Ui.admin.role.view.RoleGrid',
        'Ui.admin.role.view.RoleInUserGrid',
        'Ui.admin.role.view.RoleAuthGrid',
        'Ui.admin.role.view.ServiceAuthGrid',
        'Ui.admin.role.view.UserComboBox'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'rolepanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
