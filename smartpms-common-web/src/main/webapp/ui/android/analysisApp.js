Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ui.android.analysis',
    
    appFolder:G_PATH + '/ui/android/analysis',

    controllers: [
        'Analysis'
    ],

    autoCreateViewport: false,
    launch: function () {
    	 Ext.create('Ui.android.analysis.view.AnalysisViewport');
    }
});