Ext.define('Ext.sample.view.SampleTree2', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.sampletree2',
    width: 300,
    maxHeight: 500,
    margin: '0 0 0 10',
    bodyPadding: 10,
	border: true, 
	rootVisible :true,
	store: Ext.create('Ext.sample.store.SampleTree')
});