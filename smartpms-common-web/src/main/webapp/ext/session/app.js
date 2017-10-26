Ext.Loader.setConfig({enabled: true});
Ext.application({
    name: 'Ext.session',
    
    appFolder:G_PATH + '/ext/session',

    controllers: [
        'Session' 
    ],

    autoCreateViewport: true
});