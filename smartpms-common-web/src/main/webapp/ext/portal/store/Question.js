Ext.define('Ext.portal.store.Question', {
    extend: 'Ext.data.Store',
    model: 'Ext.portal.model.Statistic',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/question/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'datas'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0 }
    },
    listeners : {
    	load : function(store, node, rec) {
    		var syncDate = "";
			if (node.length > 0) {
				syncDate = node[0].data.strDay;
				var p3 = Ext.getCmp('isc-pt');
			    p3.setTitle("ISC 접수 현황 - " + syncDate);
			}
    		
    	}
    },
    autoLoad : true
});