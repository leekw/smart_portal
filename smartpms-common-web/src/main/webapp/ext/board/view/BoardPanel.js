Ext.define('Ext.board.view.BoardPanel', {
	extend : 'Ext.form.Panel',
	alias : 'widget.boardpanel',
	id: 'board-panel',
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
	    	title: (parent != null ? parent.M_TITLE : '') + ' 목록',
	    	id : 'board-list',
			xtype : 'boardgrid'
		}, {
			title: (parent != null ? parent.M_TITLE : '') + ' 상세',
			collapsible:false,
			id : 'board-form',
			xtype : 'boardform'
		},{
			hidden:true,
			collapsible:false,
			xtpe : 'panel',
            html: '<iframe id="file-down-iframe" width="0" height="0" src="" frameborder="0" allowfullscreen></iframe>'
		}
	],
	listeners : {
		
	}
});