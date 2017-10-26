Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.changerequest',
    
    appFolder:G_PATH + '/ext/changerequest',

    controllers: [
        'ChangeRequest' 
    ],

    autoCreateViewport: true
});