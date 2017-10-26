Ext.define('Ext.admin.store.Menu', {
	extend : 'Ext.data.TreeStore',
	model : 'Ext.admin.model.Menu',
	proxy : {
		type: 'ajax',
        url: G_PATH + '/resource/list/get.json',
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
        extraParams : { maxRowSize : 0, parentResourceId : 'LIMIT', viewType : 'ALL' }
	},
	root : {
		id : 'root',
		text : '통합 Dashboard Menu',
		expanded : true
	},
	autoLoad: false
	
});
