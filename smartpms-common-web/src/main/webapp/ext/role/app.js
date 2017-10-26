Ext.Loader.setConfig({enabled: true});
Ext.application({
    name: 'Ext.role',
    
    appFolder:G_PATH + '/ext/role',

    controllers: [
        'Role' 
    ],

    autoCreateViewport: true
});