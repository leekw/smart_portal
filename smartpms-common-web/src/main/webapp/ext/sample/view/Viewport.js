/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('Ext.sample.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ext.sample.view.SampleGrid',
        'Ext.sample.view.SampleForm',
        'Ext.sample.view.SampleTree',
        'Ext.sample.view.SampleTabPanel',
        'Ext.sample.view.SampleCodeGrid',
        'Ext.sample.view.SampleWindow',
        'Ext.sample.view.SampleTree2',
        'Ext.sample.view.SampleComboBox'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'samplepanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
