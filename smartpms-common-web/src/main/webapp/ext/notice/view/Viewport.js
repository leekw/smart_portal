/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('Ext.notice.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ext.notice.view.NoticeGrid',
        'Ext.notice.view.NoticeForm',
        'Ext.notice.view.NoticePanelNew',
        'Ext.notice.view.MailComboBox',
        'Ext.notice.view.NoticePanelNew'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'noticepanelnew'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
