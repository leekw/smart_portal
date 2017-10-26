Ext.Loader.setConfig({enabled: true});
Ext.application({
    name: 'Ext.user',
    
    appFolder:G_PATH + '/ext/user',

    controllers: [
        'User' 
    ],

    autoCreateViewport: true
});