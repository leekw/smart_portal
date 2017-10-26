Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ui.based.board',
    
    appFolder:G_PATH + '/ui/based/board',

    controllers: [
        'Board' 
    ],

    autoCreateViewport: false,
    launch: function () {
    	 Ext.create('Ui.based.board.view.Viewport');
    }
});