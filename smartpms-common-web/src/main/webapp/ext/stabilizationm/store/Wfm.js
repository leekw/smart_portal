Ext.define('Ext.stabilizationm.store.Wfm', {
    extend: 'Ext.data.Store',
    model: 'Ext.stabilizationm.model.Statistic',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/wfm/list/get.json',
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
        extraParams : { maxRowSize : 0, day : DateUtil._formatDateYmd(new Date(), 0) }
    },
    listeners : {
    	load : function(store, node, rec) {
//    		var syncDate = "";
//			if (node.length > 0) {
//				syncDate = node[0].data.strDay;
//				var p3 = Ext.getCmp('isc-pt');
//			    p3.setTitle("ISC 접수 현황 - " + syncDate);
//			}
    	}
    },
    autoLoad : false
});