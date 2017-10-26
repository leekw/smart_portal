Ext.define('Ext.ncutoverm.view.CutoverDelayGrid', {
    extend: 'Ext.Panel',
    xtype: 'cutoverdelaygrid',

    requires: [
       'Ext.ncutoverm.view.DashboardGrid'
    ],

    cls: 'service-type shadow-panel',
    height: 380,
    title: '작업지연 Task',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    tools: [
		{
		    xtype: 'tool',                                    
		    cls: 'x-fa fa-check-square-o dashboard-tools',
		    tooltip: '작업종료 20분전 Task',
		    width: 20,
		    height: 20,
		    hidden: true,
		    handler : function() {
		    	var grid = Ext.getCmp('cutover-dashboard-grid');
				var store = grid.getStore();
				var proxy = store.getProxy();
				proxy.extraParams.mode = '작업종료20';
				proxy.extraParams.yCategory = null;
				store.load();
		    }
		},{
		    xtype: 'tool',                                    
		    cls: 'x-fa fa-exclamation-circle dashboard-tools',
		    tooltip: 'Critical Task',
		    width: 20,
		    height: 20,
		    hidden: true,
		    handler : function() {
		    	var grid = Ext.getCmp('cutover-dashboard-grid');
				var store = grid.getStore();
				var proxy = store.getProxy();
				proxy.extraParams.mode = '중요작업';
				proxy.extraParams.yCategory = null;
				store.load();
		    }
		}
    ],
    items: [{
    	xtype : 'dashboardgrid',
    	id : 'cutover-dashboard-grid',
    	width : '100%',
        border : false
    }
        
    ],
    listeners : {
    	afterrender : function(panel) {
    		var header = panel.header;
    		header.setStyle('background-color', '#e91e63');
    		header.setStyle('border-color', '#e91e63');
    	}
    }
    
});
