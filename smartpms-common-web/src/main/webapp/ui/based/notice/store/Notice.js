Ext.define('Ui.based.notice.store.Notice', {
    extend: 'Ext.data.Store',
    model: 'Ui.based.notice.model.Notice',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/notice/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'notices'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0 }
    },
    autoLoad : true
});