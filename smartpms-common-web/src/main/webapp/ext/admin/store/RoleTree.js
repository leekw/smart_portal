Ext.define('Ext.admin.store.RoleTree', {
	extend : 'Ext.data.TreeStore',
	model : 'Ext.admin.model.Role',
	proxy : {
		type: 'ajax',
        url: G_PATH + '/role/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'roles'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        defaultRootProperty: 'roles',
        extraParams : { maxRowSize : 0, parentResourceId : 'TOP' }
	},
	root : {
		id : 'root',
		text : '통합 Dashboard Role',
		expanded : true
	},
	autoLoad: false
	
});
