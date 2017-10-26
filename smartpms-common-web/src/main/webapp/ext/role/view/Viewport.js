/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('Ext.role.view.Viewport', {
    extend: 'Ext.Viewport',    
    overflowY : 'auto',
    
    requires: [
        'Ext.role.view.RolePanel',
        'Ext.role.view.RoleGrid',
        'Ext.role.view.RoleInUserGrid',
        'Ext.role.view.RoleAuthGrid',
        'Ext.role.view.ServiceAuthGrid',
        'Ext.role.view.UserComboBox'
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
