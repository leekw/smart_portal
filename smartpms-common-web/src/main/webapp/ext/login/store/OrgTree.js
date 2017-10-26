Ext.define('Ext.login.store.OrgTree', {
	extend : 'Ext.data.TreeStore',
	model : 'Ext.login.model.OrgTree',
	proxy : {
		type: 'ajax',
        url: G_PATH + '/org/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'orgs'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        defaultRootProperty: 'orgs',
        extraParams : { maxRowSize : 0, parentOrgId : 'TOP'}
	},
	root : {
		id : 'root',
		text : 'kt 프로젝트',
		expanded : true
	},
	autoLoad: false
	
});
