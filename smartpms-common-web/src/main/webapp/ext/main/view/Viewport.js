/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('Ext.main.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ext.main.view.MainGrid',
        'Ext.main.view.MainPanel',
        'Ext.main.view.MainComboBox',
        'Ext.main.view.TransitionComboBox'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'mainpanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
