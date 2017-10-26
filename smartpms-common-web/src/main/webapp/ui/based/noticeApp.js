Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ui.based.notice',
    
    appFolder:G_PATH + '/ui/based/notice',

    controllers: [
        'Notice' 
    ],

    autoCreateViewport: false,
    launch: function () {
    	 Ext.create('Ui.based.notice.view.NoticeViewport');
    }
});