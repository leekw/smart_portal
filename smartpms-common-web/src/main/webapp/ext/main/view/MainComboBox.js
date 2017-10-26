Ext.define('Ext.main.view.MainComboBox', {
       extend: 'Ext.form.ComboBox',
       alias: 'widget.maincombobox',
       store: Ext.create('Ext.main.store.MainCode'),
       mode: 'remote',
       valueField:'commonCode',
       displayField:'commonCodeName',
       autoSelect: false,
       minChars:1
});
