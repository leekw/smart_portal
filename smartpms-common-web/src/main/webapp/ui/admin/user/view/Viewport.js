Ext.define('Ui.admin.user.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ui.admin.user.view.UserPanel',
        'Ui.admin.user.view.UserGrid',
        'Ui.admin.user.view.RoleComboBox'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'userpanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
