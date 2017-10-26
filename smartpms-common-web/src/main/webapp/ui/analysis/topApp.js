Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ui.analysis.top',
    
    appFolder:G_PATH + '/ui/analysis/top',

    controllers: [
        'AnalysisTop'
    ],

    autoCreateViewport: false,
    launch: function () {
    	 Ext.create('Ui.analysis.top.view.AnalysisTopViewport');
    }
});