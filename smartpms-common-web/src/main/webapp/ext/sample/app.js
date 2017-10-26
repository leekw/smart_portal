Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.sample',
    
    appFolder:G_PATH + '/ext/sample',

    controllers: [
        'Sample' 
    ],

    autoCreateViewport: true
});