Ext.define('Ui.based.board.view.TeamComboBox', {
       extend: 'Ext.form.ComboBox',
       alias: 'widget.teamcombobox',
       store: Ext.create('Ui.based.board.store.Team'),
       mode: 'remote',
       valueField:'commonCode',
       displayField:'commonCodeName',
       autoSelect: false,
       minChars:1
});
