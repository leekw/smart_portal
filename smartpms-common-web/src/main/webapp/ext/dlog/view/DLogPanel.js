Ext.define('Ext.dlog.view.DLogPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.dlogpanel',
	id : 'dlog-panel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	items : [ 
		{
			xtype : 'tabpanel',
			items :[
//			   {
//				   title : 'Deliverables Log 현황'
//			   },
			   {
				   title : 'Deliverables Log 상세',
				   xtype : 'dlogdetailgrid'
			   }
			],
			responsiveCls: 'big-100 small-50'
		}
	]
});
