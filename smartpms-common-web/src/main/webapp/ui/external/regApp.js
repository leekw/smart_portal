Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ui.external',
    
    appFolder: G_PATH + '/ui/external',
    
    extend: 'Ui.external.Application',

    requires: [
       'Ui.external.*'
    ],
    controllers: [
       'RegUser' 
	],

    autoCreateViewport: false,
    launch: function () {
    	 Ext.create('Ui.external.view.UserRegViewport');
    }
});