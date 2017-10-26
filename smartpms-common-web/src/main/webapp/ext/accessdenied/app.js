Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.accessdenied',
    
    appFolder:G_PATH + '/ext/accessdenied',

    controllers: [
        'AccessDenied'
    ],

    autoCreateViewport: true
});