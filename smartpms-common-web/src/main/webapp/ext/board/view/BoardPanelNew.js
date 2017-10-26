Ext.define('Ext.board.view.BoardPanelNew', {
	extend : 'Ext.form.Panel',
	alias : 'widget.boardpanelnew',
	id: 'board-panel',
	bodyPadding : 5,
	border : false,
	layout : {
		type : 'vbox',
		align: 'stretch'
	},
	items : [ 
	    {
	    	title: (parent != null ? parent.M_TITLE : '') + ' 목록',
	    	id : 'board-list',
			xtype : 'boardgrid'
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