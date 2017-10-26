Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.portal',
    
    appFolder:G_PATH + '/ext/portal',

    controllers: [
        'Portal' 
    ],

    autoCreateViewport: true
});