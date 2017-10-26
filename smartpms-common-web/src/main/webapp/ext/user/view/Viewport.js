/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('Ext.user.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ext.user.view.UserPanel',
        'Ext.user.view.UserGrid',
        'Ext.user.view.RoleComboBox'
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
