Ext.define('Ext.menu.store.File', {
    extend: 'Ext.data.Store',
    model: 'Ext.menu.model.File',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/file/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'files'
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