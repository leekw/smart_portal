Ext.define('Ui.based.board.view.BoardPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.boardpanel',
	id: 'board-panel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	border : false,
	items : [ 
	    {
	    	title: (parent != null ? parent.M_TITLE : '') + ' 목록',
	    	id : 'board-list',
	    	style : {
			    'background-color' : '#fff',
			    'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
			},
			xtype : 'boardgrid',
			responsiveCls: 'big-100 small-100'
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