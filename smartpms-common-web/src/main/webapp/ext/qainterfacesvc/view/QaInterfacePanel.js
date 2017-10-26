Ext.define('Ext.qainterfacesvc.view.QaInterfacePanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.qainterfacepanel',
	id : 'qainterface-panel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	items : [ 
		{
			xtype : 'tabpanel',
			items : [
			   {
				   xtype : 'qainterfacesummarygrid',
				   title : 'Billing-서비스연동',
				   id : 'bill-svc-grid',
				   listeners : {
					   activate : function( tab, eOpts ) {
						    var grid = Ext.getCmp('bill-svc-grid');
				    		var store = grid.getStore();
				    		var proxy = store.getProxy();
				    		proxy.extraParams.sourceTeam = 'Billing';
				    		proxy.extraParams.relationType = 'SERVICE';
				    		store.load();
				    	}
				   }
			   },
			   {
				   xtype : 'qainterfacesummarygrid',
				   title : 'Order-서비스연동',
				   id : 'ord-svc-grid',
				   listeners : {
					   activate : function( tab, eOpts ) {
						    var grid = Ext.getCmp('ord-svc-grid');
				    		var store = grid.getStore();
				    		var proxy = store.getProxy();
				    		proxy.extraParams.sourceTeam = 'Order';
				    		proxy.extraParams.relationType = 'SERVICE';
				    		store.load();
				    	}
				   }
			   },
			   {
				   xtype : 'qainterfacesummarygrid',
				   title : 'RDS-서비스연동',
				   id : 'rds-svc-grid',
				   listeners : {
					   activate : function( tab, eOpts ) {
						    var grid = Ext.getCmp('rds-svc-grid');
				    		var store = grid.getStore();
				    		var proxy = store.getProxy();
				    		proxy.extraParams.sourceTeam = 'RDS';
				    		proxy.extraParams.relationType = 'SERVICE';
				    		store.load();
				    	}
				   }
			   },
			   {
				   xtype : 'qainterfacesummarygrid',
				   title : '기타-서비스연동',
				   id : 'etc-svc-grid',
				   listeners : {
					   activate : function( tab, eOpts ) {
						    var grid = Ext.getCmp('etc-svc-grid');
				    		var store = grid.getStore();
				    		var proxy = store.getProxy();
				    		proxy.extraParams.sourceTeam = 'ETC';
				    		proxy.extraParams.relationType = 'SERVICE';
				    		store.load();
				    	}
				   }
			   }
			],
			responsiveCls: 'big-100 small-100'
		}
	]
});
