Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.stabilization',
    
    appFolder:G_PATH + '/ext/stabilization',
    
    controllers: [
      'StabilizationDashboard' 
    ],

    autoCreateViewport: true
});