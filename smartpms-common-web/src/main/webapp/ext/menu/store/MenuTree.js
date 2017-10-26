Ext.define('Ext.menu.store.MenuTree', {
	extend : 'Ext.data.TreeStore',
	model : 'Ext.menu.model.MenuTree',
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
        extraParams : { maxRowSize : 0, parentResourceId : 'TOP', adminYn : 'Y' }
	},
	root : {
		id : 'root',
		text : '차세대 PMO',
		expanded : true
	},
	autoLoad: false
	
});
