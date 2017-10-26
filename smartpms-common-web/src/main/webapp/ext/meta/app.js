Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.meta',
    
    appFolder:G_PATH + '/ext/meta',

    controllers: [
        'Meta' 
    ],

    autoCreateViewport: true
});
