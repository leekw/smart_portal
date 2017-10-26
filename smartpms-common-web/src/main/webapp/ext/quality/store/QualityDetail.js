Ext.define('Ext.quality.store.QualityDetail', {
    extend: 'Ext.data.Store',
    model: 'Ext.quality.model.QualityDetail',
    autoDestroy: true,
    grouper : {
    	groupFn : function(item) {
    		return '<b>' + item.get("module") + '/' + item.get("function") + '</b>';
    	}
    },
    proxy: {
        type: 'ajax',
        url: G_PATH + '/quality/detail/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'details'
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