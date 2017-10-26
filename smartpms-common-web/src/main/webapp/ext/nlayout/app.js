Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ext.nlayout',
    
    appFolder: G_PATH + '/ext/nlayout',
    
    extend: 'Ext.nlayout.Application',

    requires: [
       'Ext.nlayout.*'
    ],

    autoCreateViewport: true
});