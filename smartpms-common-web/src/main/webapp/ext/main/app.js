Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.main',
    
    appFolder:G_PATH + '/ext/main',

    controllers: [
        'Main' 
    ],

    autoCreateViewport: true
});
