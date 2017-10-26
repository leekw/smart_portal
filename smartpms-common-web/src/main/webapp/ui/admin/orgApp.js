Ext.Loader.setConfig({enabled: true});
Ext.Loader.loadScript({url:G_PATH + '/ui/common/UserCombo.js'});
Ext.application({
    name: 'Ui.admin.org',
    
    appFolder:G_PATH + '/ui/admin/org',

    controllers: [
        'Org' 
    ],

    autoCreateViewport: false,
    launch: function () {
    	 Ext.create('Ui.admin.org.view.Viewport');
    }
});