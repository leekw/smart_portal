Ext.define('Ext.qainterface.store.QaInterfaceSummary', {
    extend: 'Ext.data.Store',
    model: 'Ext.qainterface.model.QaInterfaceSummary',
    autoDestroy: true,
    grouper : {
    	groupFn : function(item) {
    		return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;"><b>'  + item.get('sourceModule')   + '</b></span>';
    	}
    },
    proxy: {
        type: 'ajax',
        url: G_PATH + '/quality/interface/summary/get.json',
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
