Ext.define('Ui.based.board.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ui.based.board.view.BoardGrid',
        'Ui.based.board.view.BoardForm',
        'Ui.based.board.view.TeamComboBox',
        'Ui.based.board.view.FileGrid',
        'Ui.based.board.view.BoardPanel'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'boardpanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
