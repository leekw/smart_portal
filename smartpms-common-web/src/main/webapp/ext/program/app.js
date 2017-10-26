Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.program',
    
    appFolder:G_PATH + '/ext/program',

    controllers: [
        'Program' 
    ],

    autoCreateViewport: true
});
