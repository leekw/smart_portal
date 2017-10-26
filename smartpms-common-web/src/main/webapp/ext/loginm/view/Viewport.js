/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('Ext.loginm.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
         'Ext.loginm.view.LockingWindow',
         'Ext.loginm.view.Dialog',
         'Ext.loginm.view.Login',
         'Ext.loginm.view.LoginModel',
         'Ext.loginm.view.LoginController'
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
