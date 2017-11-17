Ext.define('Ui.analysis.source.view.AnalysisSourcePanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.analysissourcepanel',
	id : 'notice-panel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	border : false
	,
	items : [
	    {
	    	id : 'analysis-source-list',
			xtype : 'analysissourcegrid',
			style : {
			    'background-color' : '#fff',
			    'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
			},
			responsiveCls: 'big-100 small-100'
		}
	]
});