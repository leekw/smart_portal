var isException = false;
var CutoverCore = {
		_getData : function(rs, mode) {
			var data = [];
	    	for (var i = 0, ln = rs.length; i < ln; i++) {
	    	   if(rs[i].getData().channel == '') continue;
	    	   rs[i].set("mode", mode);
	     	   data.push(rs[i].getData());
	     	}
	    	return data;
		},
		_callback : function(store) {
			if (!isException)
				Ext.Msg.alert('Complete', '저장완료 되었습니다.');
			store.load();
		},
		_exceptionMsg : function(result) {
			if (result.error != null) {
				isException = true;
				Ext.Msg.alert('Exception', result.error.message);
			}
		},
		_getTargetData : function(store) {
			var data = [];
			var recs = store.getRange();
			for (var i=0;i< recs.length;i++) {
				var rec = recs[i];
				data.push({jobId : rec.getData().jobId, sortNo : i});
			}
			return data;
		},
		_modifySort : function(store, url) {
			var params = this._getTargetData(store);
			Ext.Ajax.request({
	    	    url: url,
	    	    method: 'POST',
	    	    jsonData: Ext.encode(params),
	    	    success: function(response){
	    	    	CutoverCore._exceptionMsg(JSON.parse(response.responseText));
	    	    	CutoverCore._callback(store);
	    	    },
	    	    failure: function(){
	    	    	Ext.Msg.alert('Error', '저장 처리 중 오류가 발생되었습니다.');
	    	    }
	    	});
			
		},
		_save : function(store, url) {
			var mods = this._getData(store.getModifiedRecords(), 'M');
			var dels = this._getData(store.getRemovedRecords(), 'D');
			var params = mods.concat(dels);
			if (params.length > 0) {
		    	Ext.Ajax.request({
		    	    url: url,
		    	    method: 'POST',
		    	    jsonData: Ext.encode(params),
		    	    success: function(response){
		    	    	CutoverCore._exceptionMsg(JSON.parse(response.responseText));
		    	    	CutoverCore._callback(store);
		    	    },
		    	    failure: function(){
		    	    	Ext.Msg.alert('Error', '저장 처리 중 오류가 발생되었습니다.');
		    	    }
		    	});
			} else {
				Ext.Msg.alert('Info', '저장할 내용이 없습니다.');
			}
		}
};