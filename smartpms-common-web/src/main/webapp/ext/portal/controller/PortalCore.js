var isException = false;
var PortalCore = {
	_getData : function(rs, mode) {
		var data = [];
    	for (var i = 0, ln = rs.length; i < ln; i++) {
    	   if(rs[i].getData().channel == '') continue;
    	   rs[i].set("mode", mode);
     	   data.push(rs[i].getData());
     	}
    	return data;
	},
	_callback : function(store, chartId) {
		if (!isException)
			Ext.Msg.alert('Complete', 'Complete');
		store.load();
		var chart = Ext.getCmp(chartId);
		if (chart != null) {
			chart.getStore().load();
			chart.redraw();
		}
	},
	_exceptionMsg : function(result) {
		if (result.error != null) {
			isException = true;
			Ext.Msg.alert('Exception', result.error.message);
		}
	},
	_getSameData : function(store) {
		var data = [];
		var recs = store.getRange();
		for (var i=0;i< recs.length;i++) {
			var rec = recs[i];
			if (rec.dirty != true) {
				rec.set("mode", "I");
				data.push(rec.getData());
			}
		}
		return data;
	},
	_save : function(store, url, chartId) {
		var mods = this._getData(store.getModifiedRecords(), 'M');
		var dels = this._getData(store.getRemovedRecords(), 'D');
		var ints = this._getSameData(store);
		var params = mods.concat(dels, ints);
		if (params.length > 0) {
	    	Ext.Ajax.request({
	    	    url: url,
	    	    method: 'POST',
	    	    jsonData: Ext.encode(params),
	    	    success: function(response){
	    	    	PortalCore._exceptionMsg(JSON.parse(response.responseText));
	    	    	PortalCore._callback(store, chartId);
	    	    },
	    	    failure: function(){
	    	    	Ext.Msg.alert('Error', '저장 처리 중 오류가 발생되었습니다.');
	    	    }
	    	});
		} else {
			Ext.Msg.alert('Info', '저장할 내용이 없습니다.');
		}
	},
	_reloadPortal : function(searchDate) {
		var conn = Ext.getCmp('conn-grid');
		var biz = Ext.getCmp('biz-grid');
		var que = Ext.getCmp('que-grid');
		var wfm = Ext.getCmp('wfm-grid');
		var itsm = Ext.getCmp('itsm-grid');
		var helf = Ext.getCmp('helf-grid');
		var connChart = Ext.getCmp('conn-user-chart');
		var bizCahrt = Ext.getCmp('biz-proc-chart');
		PortalCore._reloadCmp(conn, searchDate);
		PortalCore._reloadCmp(biz, searchDate);
		PortalCore._reloadCmp(que, searchDate);
		PortalCore._reloadCmp(wfm, searchDate);
		PortalCore._reloadCmp(itsm, searchDate);
		PortalCore._reloadCmp(helf, searchDate);
		
		PortalCore._reloadCmp(connChart, searchDate);
		PortalCore._reloadCmp(bizCahrt, searchDate);
		
	},
	_reloadCmp : function(cmp, searchDate) {
		var store = cmp.getStore(); 
    	var proxy = store.getProxy();
    	proxy.extraParams.day = searchDate;
    	store.load();
    	if (cmp.id == 'conn-user-chart' || cmp.id == 'biz-proc-chart') {
    		cmp.series.items[0].setTitle(DateUtil._formatDate(Ext.getCmp('search-date').getValue(), 0));
    		cmp.series.items[1].setTitle(DateUtil._formatDate(Ext.getCmp('search-date').getValue(), -1));
    		cmp.redraw();
    	}
	}
}; 