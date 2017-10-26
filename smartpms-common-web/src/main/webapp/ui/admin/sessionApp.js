Ext.Loader.setConfig({enabled: true});
Ext.application({
    name: 'Ui.admin.session',
    
    appFolder:G_PATH + '/ui/admin/session',

    controllers: [
        'Session' 
    ],

    autoCreateViewport: false,
    launch: function () {
    	 Ext.create('Ui.admin.session.view.Viewport');
    }
});