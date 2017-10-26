Ext.define('Ext.admin.view.MenuTree', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.menutree',
	id : 'menu-tree',
    width: 250,
    minHeight: 450,
    maxHeight: 450,
    margin: '0 0 0 2',
    bodyPadding: 10,
	border: false, 
	rootVisible :true,
	store: 'Menu',
	title : '권한 전체',
	viewConfig: {
		plugins : {
			ptype: 'treeviewdragdrop',
			dragGroup : 'menuGridDDGroup',
			enableDrag : true
		},
		listeners: {
			beforedrop: function(node, data, overModel, dropPosition) {
			},
			drop: function(node, data, overModel, dropPosition) {
				
			},
			itemcontextmenu: function(tree, record, item, index, e, eOpts) {
				
			},
			afterrender : function(p, eOpt) {
				
			}
		}
	}
});
