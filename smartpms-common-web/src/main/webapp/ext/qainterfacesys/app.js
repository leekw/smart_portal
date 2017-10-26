Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.qainterfacesys',
    
    appFolder:G_PATH + '/ext/qainterfacesys',

    controllers: [
        'QaInterface' 
    ],

    autoCreateViewport: true
});
