Ext.define('Ui.admin.session.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ui.admin.session.view.SessionPanel'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'sessionpanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
