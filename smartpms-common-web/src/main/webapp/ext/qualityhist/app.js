Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.qualityhist',
    
    appFolder:G_PATH + '/ext/qualityhist',

    controllers: [
        'QualityHist' 
    ],

    autoCreateViewport: true
});
