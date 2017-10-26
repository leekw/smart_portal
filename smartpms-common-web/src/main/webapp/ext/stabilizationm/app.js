Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.stabilizationm',
    
    appFolder:G_PATH + '/ext/stabilizationm',
    
    controllers: [
      'StabilizationDashboard' 
    ],

    autoCreateViewport: true
});