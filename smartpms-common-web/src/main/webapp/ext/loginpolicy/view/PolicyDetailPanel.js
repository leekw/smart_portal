Ext.define('Ext.loginpolicy.view.PolicyDetailPanel', {
	extend : 'Ext.form.Panel',
	alias : 'widget.policydetailpanel',
	frame : false,
	bodyPadding : 5,
	fieldDefaults : {
		labelAlign : 'left',
		msgTarget : 'side'
	},
	items : [ {
		xtype : 'policydetailgrid'
	}, {
		xtype : 'policydetailtab'
	} ]
});