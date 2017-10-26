Ext.define('Ext.changerequest.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
       'Ext.changerequest.view.ChangeRequestGrid',
       'Ext.changerequest.view.ChangeRequestPanel',
       'Ext.changerequest.view.RepositoryComboBox',
       'Ext.changerequest.view.ChangeRequestJiraComboBox'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'changerequestpanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
