Ext.define('Ext.nlayoutm.view.Error404Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.pageserror404window',

    requires: [
        'Ext.container.Container',
        'Ext.toolbar.Spacer',
        'Ext.form.Label'
    ],

    autoShow: true,
    cls: 'error-page-container',
    closable: false,
    title: '페이지 접속 오류',
    titleAlign: 'center',
    maximized: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    items: [
        {
            xtype: 'container',
            width: 400,
            cls:'error-page-inner-container',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'label',
                    cls: 'error-page-top-text',
                    text: '404'
                },
                {
                    xtype: 'label',
                    cls: 'error-page-desc',
                    html: '<div>Seems you\'ve hit a wall!</div><div>Try going back to our <a href="#dashboard"> 메인페이지 </a></div>'
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                }
            ]
        }
    ]
});
