Ext.define('Ext.sample.view.SampleComboBox', {
       extend: 'Ext.form.ComboBox',
       alias: 'widget.samplecombobox',
       store: Ext.create('Ext.sample.store.SampleCode'),
       mode: 'remote',
       valueField:'codeCategoryId',
       displayField:'codeCategoryName',
       autoSelect: false,
       minChars:1
});
