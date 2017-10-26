Ext.define('Ui.external.view.OrgTree', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.orgtree',
	id : 'org-tree',
    margin: '0 0 0 2',
    bodyPadding: 10,
	border: false, 
	rootVisible :false,
	maxHeight :585,
	scroll : 'vertical',
	store: 'OrgTree',
	viewConfig: {
		style   : { overflow: 'auto', overflowX: 'hidden' },
		plugins : {
			ptype: 'treeviewdragdrop',
			enableDrag : false
		},
		listeners: {
			beforedrop: function(node, data, overModel, dropPosition) {
			},
			drop: function(node, data, overModel, dropPosition) {
				
			}
		}
	}
});
