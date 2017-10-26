Ext.define('Ext.loginpolicy.store.LoginPolicyFactorCombo', {
    extend: 'Ext.data.Store',
    model: 'Ext.loginpolicy.model.LoginPolicyFactor',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/login/policy/factor/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'factors'
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