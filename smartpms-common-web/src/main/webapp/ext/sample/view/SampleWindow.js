Ext.define('Ext.sample.view.SampleWindow',{
	extend:'Ext.window.Window',
	title:'Integration View Sample Window',
	minHeight:200,
	minWidth:400,
	items : [{
		xtype : 'sampletree2'
	}]
});