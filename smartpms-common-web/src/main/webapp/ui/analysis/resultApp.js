Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ui.analysis.result',
    
    appFolder:G_PATH + '/ui/analysis/result',

    controllers: [
        'AnalysisResult' 
    ],

    autoCreateViewport: false,
    launch: function () {
    	 Ext.create('Ui.analysis.result.view.AnalysisResultViewport');
    }
});