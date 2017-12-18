Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ui.analysis.sourceResult',

    appFolder:G_PATH + '/ui/analysis/sourceResult',

    controllers: [
        'AnalysisSourceResult'
    ],

    autoCreateViewport: false,
    launch: function () {
        Ext.create('Ui.analysis.sourceResult.view.AnalysisSourceResultViewport');
    }
});