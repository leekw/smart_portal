Ext.define('Ext.notice.view.MailComboBox', {
       extend: 'Ext.form.ComboBox',
       alias: 'widget.mailcombobox',
       store: Ext.create('Ext.notice.store.Mail'),
       mode: 'remote',
       valueField:'mailGroupId',
       displayField:'mailGroupName',
       autoSelect: false,
       minChars:1
});
