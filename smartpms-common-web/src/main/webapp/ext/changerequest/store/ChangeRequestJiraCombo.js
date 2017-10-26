Ext.define('Ext.changerequest.store.ChangeRequestJiraCombo', {
    extend: 'Ext.data.Store',
    model: 'Ext.changerequest.model.ChangeRequestJira',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/changerequest/jira/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'combos'
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