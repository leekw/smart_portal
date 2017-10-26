Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.login',
    
    appFolder:G_PATH + '/ext/login',

    controllers: [
        'Login'
    ],

    autoCreateViewport: true
});