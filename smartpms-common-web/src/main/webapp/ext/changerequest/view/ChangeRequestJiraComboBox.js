Ext.define('Ext.changerequest.view.ChangeRequestJiraComboBox', {
       extend: 'Ext.form.ComboBox',
       alias: 'widget.changerequestjiracombobox',
       store: Ext.create('Ext.changerequest.store.ChangeRequestJiraCombo'),
       mode: 'remote',
       valueField:'jiraId',
       displayField:'summary',
       autoSelect: true,
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
