Ext.Loader.setConfig({enabled: true});
Ext.application({
    name: 'Ext.setting',
    
    appFolder:G_PATH + '/ext/setting',

    controllers: [
        'Setting' 
    ],

    autoCreateViewport: true
});