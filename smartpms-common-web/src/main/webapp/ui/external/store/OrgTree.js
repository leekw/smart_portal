Ext.define('Ui.external.store.OrgTree', {
	extend : 'Ext.data.TreeStore',
	model : 'Ui.external.model.OrgTree',
	proxy : {
		type: 'ajax',
        url: G_PATH + '/based/res/org/tree/get.json',
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
        extraParams : { maxRowSize : 0, parentOrgId : 'TOP' }
	},
	root : {
		id : 'root',
		text : 'SmartPMS',
		expanded : true
	},
	autoLoad: false
	
});
