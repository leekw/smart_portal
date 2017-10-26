Ext.Loader.setConfig({enabled: true});
Ext.application({
    name: 'Ui.admin.menu',
    
    appFolder:G_PATH + '/ui/admin/menu',

    controllers: [
        'Menu' 
    ],

    autoCreateViewport: false,
    launch: function () {
    	 Ext.create('Ui.admin.menu.view.Viewport');
    }
});