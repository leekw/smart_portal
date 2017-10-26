Ext.Loader.setConfig({enabled: true});
Ext.application({
    name: 'Ui.admin.role',
    
    appFolder:G_PATH + '/ui/admin/role',

    controllers: [
        'Role' 
    ],

    autoCreateViewport: false,
    launch: function () {
    	 Ext.create('Ui.admin.role.view.Viewport');
    }
});