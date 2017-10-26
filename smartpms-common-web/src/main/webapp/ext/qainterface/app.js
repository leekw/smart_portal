Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.qainterface',
    
    appFolder:G_PATH + '/ext/qainterface',

    controllers: [
        'QaInterface' 
    ],

    autoCreateViewport: true
});
