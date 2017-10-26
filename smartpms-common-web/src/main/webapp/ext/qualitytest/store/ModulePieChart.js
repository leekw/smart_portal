Ext.define('Ext.qualitytest.store.ModulePieChart', {
    extend: 'Ext.data.Store',
    model: 'Ext.qualitytest.model.ChartData',
    autoDestroy: false,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/quality/test/module/chart/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0 }
    },
    autoLoad : false,
    listeners : {
    	load: function( store, records, successful, eOpts ) {
    		
    	}
    }
    
});