Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.ncutoverm',
    
    appFolder:G_PATH + '/ext/ncutoverm',
    
    controllers: [
      'CutoverDashboard' 
    ],

    autoCreateViewport: true
});