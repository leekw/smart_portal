Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.cutover',
    
    appFolder:G_PATH + '/ext/cutover',

    controllers: [
        'Cutover' 
    ],

    autoCreateViewport: true
});
