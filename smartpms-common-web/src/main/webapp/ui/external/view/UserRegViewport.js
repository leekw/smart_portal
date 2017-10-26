Ext.define('Ui.external.view.UserRegViewport', {
	extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ui.external.view.UserRegPanel',
        'Ui.external.view.OrgTree',
        'Ext.ux.BoxReorderer'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'userregpanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
