Ext.define('Ext.qualitytest.view.QualityTestPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.qualitytestpanel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	items : [
		{
			xtype : 'treepanel',
			height: 200,
			rootVisible : false,
			bodyStyle: {
		        background: 'none'
		    },
		    style : {
		    	background: 'none'
		    },
		    border : false,
		    listeners : {
		    	afterrender : function(tree, eOpts) {
		    	}
		    },
			responsiveCls: 'big-20 small-50'
		},
		{
			xtype : 'treepanel',
			height: 200,
			rootVisible : false,
			bodyStyle: {
		        background: 'none'
		    },
		    border : false,
			responsiveCls: 'big-20 small-50'
		},
		{
			xtype : 'treepanel',
			height: 200,
			rootVisible : false,
			bodyStyle: {
		        background: 'none'
		    },
		    border : false,
			responsiveCls: 'big-20 small-50'
		},
		{
			xtype : 'treepanel',
			height: 200,
			rootVisible : false,
			bodyStyle: {
		        background: 'none'
		    },
		    border : false,
			responsiveCls: 'big-20 small-50'
		},
		{
			xtype : 'treepanel',
			height: 200,
			rootVisible : false,
			bodyStyle: {
		        background: 'none'
		    },
		    border : false,
			responsiveCls: 'big-20 small-50'
		}
	]
});
