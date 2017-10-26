/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('Ext.cutover.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    border: false,
    requires: [
        'Ext.cutover.view.CutoverPanel',
        'Ext.cutover.view.CutoverGrid',
        'Ext.cutover.view.UserComboBox',
        'Ext.cutover.view.TaskComboBox'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'cutoverpanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
