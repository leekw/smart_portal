Ext.define('Ext.quality.store.Program', {
    extend: 'Ext.data.Store',
    model: 'Ext.quality.model.Program',
    autoDestroy: false,
    pageSize : 300,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/quality/detail/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'data.details',
            totalProperty : 'data.total'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0, start : 0, limit : 300}
    },
    autoLoad : false,
    listeners : {
    	beforeload : function(store, op, eOpts) {
    		var proxy = store.getProxy();
    		proxy.extraParams.page = store.currentPage;
    	},
    	load : function( store, records, successful, eOpts ) {
    		var res = JSON.parse(eOpts._response.responseText)
    		
    		var all = Ext.getCmp('ALL');
    		var ui = Ext.getCmp('UI');
    		var esb = Ext.getCmp('ESB');
    		var so = Ext.getCmp('SO');
    		var jo = Ext.getCmp('JO');
    		var bo = Ext.getCmp('BO');
    		var boc = Ext.getCmp('BOC');
    		var doo = Ext.getCmp('DO');
    		var dto = Ext.getCmp('DTO');
    		var etc = Ext.getCmp('ETC');
    		
//    		all.setText("전체 - " + res.data.total);
    		if (res.data.UI != null)
    			ui.setText("UI - " + res.data.UI);
    		if (res.data.EBS != null)
    			esb.setText("EBS - " + res.data.EBS);
    		if (res.data.SO != null)
    			so.setText("SO - " + res.data.SO);
    		if (res.data.JO != null)
    			jo.setText("JO - " + res.data.JO);
    		if (res.data.BO != null)
    			bo.setText("BO - " + res.data.BO);
    		if (res.data.BOC != null)
    			boc.setText("BOC - " + res.data.BOC);
    		if (res.data.DO != null)
    			doo.setText("DO - " + res.data.DO);
    		if (res.data.DTO != null)
    			dto.setText("DTO - " + res.data.DTO);
    		if (res.data.ETC != null)
    			etc.setText("ETC - " + res.data.ETC);
    		
    	}
    }
});