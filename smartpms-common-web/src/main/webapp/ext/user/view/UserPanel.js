Ext.define('Ext.user.view.UserPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.userpanel',
	id : 'user-panel',
	bodyPadding : 5,
	layout:{
		type : 'fit',
		border: true
	},
	title: '사용자 관리',
	items : [ {
		xtype:'usergrid'
	}
	]
});