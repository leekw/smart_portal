Ext.define('Ui.analysis.summary.view.AnalysisSummaryPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.analysissummarypanel',
	id : 'notice-panel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	border : false,
	items : [ 
	    {
	    	id : 'analysis-summary-list',
			xtype : 'analysissummarygrid',
			style : {
			    'background-color' : '#fff',
			    'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
			},
			responsiveCls: 'big-100 small-100'
		}
	]
});