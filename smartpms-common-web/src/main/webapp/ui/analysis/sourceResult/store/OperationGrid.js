Ext.define('Ui.analysis.sourceResult.store.OperationGrid', {
    extend: 'Ext.data.Store',
    autoDestroy: true,
    //model : 'Ui.analysis.sourceResult.model.OperationGrid',
    proxy: {
        type: 'ajax',
        url: G_PATH + '/analysis/source/result/operation/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'analysissourceoperations'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0 }
    },
    autoLoad : false
});