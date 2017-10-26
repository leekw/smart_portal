Ext.define('Ext.setting.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ext.setting.view.SettingPanel'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'settingpanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
