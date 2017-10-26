Ext.define('Ext.changerequest.view.RepositoryComboBox', {
       extend: 'Ext.form.ComboBox',
       alias: 'widget.repositorycombobox',
       store: Ext.create('Ext.changerequest.store.RepositoryCombo'),
       mode: 'remote',
       valueField:'repositoryId',
       displayField:'repositoryName',
       autoSelect: true,
       width: 370,
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
