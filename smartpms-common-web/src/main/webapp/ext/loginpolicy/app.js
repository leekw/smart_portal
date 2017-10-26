Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.loginpolicy',
    
    appFolder:G_PATH + '/ext/loginpolicy',

    controllers: [
        'LoginPolicy'
    ],

    autoCreateViewport: true
});