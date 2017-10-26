Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.qainterfacesvc',
    
    appFolder:G_PATH + '/ext/qainterfacesvc',

    controllers: [
        'QaInterface' 
    ],

    autoCreateViewport: true
});
