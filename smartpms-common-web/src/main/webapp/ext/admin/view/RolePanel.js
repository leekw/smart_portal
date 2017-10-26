Ext.define('Ext.admin.view.RolePanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.rolepanel',
	id : 'role-panel',
	bodyPadding : 5,
	
	layout: {
        type: 'vbox',
        align: 'stretch'
    },

    defaults: {
        cls: 'navigation-email',
        margin: '0 20 20 0'
    },
	
	items : [
	{
		xtype: 'container',
		layout: {
	        type: 'hbox',
	        align: 'stretch'
	    },
	    items :[{
	    	width : '97%',
	    	margin: '20 0 0 20',
			xtype : 'rolegrid'
		}
	    ]
	},
	{
		xtype: 'container',
		layout: {
	        type: 'hbox',
	        align: 'stretch'
	    },
	    items: [{
	    	width : '37%',
	    	margin: '20 0 0 20',
			xtype : 'menutree'
		},
		{
			width : '60%',
			margin: '20 0 0 20',
			xtype : 'menuauthgrid'
		}
	    ]
	}	
		
	]
});