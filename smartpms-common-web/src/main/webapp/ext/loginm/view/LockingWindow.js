Ext.define('Ext.loginm.view.LockingWindow', {
    extend: 'Ext.window.Window',
    xtype: 'lockingwindow',

    cls: 'auth-locked-window',

    closable: false,
    resizable: false,
    autoShow: true,
    titleAlign: 'center',
    maximized: true,
    modal: true,
    frameHeader: false,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    }
});
