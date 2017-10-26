Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.quality',
    
    appFolder:G_PATH + '/ext/quality',

    controllers: [
        'Quality' 
    ],

    autoCreateViewport: true
});
