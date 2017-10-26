var _CutoverDashbord;
Ext.define('Ext.ncutoverm.view.CutoverDashboard2', {
    extend: 'Ext.container.Container',
    xtype: 'cutoverdashboard2',
    itemId: 'cutoverdashboard2',
    border : false,
    requires: [
		'Ext.ncutoverm.view.CutoverPieChart',
		'Ext.ncutoverm.view.CutoverAssignGrid',
		'Ext.ncutoverm.view.CutoverStatusBar',
		'Ext.ncutoverm.view.CutoverDelayGrid',
		'Ext.ncutoverm.view.WidgetTotal',
		'Ext.ncutoverm.view.ReadyGrid'
    ],
    
    layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
    items: [
		{
			xtype:'cutoverpiechart',
			id : 'cutover-pie-chart',
			responsiveCls: 'big-50 small-100'
		}
    ]
});
