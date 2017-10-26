Ext.define('Ext.sample.view.SampleTree', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.sampletree',
	title: 'Integration View Simple Tree',
    width: 300,
    minHeight: 300,
    margin: '0 0 0 10',
    bodyPadding: 10,
	border: true, 
	rootVisible :true,
	store: 'SampleTree',
	dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Get checked nodes',
            action :'get-checked-nodes'
        }, {
        	text: 'Open Window Tree',
            action :'open-window-tree'
        }]
	}]
});