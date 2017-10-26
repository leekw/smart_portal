Ext.define('Ext.loginpolicy.view.PolicyTabPanel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.policytabpanel',
	title : '로그인 정책관리',
	minHeight: 300,
	bodyPadding : 5,
	fieldDefaults : {
		labelAlign : 'left',
		msgTarget : 'side'
	},
	items : [{
		title : '로그인 정책',
		items : [{
			xtype : 'policypanel'
		}
		]
	},{
		title : '로그인 정책요소',
		items : [{
//			xtype : 'policyfactorgrid'
		}]
	}]
});