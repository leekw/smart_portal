Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.working',
    
    appFolder:G_PATH + '/ext/working',

    controllers: [
        'Working'
    ],

    autoCreateViewport: true
});