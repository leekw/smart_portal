Ext.define('Ext.cutover.view.UserComboBox', {
       extend: 'Ext.form.ComboBox',
       alias: 'widget.usercombobox',
       store: Ext.create('Ext.cutover.store.UserCombo'),
       mode: 'remote',
       valueField:'userId',
       displayField:'userName',
       autoSelect: true,
//       multiSelect: true,
//       forceSelection : true,
       minChars:1,
       typeAhead : true,
       lazyRender : true,
       listeners : {
    	   beforequery : function(queryPlan, eOpts) {
    		 var me = this, store = me.getStore();
    		 var proxy = store.getProxy();
     		 proxy.extraParams.searchValue = me.getValue();
    	   },
    	   change: function(combobox, value, oldValue) {
    		   
    	   }
       }
});
