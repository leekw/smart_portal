Ext.define('Ext.portal.store.JiraChannel', {
    extend: 'Ext.data.Store',
    model: 'Ext.portal.model.Statistic',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/open/issue/channel/get.json',
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