Ext.define('Ui.analysis.top.view.AnalysisTopPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.analysistoppanel',
	id : 'top-panel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	border : false,
	items : [ 
	    {
	    	id : 'analysis-web-list',
			xtype : 'analysiswebgrid',
			style : {
			    'background-color' : '#fff',
			    'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
			},
			responsiveCls: 'big-50 small-100'
		},
		{
	    	id : 'analysis-app-list',
			xtype : 'analysisappgrid',
			style : {
			    'background-color' : '#fff',
			    'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
			},
			responsiveCls: 'big-50 small-100'
		},
		{
	    	id : 'analysis-lib-list',
			xtype : 'analysislibgrid',
			style : {
			    'background-color' : '#fff',
			    'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
			},
			responsiveCls: 'big-100 small-100'
		}
	]
});