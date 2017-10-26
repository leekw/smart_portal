Ext.define('Ui.main.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',
    model : 'Ui.main.model.NavigationTree',
    storeId: 'NavigationTree',
    proxy : {
		type: 'ajax',
        url: G_PATH + '/permit/res/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'resources'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        defaultRootProperty: 'resources',
        extraParams : { maxRowSize : 0, parentResourceId : 'TOP' }
	},
	root : {
		id : 'root',
		text : 'Smart',
		expanded : true
	},
	autoLoad: false,
	listeners : {
		beforeload : function(store, operation, eOpts) {
			var proxy = store.getProxy();
	        var node = operation.node;
	        if (node != null && proxy != null) {
	        	if (node.data.id != 'root') {
	        		proxy.extraParams.parentResourceId = node.data.id;
	        	}
	        	
	        }
		}
	}
});
