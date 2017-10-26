Ext.define('Ext.admin.view.UserPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.userpanel',
	id : 'user-panel',
	bodyPadding : 5,
	fieldDefaults : {
		labelAlign : 'left',
		msgTarget : 'side'
	},
	items : [ {
		xtype:'usergrid'
	}
	]
});