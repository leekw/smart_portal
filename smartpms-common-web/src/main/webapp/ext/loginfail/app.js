Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.loginfail',
    
    appFolder:G_PATH + '/ext/loginfail',

    controllers: [
        'LoginFail'
    ],

    autoCreateViewport: true
});