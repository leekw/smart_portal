Ext.define('Ext.programvf.store.ChangeRequestJira', {
    extend: 'Ext.data.Store',
    model: 'Ext.programvf.model.ChangeRequestJira',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/changerequest/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'crs'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0}
    },
    autoLoad : true,
    listeners : {
    	load : function() {
    		
    	}
    }
});