/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('Ext.loginfail.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
         'Ext.loginfail.view.LoginFailWindow'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'loginfailwindow'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
