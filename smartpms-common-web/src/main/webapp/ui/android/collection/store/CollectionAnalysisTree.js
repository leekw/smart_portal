Ext.define('Ui.android.collection.store.CollectionAnalysisTree', {
    extend: 'Ext.data.TreeStore',
    model : 'Ui.android.collection.model.CollectionAnalysisTree',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/analysis/mobile/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'analysismobiles'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        defaultRootProperty: 'analysismobiles',
        extraParams : { maxRowSize : 0 }
    },
    root : {
        id : 'root',
        expanded : true,

    },

    autoLoad : false
});