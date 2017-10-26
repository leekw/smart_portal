Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.programcr',
    
    appFolder:G_PATH + '/ext/programcr',

    controllers: [
        'Programcr' 
    ],

    autoCreateViewport: true
});
