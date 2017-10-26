Ext.define('Ext.stabilization.store.JiraLevel', {
    extend: 'Ext.data.Store',
    model: 'Ext.stabilization.model.Statistic',
    autoDestroy: true,
    groupField: 'day',
    proxy: {
        type: 'ajax',
        url: G_PATH + '/open/issue/level/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'datas'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0 }
    },
    listeners : {
    	load : function(store, node, rec) {
    		
    	}
    },
    autoLoad : false
});