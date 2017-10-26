Ext.define('Ext.board.view.TeamComboBox', {
       extend: 'Ext.form.ComboBox',
       alias: 'widget.teamcombobox',
       store: Ext.create('Ext.board.store.Team'),
       mode: 'remote',
       valueField:'commonCode',
       displayField:'commonCodeName',
       autoSelect: false,
       minChars:1
});
