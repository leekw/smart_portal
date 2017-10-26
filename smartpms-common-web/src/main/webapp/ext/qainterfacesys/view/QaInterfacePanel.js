Ext.define('Ext.qainterfacesys.view.QaInterfacePanel', {
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
				   title : '대내연동',
				   id : 'internal-grid',
				   listeners : {
					   activate : function( tab, eOpts ) {
						    var grid = Ext.getCmp('internal-grid');
				    		var store = grid.getStore();
				    		var proxy = store.getProxy();
				    		proxy.extraParams.relationType = '대내';
				    		store.load();
				    	}
				   }
			   },
			   {
				   xtype : 'qainterfacesummarygrid',
				   title : '대외연동',
				   id : 'external-grid',
				   listeners : {
					   activate : function( tab, eOpts ) {
						    var grid = Ext.getCmp('external-grid');
				    		var store = grid.getStore();
				    		var proxy = store.getProxy();
				    		proxy.extraParams.relationType = '대외';
				    		store.load();
				    	}
				   }
			   }
			],
			responsiveCls: 'big-100 small-100'
		}
	]
});
