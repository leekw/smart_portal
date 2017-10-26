Ext.define('Ext.qainterface.view.QaInterfacePanel', {
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
				   title : 'Billing-AR',
				   id : 'ar-grid',
				   listeners : {
					   activate : function( tab, eOpts ) {
						    var grid = Ext.getCmp('ar-grid');
				    		var store = grid.getStore();
				    		var proxy = store.getProxy();
				    		proxy.extraParams.sourceModule = 'AR';
				    		proxy.extraParams.relationType = 'CLASS';
				    		store.load();
				    	}
				   }
			   },
			   {
				   xtype : 'qainterfacesummarygrid',
				   title : 'Billing-청구',
				   id : 'bil-grid',
				   listeners : {
					   activate : function( tab, eOpts ) {
						    var grid = Ext.getCmp('bil-grid');
				    		var store = grid.getStore();
				    		var proxy = store.getProxy();
				    		proxy.extraParams.sourceModule = '청구';
				    		proxy.extraParams.relationType = 'CLASS';
				    		store.load();
				    	}
				   }
			   },
			   {
				   xtype : 'qainterfacesummarygrid',
				   title : 'Billing-요금온라인',
				   id : 'bcol-grid',
				   listeners : {
					   activate : function( tab, eOpts ) {
						    var grid = Ext.getCmp('bcol-grid');
				    		var store = grid.getStore();
				    		var proxy = store.getProxy();
				    		proxy.extraParams.sourceModule = 'BCOL';
				    		proxy.extraParams.relationType = 'CLASS';
				    		store.load();
				    	}
				   }
			   },
			   {
				   xtype : 'qainterfacesummarygrid',
				   title : 'Order-무선',
				   id : 'mobile-grid',
				   listeners : {
					   activate : function( tab, eOpts ) {
						    var grid = Ext.getCmp('mobile-grid');
				    		var store = grid.getStore();
				    		var proxy = store.getProxy();
				    		proxy.extraParams.sourceModule = 'Order-무선';
				    		proxy.extraParams.relationType = 'CLASS';
				    		store.load();
				    	}
				   }
			   },
			   {
				   xtype : 'qainterfacesummarygrid',
				   title : 'Order-유선',
				   id : 'wire-grid',
				   listeners : {
					   activate : function( tab, eOpts ) {
						    var grid = Ext.getCmp('wire-grid');
				    		var store = grid.getStore();
				    		var proxy = store.getProxy();
				    		proxy.extraParams.sourceModule = 'Order-유선';
				    		proxy.extraParams.relationType = 'CLASS';
				    		store.load();
				    	}
				   }
			   },
			   {
				   xtype : 'qainterfacesummarygrid',
				   title : '구분없음',
				   id : 'unknow-grid',
				   listeners : {
					   activate : function( tab, eOpts ) {
						    var grid = Ext.getCmp('unknow-grid');
				    		var store = grid.getStore();
				    		var proxy = store.getProxy();
				    		proxy.extraParams.sourceModule = '-';
				    		proxy.extraParams.relationType = 'CLASS';
				    		store.load();
				    	}
				   }
			   }
			],
			responsiveCls: 'big-100 small-100'
		}
	]
});
