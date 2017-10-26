Ext.define('Ext.loginpolicy.model.LoginPolicy', {
    extend: 'Ext.data.Model',
    fields: [
        'loginPolicyId',
        'loginPolicyName',
        { name: 'loginPolicyEffectiveDate', type: 'date', dateFormat:'Y-m-d H:i:s' },
        { name: 'loginpolicyExpirationDate', type: 'date', dateFormat:'Y-m-d H:i:s' },
        'dataMode'
    ]
});