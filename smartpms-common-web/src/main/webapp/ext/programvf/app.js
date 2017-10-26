Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.programvf',
    
    appFolder:G_PATH + '/ext/programvf',

    controllers: [
        'Programvf' 
    ],

    autoCreateViewport: true
});
