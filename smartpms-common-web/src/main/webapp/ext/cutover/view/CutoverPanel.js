Ext.define('Ext.cutover.view.CutoverPanel', {
	extend : 'Ext.form.Panel',
	alias : 'widget.cutoverpanel',
	bodyPadding : 5,
	layout:{
		type : 'fit',
		border: false
	},
	items : [{
		id: 'cutover-grid',
		xtype : 'cutovergrid'
	},{
		hidden:true,
		collapsible:false,
		xtpe : 'panel',
        html: '<iframe id="excel-down-iframe" width="0" height="0"  src="" frameborder="0" allowfullscreen></iframe>'
	}]
});