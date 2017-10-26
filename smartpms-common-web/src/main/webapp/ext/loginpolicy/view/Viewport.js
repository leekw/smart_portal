/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('Ext.loginpolicy.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
         'Ext.loginpolicy.view.PolicyGrid',
         'Ext.loginpolicy.view.PolicyDetailGrid',
         'Ext.loginpolicy.view.PolicyPanel',
         'Ext.loginpolicy.view.PolicyDetailPanel',
         'Ext.loginpolicy.view.PolicyDetailTabPanel',
         'Ext.loginpolicy.view.PolicyFactorComboBox'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'policytabpanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
