Ext.define('Ui.admin.session.store.SessionUser', {
    extend: 'Ext.data.Store',
    model: 'Ui.admin.session.model.SessionUser',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/permit/res/session/user/list/get.json',
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