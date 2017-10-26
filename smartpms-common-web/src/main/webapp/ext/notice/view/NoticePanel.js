var IframeContent = {
	_getHtml : function() {
		var result = '<iframe id="notice-tp-critical" width="0" height="0" src="/int/etc/critical-template.html" frameborder="0" allowfullscreen></iframe>'
				   + '<iframe id="notice-tp-complete" width="0" height="0" src="/int/etc/complete-template.html" frameborder="0" allowfullscreen></iframe>'
				   + '<iframe id="notice-tp-normal" width="0" height="0" src="/int/etc/normal-template.html" frameborder="0" allowfullscreen></iframe>'
			       ;
		return result;
	}
};
Ext.define('Ext.notice.view.NoticePanel', {
	extend : 'Ext.form.Panel',
	alias : 'widget.noticepanel',
	id : 'notice-panel',
	bodyPadding : 5,
	fieldDefaults : { 
		labelAlign : 'left',
		msgTarget : 'side'
	},
	layoutConfig: {
		titleCollapse: false,
		animate: true,
		activeOnTop: true
	},
	layout:{
		type : 'accordion',
		border: false
	},
	items : [ 
	    {
	    	title:'공지 목록',
	    	id : 'notice-list',
			xtype : 'noticegrid'
		}, {
			title:'공지 상세',
			collapsible:false,
			id: 'notice-form-tot',
			items:[{
				id : 'notice-form',
				xtype : 'noticeform'
			}, {
				hidden:true,
				collapsible:false,
				xtpe : 'panel',
	            html: IframeContent._getHtml()
			}],
			listeners : {
				beforeexpand( p, animate, eOpts ) {
				}
			}
		}
	]
});