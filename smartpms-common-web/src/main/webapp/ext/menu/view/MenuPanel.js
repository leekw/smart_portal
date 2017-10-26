Ext.define('Ext.menu.view.MenuPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.menupanel',
	id : 'menu-panel',
	bodyPadding : 5,
	layout:{
		type : 'fit'
	},
	title: '메뉴 및 서비스 관리',
	items : [{
    	xtype : 'menutree'   
    }
	]
});