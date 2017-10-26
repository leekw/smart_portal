Ext.define('Ext.stabilizationm.store.ConnUser', {
    extend: 'Ext.data.Store',
    itemId : 'conn-user-store',
    model: 'Ext.stabilizationm.model.Statistic',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/connuser/list/get.json',
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
    		var data = 0;
    		var target = 0;
    		var syncDate = "";
    		for (var i=0;i < node.length;i++) {
    			target += parseInt(node[i].data.target);
    			data += parseInt(node[i].data.data1);
    			if (syncDate == "") {
    				syncDate = node[i].data.strDay;
    			}
    		}
    		var total = Ext.getCmp('conn-top');
    		total.setData({
    			amount: Ext.util.Format.number(data,'0,000'),
		        type: '접속자 수',
		        icon: 'users',
		        color : 'blue',
		        background :'#673ab7'
    	    });
    	}
    },
    autoLoad : false
});