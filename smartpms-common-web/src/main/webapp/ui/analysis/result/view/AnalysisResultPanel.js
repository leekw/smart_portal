Ext.define('Ui.analysis.result.view.AnalysisResultPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.analysisresultpanel',
	id : 'notice-panel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	border : false,
	items : [ 
	    {
	    	id : 'analysis-result-list',
			xtype : 'analysisresultgrid',
			style : {
			    'background-color' : '#fff',
			    'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
			},
			responsiveCls: 'big-100 small-100'
		},{
			hidden:true,
			collapsible:false,
			xtpe : 'panel',
            html: '<iframe id="file-down-iframe" width="0" height="0" src="" frameborder="0" allowfullscreen></iframe>'
		}
	]
});