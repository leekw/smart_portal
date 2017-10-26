/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('Ext.board.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ext.board.view.BoardGrid',
        'Ext.board.view.BoardForm',
        'Ext.board.view.TeamComboBox',
        'Ext.board.view.FileGrid',
        'Ext.board.view.BoardPanelNew'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'boardpanelnew'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
