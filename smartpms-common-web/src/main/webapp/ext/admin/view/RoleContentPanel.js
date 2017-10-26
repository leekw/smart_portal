Ext.define('Ext.admin.view.RoleContentPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.rolecontentpanel',
	id : 'role-content-panel',
	bodyPadding : 5,
	layout:{
		type : 'fit',
		border: true
	},
	items : [ {
		layout : 'column',
		items : [
		   {
			 xtype : 'panel',
			 columnWidth : .30,
			 items: [
				{
				  xtype : 'roleform'
			    }
			 ]
		   }
		]
	  }
	]
});