Ext.define('Ext.admin.view.AdminPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.adminpanel',
	id : 'admin-panel',
	bodyPadding : 5,
	items : [
		{
			id : 'role-admin',
			items : [{
						xtype : 'rolepanel'
					}
			]
		}     
	]
});
