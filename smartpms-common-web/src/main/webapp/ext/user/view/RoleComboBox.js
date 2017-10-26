Ext.define('Ext.user.view.RoleComboBox', {
       extend: 'Ext.form.ComboBox',
       alias: 'widget.rolecombobox',
       store: Ext.create('Ext.user.store.Role'),
       mode: 'remote',
       valueField:'roleId',
       displayField:'roleName',
       autoSelect: false,
       multiSelect: true,
       minChars:1,
       queryMode : 'local',
       lazyRender : true,
       listeners : {
    	   change: function(combobox, value, oldValue) {
    		   
    	   }
       }
});
