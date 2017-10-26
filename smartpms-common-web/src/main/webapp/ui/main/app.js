Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ui.main',
    
    appFolder: G_PATH + '/ui/main',
    
    extend: 'Ui.main.Application',

    requires: [
       'Ui.main.*'
    ],

    autoCreateViewport: true
});