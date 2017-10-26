Ext.define('Ui.admin.session.view.SessionPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.sessionpanel',
	id : 'session-panel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
    border: false,
	items : [ 
	    {
	    	xtype : 'sessionusergrid',
	    	title: '접속 현황',
	    	style : {
			    'background-color' : '#fff',
			    'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
			},
			responsiveCls: 'big-100 small-100'
	    }
	]
});
