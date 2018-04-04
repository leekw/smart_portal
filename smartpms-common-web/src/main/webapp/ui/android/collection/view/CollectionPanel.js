Ext.define('Ui.android.collection.view.CollectionPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.collectionpanel',
	id : 'collection-panel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	border : false
	,
	items : [
        {
            xtype: 'collectiongrid',
            responsiveCls: 'big-80 small-100',
            style : {
                'background-color' : '#fff',
                'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
            },

        }

 	]
});




