/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('Ext.login.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
         'Ext.login.view.LockingWindow',
         'Ext.login.view.Dialog',
         'Ext.login.view.Login',
         'Ext.login.view.LoginModel',
         'Ext.login.view.LoginController',
         'Ext.login.view.OrgTree'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'pageslogin'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
