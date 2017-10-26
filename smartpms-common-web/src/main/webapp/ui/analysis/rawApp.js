Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ui.analysis.raw',
    
    appFolder:G_PATH + '/ui/analysis/raw',

    controllers: [
        'AnalysisRaw' 
    ],

    autoCreateViewport: false,
    launch: function () {
    	 Ext.create('Ui.analysis.raw.view.AnalysisRawViewport');
    }
});