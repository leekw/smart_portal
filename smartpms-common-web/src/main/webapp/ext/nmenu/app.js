Ext.Loader.setConfig({enabled: true});
Ext.application({
    name: 'Ext.nmenu',
    
    appFolder:G_PATH + '/ext/nmenu',

    controllers: [
        'Menu' 
    ],

    autoCreateViewport: true
});