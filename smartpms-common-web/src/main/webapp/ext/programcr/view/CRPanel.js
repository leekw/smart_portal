Ext.define('Ext.programcr.view.CRPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.crpanel',
	id : 'cr-panel',
	bodyPadding : 5,
	layout:{
		type: 'vbox',
        align: 'stretch'
	},
	items : [ 
		{
			xtype : 'crgrid'
		}
	]
});
