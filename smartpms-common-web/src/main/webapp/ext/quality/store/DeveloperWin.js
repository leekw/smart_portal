Ext.define('Ext.quality.store.DeveloperWin', {
    extend: 'Ext.data.Store',
    model: 'Ext.quality.model.Developer',
    autoDestroy: false,
    grouper : {
    	groupFn : function(item) {
    		return '<b>' + item.get("module") + '/' + item.get("developer") + '</b>';
    	}
    },
    proxy: {
        type: 'ajax',
        url: G_PATH + '/quality/developer/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'developers'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0}
    },
    autoLoad : false
});