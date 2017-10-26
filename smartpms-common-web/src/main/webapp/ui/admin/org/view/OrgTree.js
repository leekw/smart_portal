Ext.define('Ui.admin.org.view.OrgTree', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.orgtree',
	id : 'org-tree',
    margin: '0 0 0 2',
    bodyPadding: 10,
	border: false, 
	rootVisible :false,
	minHeight :585,
	maxHeight :585,
	scroll : 'vertical',
	store: 'OrgTree',
	columns: [{
		xtype : 'treecolumn',
		text : '조직명',
		width : 200,
		locked : true,
		dataIndex : 'text',
		editor: {
	        allowBlank: false
	    }
	},{
		text : '조직유형',
		width: 100,
		align:'center',
		dataIndex : 'orgType'
	},{
		text : '조직상세유형',
		width: 100,
		align:'center',
		dataIndex : 'orgDiv'
	}
	],
	listeners : {
		beforecellclick: function(tree, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
			var data = record.data.orgId;
			var grid = Ext.getCmp('org-tree');
			var store = grid.getStore();
			var proxy = store.getProxy();
		    if (proxy != null) {
		    	if (data != 'root') {
		    		proxy.extraParams.parentOrgId = data;
		    	}
		    	
		    }
		    
		    var grid2 = Ext.getCmp('org-user-grid');
    		var store2 = grid2.getStore(); 
        	var proxy2 = store2.getProxy();
        	proxy2.extraParams.defaultOrgId = data;
        	store2.load();
        	
        	var grid1 = Ext.getCmp('org-role-grid');
    		var store1 = grid1.getStore(); 
        	var proxy1 = store1.getProxy();
        	proxy1.extraParams.orgId = data;
        	proxy1.extraParams.relationType = 'ORG';
        	store1.load();
		}
	},
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
	},
	plugins:[
		Ext.create('Ext.grid.plugin.RowEditing', {
		    clicksToMoveEditor: 1,
		    autoCancel: false,
		    pluginId: 'rowEditing',
		    listeners : {
		    	edit : function(editor, e) {
		    		
		    	},
		    	canceledit : function( editor, e, eOpts ) {
		    		
		    	},
		    	beforeedit : function(editor, e, eOpts ) {
		    		
		    	}
		    }
		})
	]
});


