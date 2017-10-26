Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.notice',
    
    appFolder:G_PATH + '/ext/notice',

    controllers: [
        'Notice' 
    ],

    autoCreateViewport: true
});