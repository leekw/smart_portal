Ext.define('Ext.programvf.view.VerifyResult', {
	extend : 'Ext.container.Container',
	alias : 'widget.verifyresult',
	id : 'verify-result',
	bodyPadding : 5,
	layout:{
		type: 'vbox',
        align: 'stretch'
	},
	items : [ 
		{
		    xtype : 'label',
		    id : 'top-label',
		    html : '<h3>팀 :  > 모듈 : </h3>',
		    responsiveCls: 'big-100 small-50'
		},
		{
		    xtype: 'widget-top',
		    border : false,
		    containerColor: 'cornflower-blue',
		    id : 'dashboard-new',
		    responsiveCls: 'big-33 small-50',
		    data: {
			amount: 0,
			type: '신규',
			icon: 'tasks',
			color : '#458fd2'
		    }
		},
		{
		    xtype: 'widget-top',
		    border : false,
		    containerColor: 'orange',
		    id : 'dashboard-mod',
		    responsiveCls: 'big-33 small-50',
		    data: {
			amount: 0,
			type: '변경',
			icon: 'edit',
			color : '#ffc107'
		    }
		},
		{
		    xtype: 'widget-top',
		    border : false,
		    containerColor: 'pink',
		    id : 'dashboard-del',
		    responsiveCls: 'big-33 small-50',
		    data: {
			amount: 0,
			type: '삭제',
			icon: 'trash',
			color : '#e91e63'
		    }
		},
		{
			xtype : 'verifygrid',
			responsiveCls: 'big-100 small-50'
		},
		{
			xtype : 'programgrid',
			responsiveCls: 'big-100 small-50'
		}
	]
});
