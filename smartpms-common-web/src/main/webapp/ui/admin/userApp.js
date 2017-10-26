Ext.Loader.setConfig({enabled: true});
Ext.application({
    name: 'Ui.admin.user',
    
    appFolder:G_PATH + '/ui/admin/user',

    controllers: [
        'User' 
    ],

    autoCreateViewport: false,
    launch: function () {
    	 Ext.create('Ui.admin.user.view.Viewport');
    }
});