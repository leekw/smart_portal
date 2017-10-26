Ext.define('Ext.qualityhist.view.QualityHistPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.qualityhistpanel',
	id : 'quality-hist-panel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
	title : 'Billing-AR',
    defaults: {
        xtype: 'container'
    },
	items : [ 
		{
			xtype : 'qualityhistsummarygrid',
			responsiveCls: 'big-100 small-100'
		},
		{
			xtype : 'sourcesizechart',
			responsiveCls: 'big-50 small-50'
		},
		{
			xtype : 'changesourcechart',
			responsiveCls: 'big-50 small-50'
		},
		{
			xtype : 'svnnotregchart',
			responsiveCls: 'big-50 small-50'
		},
		{
			xtype : 'checktargetchart',
			responsiveCls: 'big-50 small-50'
		},
		{
			xtype : 'unusedsourcechart',
			responsiveCls: 'big-50 small-50'
		},
		{
			xtype : 'understatementchart',
			responsiveCls: 'big-50 small-50'
		},
		{
			xtype : 'unittestchart',
			responsiveCls: 'big-50 small-50'
		},
		{
			xtype : 'unittestnotestchart',
			responsiveCls: 'big-50 small-50'
		},
		{
			xtype : 'runchart',
			responsiveCls: 'big-50 small-50'
		},
		{
			xtype : 'coveragechart',
			responsiveCls: 'big-50 small-50'
		},
		{
			xtype : 'sittestchart',
			responsiveCls: 'big-50 small-50'
		},
		{
			xtype : 'sitnotestchart',
			responsiveCls: 'big-50 small-50'
		},
		{
			xtype : 'sitrunchart',
			responsiveCls: 'big-50 small-50'
		},
		{
			xtype : 'sitcoveragechart',
			responsiveCls: 'big-50 small-50'
		}
	]
});
