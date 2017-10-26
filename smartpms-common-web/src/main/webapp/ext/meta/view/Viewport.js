Ext.Loader.loadScript({url:G_PATH + '/ext/common/CommonCode.js'});
Ext.Loader.loadScript({url:G_PATH + '/ext/common/Org.js'});
Ext.define('Ext.meta.view.Viewport', {
    extend: 'Ext.Viewport',    
    overflowY : 'auto',
    requires: [
       'Ext.meta.view.MetaGrid',
       'Ext.ux.BoxReorderer'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'metagrid'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
