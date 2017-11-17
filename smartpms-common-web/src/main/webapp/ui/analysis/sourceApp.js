Ext.Loader.setConfig({enabled: true});

Ext.application({
    name: 'Ui.analysis.source',

    appFolder:G_PATH + '/ui/analysis/source',

    controllers: [
        'AnalysisSource'
    ],

    autoCreateViewport: false,
    launch: function () {
        Ext.create('Ui.analysis.source.view.AnalysisSourceViewport');
    }
});