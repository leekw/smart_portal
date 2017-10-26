Ext.define('Ui.analysis.raw.view.AnalysisRawPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.analysisrawpanel',
	id : 'notice-panel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	border : false,
	items : [ 
	    {
	    	id : 'analysis-raw-list',
			xtype : 'analysisrawgrid',
			style : {
			    'background-color' : '#fff',
			    'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
			},
			responsiveCls: 'big-100 small-100'
		}
	]
});