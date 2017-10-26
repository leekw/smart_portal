Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.layout',
    
    appFolder:G_PATH + '/ext/layout',

    controllers: [
        'LayoutMain'
    ],

    autoCreateViewport: true
});