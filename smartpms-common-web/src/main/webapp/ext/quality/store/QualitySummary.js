Ext.define('Ext.quality.store.QualitySummary', {
    extend: 'Ext.data.Store',
    model: 'Ext.quality.model.QualitySummary',
    autoDestroy: true,
    grouper : {
    	groupFn : function(item) {
    		return '<b>' + item.get("team") + '</b>';
    	}
    },
    proxy: {
        type: 'ajax',
        url: G_PATH + '/quality/summary/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'summarys'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0}
    },
    autoLoad : false
});