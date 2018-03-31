Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ui.android.collection',
    
    appFolder:G_PATH + '/ui/android/collection',

    controllers: [
        'Collection'
    ],

    autoCreateViewport: false,
    launch: function () {
    	 Ext.create('Ui.android.collection.view.CollectionViewport');
    }
});

var launch =            function () {

}