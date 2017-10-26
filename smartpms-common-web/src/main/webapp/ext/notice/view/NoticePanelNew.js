Ext.define('Ext.notice.view.NoticePanelNew', {
	extend : 'Ext.container.Container',
	alias : 'widget.noticepanelnew',
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
			cls : 'reg-panel-body',
			responsiveCls: 'big-100 small-100'
		}
	]
});