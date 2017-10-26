Ext.define('Ext.loginpolicy.store.LoginPolicy', {
    extend: 'Ext.data.Store',
    model: 'Ext.loginpolicy.model.LoginPolicy',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/login/policy/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'policys'
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