Ext.define('Ext.main.view.TransitionComboBox', {
       extend: 'Ext.form.ComboBox',
       alias: 'widget.transitioncombobox',
       store: Ext.create('Ext.main.store.TransitionCode'),
       mode: 'remote',
       valueField:'commonCode',
       displayField:'commonCodeName',
       autoSelect: false,
       minChars:1
});
