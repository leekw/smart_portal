Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.loginm',
    
    appFolder:G_PATH + '/ext/loginm',

    controllers: [
        'LoginMobile'
    ],

    autoCreateViewport: true
});