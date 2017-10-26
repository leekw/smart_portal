Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.board',
    
    appFolder:G_PATH + '/ext/board',

    controllers: [
        'Board' 
    ],

    autoCreateViewport: true
});