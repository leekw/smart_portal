var _CutoverDashbord;
Ext.define('Ext.ncutoverm.view.CutoverDashboard3', {
    extend: 'Ext.container.Container',
    xtype: 'cutoverdashboard3',
    itemId: 'cutoverdashboard3',
    border : false,
    requires: [
		'Ext.ncutoverm.view.CutoverDelayGrid'
    ],
    
    layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
    items: [
		{
			xtype:'cutoverdelaygrid',
			id : 'cutover-grid-panel',
			responsiveCls: 'big-50 small-100'
		}
    ]
});
