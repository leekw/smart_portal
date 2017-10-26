Ext.define('Ui.based.notice.view.NoticePanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.noticepanel',
	id : 'notice-panel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	border : false,
	items : [ 
	    {
	    	id : 'notice-list',
			xtype : 'noticegrid',
			style : {
			    'background-color' : '#fff',
			    'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
			},
			responsiveCls: 'big-100 small-100'
		}
	]
});