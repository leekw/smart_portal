Ext.Loader.setConfig({enabled: true});
Ext.application({
    name: 'Ext.menu',
    
    appFolder:G_PATH + '/ext/menu',

    controllers: [
        'Menu' 
    ],

    autoCreateViewport: true
});