Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ui.analysis.summary',
    
    appFolder:G_PATH + '/ui/analysis/summary',

    controllers: [
        'AnalysisSummary' 
    ],

    autoCreateViewport: false,
    launch: function () {
    	 Ext.create('Ui.analysis.summary.view.AnalysisSummaryViewport');
    }
});