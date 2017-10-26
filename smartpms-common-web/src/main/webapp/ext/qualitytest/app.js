Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.qualitytest',
    
    appFolder:G_PATH + '/ext/qualitytest',

    controllers: [
        'QualityTest' 
    ],

    autoCreateViewport: true
});
