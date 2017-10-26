Ext.define('Ui.based.notice.view.NoticeViewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Ui.based.notice.view.NoticeGrid',
        'Ui.based.notice.view.NoticeForm',
        'Ui.based.notice.view.NoticePanel'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'noticepanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
