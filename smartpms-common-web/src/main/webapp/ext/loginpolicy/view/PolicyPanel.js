Ext.define('Ext.loginpolicy.view.PolicyPanel', {
	extend : 'Ext.form.Panel',
	alias : 'widget.policypanel',
	frame : false,
	bodyPadding : 5,
	fieldDefaults : {
		labelAlign : 'left',
		msgTarget : 'side'
	},
	layout : 'column',
	items : [ {
		xtype : 'policygrid',
		columnWidth : .50
	}, {
		xtype : 'policydetailpanel',
		columnWidth : .50
	} ]
});