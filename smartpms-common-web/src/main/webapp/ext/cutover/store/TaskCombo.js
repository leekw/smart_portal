Ext.define('Ext.cutover.store.TaskCombo', {
    extend: 'Ext.data.Store',
    model: 'Ext.cutover.model.Task',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/cutover/search/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'tasks'
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
    		var th = Ext.getCmp('th-combo');
        	var step = Ext.getCmp('jobstep-combo');
        	var proxy = store.getProxy();
        	if (th != null)
        		proxy.extraParams.cutoverTh = th.getValue();
        	if (step != null)
        		proxy.extraParams.jobStep = step.getValue();

    	}
    }
});