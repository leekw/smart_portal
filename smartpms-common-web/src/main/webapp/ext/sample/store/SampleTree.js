Ext.define('Ext.sample.store.SampleTree', {
	extend : 'Ext.data.TreeStore',
	model : 'Ext.sample.model.SampleTree',
	proxy : {
		type: 'ajax',
        url: G_PATH + '/sample/tree/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'samples'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0, categoryCode : 'GGFT' }
	},
	root : {
		id : 'root',
		text : 'Integration View Tree Root',
		expanded : true

	},
	autoLoad: false
	
});
