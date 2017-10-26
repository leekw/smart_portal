Ext.define('Ext.qualitytest.store.RelationTree', {
	extend : 'Ext.data.TreeStore',
	model : 'Ext.qualitytest.model.RelationTree',
	autoDestroy: false,
	proxy : {
		type: 'ajax',
        url: G_PATH + '/quality/test/tree/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'rels'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        defaultRootProperty: 'rels',
        extraParams : { maxRowSize : 0 }
	},
	root : {
		id : 'root',
		text : '차세대 PMO',
		expanded : false
	},
	autoLoad: true
	
});
