Ext.Loader.setConfig({enabled: true});
Ext.application({
    name: 'Ext.admin',
    
    appFolder:G_PATH + '/ext/admin',

    controllers: [
        'Admin' 
    ],

    autoCreateViewport: true
});