Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.dlog',
    
    appFolder:G_PATH + '/ext/dlog',

    controllers: [
        'DLog' 
    ],

    autoCreateViewport: true
});
