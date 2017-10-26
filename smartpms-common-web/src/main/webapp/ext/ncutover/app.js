Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.ncutover',
    
    appFolder:G_PATH + '/ext/ncutover',
    
    controllers: [
      'CutoverDashboard' 
    ],

    autoCreateViewport: true
});