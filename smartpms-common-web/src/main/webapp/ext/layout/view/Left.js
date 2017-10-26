Ext.define('Ext.layout.view.Left', {
	extend : 'Ext.container.Container',
	alias : 'widget.intleft',
	title: 'Menu',
	animCollapse: true,
	width: 210,
	minWidth: 160,
	maxWidth: 400,
	split: true,
	collapsed: false,
	collapsible: true,
	autoScroll:true,
	layout : {
		type : 'accordion',
		animate: true
	},
	initComponent : function() {
		this.callParent();
	}
});