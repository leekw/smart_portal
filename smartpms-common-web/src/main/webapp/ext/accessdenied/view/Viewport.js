/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('Ext.accessdenied.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
         'Ext.accessdenied.view.AccessDeniedWindow'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'accessdeniedwindow'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
