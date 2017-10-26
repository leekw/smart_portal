Ext.define('Ext.cutover.view.TaskComboBox', {
       extend: 'Ext.form.ComboBox',
       alias: 'widget.takcombobox',
       store: Ext.create('Ext.cutover.store.TaskCombo'),
       mode: 'remote',
       valueField:'jobId',
       displayField:'task',
       autoSelect: false,
       minChars:1,
       lazyRender : true,
       listeners : {
    	   beforequery : function(queryPlan, eOpts) {
    		 var me = this, store = me.getStore();
    		 var proxy = store.getProxy();
     		 proxy.extraParams.task = me.getValue();
    	   },
    	   change: function(combobox, value, oldValue) {
    		   
    	   }
       }
});
