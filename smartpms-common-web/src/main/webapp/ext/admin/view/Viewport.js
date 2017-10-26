/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('Ext.admin.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ext.admin.view.AdminPanel',
        'Ext.admin.view.SessionUserGrid',
        'Ext.admin.view.RolePanel',
        'Ext.admin.view.RoleTree',
        'Ext.admin.view.RoleForm',
        'Ext.admin.view.UserSearchGrid',
        'Ext.admin.view.RoleContentPanel',
        'Ext.admin.view.UserPanel',
        'Ext.admin.view.UserGrid',
        'Ext.admin.view.RoleGrid',
        'Ext.admin.view.SelectedUserGrid',
        'Ext.admin.view.RoleComboBox',
        'Ext.admin.view.MenuTree',
        'Ext.admin.view.MenuAuthGrid'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'adminpanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
