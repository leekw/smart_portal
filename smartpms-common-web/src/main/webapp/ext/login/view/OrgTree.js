Ext.define('Ext.login.view.OrgTree', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.orgtree',
	id : 'org-tree',
	width: 350,
    minHeight: 500,
    margin: '0 0 0 2',
    bodyPadding: 10,
	border: false, 
	rootVisible :true,
	store: 'OrgTree'
});