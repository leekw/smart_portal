Ext.define('Ext.session.view.SessionPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.sessionpanel',
	id : 'session-panel',
	bodyPadding : 5,
	layout:{
		type : 'fit',
		border: false
	},
	title: '접속 현황',
	items : [ 
	    {
	    	xtype : 'sessionusergrid',
	    	border: false
	    }
	]
});
