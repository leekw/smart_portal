Ext.define('UserComboStore', {
    extend: 'Ext.data.Store',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/based/res/user/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'data.users'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : {
        	maxRowSize : 10
        }
    },
    autoLoad : true,
    listeners : {
    	beforeload : function(store, op, eOpts) {

    	}
    }
});

Ext.define('UserComboBox', {
       extend: 'Ext.form.ComboBox',
       alias: 'widget.usercombobox',
       store: Ext.create('UserComboStore'),
       mode: 'remote',
       valueField:'userId',
       displayField:'userName',
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
