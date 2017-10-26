Ext.define('Ext.role.view.RolePanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.rolepanel',
	layout: 'responsivecolumn',
	border : false,
    defaults: {
        xtype: 'container'
    },
	
	items : [
		{
		    xtype: 'panel',
		    responsiveCls: 'big-30 small-50',
		    items : [
				{
				    xtype: 'rolegrid',
				    border : false,
				    padding:5,
				    responsiveCls: 'big-30 small-50'
				},
				{
				    xtype: 'roleinusergrid',
				    border : false,
				    padding:5,
				    responsiveCls: 'big-30 small-50'
				}
		    ]
		},
		{
		    xtype: 'tabpanel',
		    border : false,
		    height: 800,
		    items : [{
		    	xtype : 'panel',
		    	title : '메뉴/화면 권한',
		    	border : false,
		    	items : [
		    	   {
		    		   xtype : 'roleauthgrid'
		    	   }
		    	]
		    },{
		    	xtype : 'panel',
		    	title : '서비스 권한',
		    	border : false,
		    	items : [
		    	    {
		    	    	xtype : 'serviceauthgrid'
		    	    }
		    	]
		    }
		    ],
		    responsiveCls: 'big-70 small-100'
		}
		
		
	]
});