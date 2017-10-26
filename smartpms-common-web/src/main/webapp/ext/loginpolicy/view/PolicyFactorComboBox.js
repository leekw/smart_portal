Ext.define('Ext.loginpolicy.view.PolicyFactorComboBox', {
       extend: 'Ext.form.ComboBox',
       alias: 'widget.policyfactorcombobox',
       store: Ext.create('Ext.loginpolicy.store.LoginPolicyFactorCombo'),
       mode: 'remote',
       valueField:'loginPolicyFactorId',
       displayField:'loginPolicyFactorName'
});
