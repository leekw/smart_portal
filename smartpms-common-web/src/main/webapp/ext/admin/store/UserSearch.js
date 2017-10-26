Ext.define('Ext.admin.store.UserSearch', {
    extend: 'Ext.data.Store',
    model: 'Ext.admin.model.UserSearch',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/resource/session/user/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'users'
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