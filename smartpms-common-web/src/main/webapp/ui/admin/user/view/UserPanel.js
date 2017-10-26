Ext.define('Ui.admin.user.view.UserPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.userpanel',
	id : 'user-panel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
    border: false,
	items : [ {
		xtype:'usergrid',
		title : '사용자 관리',
		style : {
		    'background-color' : '#fff',
		    'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
		},
		responsiveCls: 'big-100 small-100'
	}
	]
});