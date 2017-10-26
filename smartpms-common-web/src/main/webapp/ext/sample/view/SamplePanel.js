Ext.define('Ext.sample.view.SamplePanel', {
	extend : 'Ext.form.Panel',
	alias : 'widget.samplepanel',
	frame : true,
	title : 'Integration View Sample',
	bodyPadding : 5,
	fieldDefaults : {
		labelAlign : 'left',
		msgTarget : 'side'
	},
	items : [ {
		layout : 'column',
		items : [ {
			xtype : 'samplegrid',
			columnWidth : .40
		}, {
			xtype : 'sampleform',
			columnWidth : .30
		}, {
			xtype : 'sampletree',
			columnWidth : .30
		} ]
	}, {
		xtype:'sampletabpanel',
		padding: '10 0 0 0',
	} ]
});