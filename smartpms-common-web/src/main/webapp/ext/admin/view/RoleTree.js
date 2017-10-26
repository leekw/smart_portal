Ext.define('Ext.admin.view.RoleTree', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.roletree',
	id : 'role-tree',
    width: 300,
    minHeight: 500,
    margin: '0 0 0 2',
    bodyPadding: 10,
	border: false, 
	rootVisible :true,
	store: 'RoleTree',
	viewConfig: {
		plugins : {
			ptype: 'treeviewdragdrop',
			enableDrag : G_IS_HADNS == 'Y' ? true : false
		},
		listeners: {
			beforedrop: function(node, data, overModel, dropPosition) {
			},
			drop: function(node, data, overModel, dropPosition) {
				
			},
			itemcontextmenu: function(tree, record, item, index, e, eOpts) {
				if (G_IS_HADNS == "Y") {
					if (tree.getSelectionModel().getSelection()[0] != null) {
						var selectedData = tree.getSelectionModel().getSelection()[0];
						parentId = selectedData.data.resourceId;
						parentName = selectedData.data.resourceName;
						resourceType = selectedData.data.resourceTypeCode;
						var menu_grid = Ext.create('Ext.menu.Menu', {
							items: [
							    {text: 'Add', handler: function() { ContextMenu._openMenu();} },
							    {text: 'Delete', handler: function() { ContextMenu._removeMenu(); } }
							]
						});
						var position = [e.getX()-10, e.getY()-10];
						e.stopEvent();
						menu_grid.showAt(position);
					}
				}
			},
			afterrender : function(p, eOpt) {
				
			}
		}
	}
});