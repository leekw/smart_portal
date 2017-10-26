var _CutoverDashbord;
Ext.define('Ext.ncutover.view.CutoverDashboard', {
    extend: 'Ext.container.Container',
    xtype: 'cutoverdashboard',
    itemId: 'cutoverdashboard', // for setActiveTab(id)
    border : false,
    requires: [
		'Ext.ncutover.view.CutoverPieChart',
		'Ext.ncutover.view.CutoverAssignGrid',
		'Ext.ncutover.view.CutoverStatusBar',
		'Ext.ncutover.view.CutoverDelayGrid',
		'Ext.ncutover.view.WidgetTotal',
		'Ext.ncutover.view.ReadyGrid'
    ],
    
    layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
    items: [
		{
		    xtype: 'widget-top',
		    border : false,
		    containerColor: 'blue',
		    id : 'dashboard-total',
		    responsiveCls: 'big-16 small-50',
		    data: {
		        amount: 0,
		        type: '작업대상',
		        icon: 'list-alt',
		        color : 'bule'
		    }
		},
		{
		    xtype: 'widget-top',
		    border : false,
		    id : 'dashboard-assignready',
		    containerColor: 'gray',
		    responsiveCls: 'big-16 small-50',
		    data: {
		        amount: 0,
		        type: '할당대기',
		        icon: 'dropbox',
		        color : 'gray'
		    }
		},
		{
		    xtype: 'widget-top',
		    border : false,
		    containerColor: 'orange',
		    id : 'dashboard-workready',
		    responsiveCls: 'big-16 small-50',
		    data: {
		        amount: 0,
		        type: '작업대기',
		        icon: 'spinner',
		        color : 'orange'
		    }
		},
		{
		    xtype: 'widget-top',
		    border : false,
		    containerColor: 'green',
		    id : 'dashboard-working',
		    responsiveCls: 'big-16 small-50',
		    data: {
		        amount: 0,
		        type: '작업진행중',
		        icon: 'gears',
		        color : 'green'
		    }
		},
		{
		    xtype: 'widget-top',
		    border : false,
		    containerColor: 'pink',
		    id : 'dashboard-workdelay',
		    responsiveCls: 'big-16 small-50',
		    data: {
		        amount: 0,
		        type: '작업지연',
		        icon: 'warning',
		        color : 'pink'
		    }
		},
		{
		    xtype: 'widget-top',
		    border : false,
		    containerColor: 'cornflower-blue',
		    id : 'dashboard-workcomplete',
		    responsiveCls: 'big-16 small-50',
		    data: {
		        amount: 0,
		        type: '작업완료',
		        icon: 'check',
		        color : 'cornflower-blue'
		    }
		},
		{
			xtype:'cutoverpiechart',
			id : 'cutover-pie-chart',
			responsiveCls: 'big-50 small-100'
		},
		{
			xtype:'cutoverdelaygrid',
			id : 'cutover-grid-panel',
			responsiveCls: 'big-50 small-100'
		},
		{
			xtype:'cutoverassigngrid',
			responsiveCls: 'big-50 small-100'
		}
    ]
});
