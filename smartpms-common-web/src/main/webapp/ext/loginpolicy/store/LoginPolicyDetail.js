Ext.define('Ext.loginpolicy.store.LoginPolicyDetail', {
    extend: 'Ext.data.Store',
    model: 'Ext.loginpolicy.model.LoginPolicyDetail',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/login/policy/detail/list/get.json',
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
        extraParams : { maxRowSize : 0 }
    },
    autoLoad : true
});