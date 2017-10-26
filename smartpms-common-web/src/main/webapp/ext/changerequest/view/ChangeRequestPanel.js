Ext.define('Ext.changerequest.view.ChangeRequestPanel', {
	extend : 'Ext.form.Panel',
	alias : 'widget.changerequestpanel',
	id: 'changerequest-panel',
	border : false,
	layout : {
		type : 'vbox',
		align: 'stretch'
	},
	items : [ 
	    {
	    	title:'체크인 제한된  파일 목록',
			xtype : 'changerequestgrid'
		}
	],
	listeners : {
		
	}
});