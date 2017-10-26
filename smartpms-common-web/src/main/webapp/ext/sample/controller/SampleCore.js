var addTimer, modifyTimer, removeTimer;
var addFinish = false;
var modifyFinish = false;
var removeFinish = false;
var isException = false;
var SampleCore = {
	_getData : function(rs) {
		var data = [];
    	for (var i = 0, ln = rs.length; i < ln; i++) {
     	   data.push(rs[i].getData());
     	}
    	console.log(data);
    	return data;
	},
	_callback : function(store) {
		if (addFinish && modifyFinish && removeFinish) {
			if (!isException)
				Ext.Msg.alert('Compete', 'Compete');
			store.load();
	    	clearInterval(addTimer);
	    	clearInterval(modifyTimer);
	    	clearInterval(removeTimer);
		}
	},
	_exceptionMsg : function(result) {
		if (result.error != null) {
			isException = true;
			Ext.Msg.alert('Exception', result.error.message);
		}
	},
	_merge : function(data, mode, store) {
		var url = G_PATH + '/sample/modify.json';
		if (mode != 'R') {
			url = G_PATH + '/sample/add.json';
		}
		Ext.Ajax.request({
    	    url: url,
    	    method: 'POST',
    	    jsonData: Ext.encode(data),
    	    success: function(response){
    	    	var result = JSON.parse(response.responseText);
    	    	if (result.error != null) {
    				Ext.Msg.alert('Exception', result.error.message);
    			} else {
    				Ext.Msg.alert('Compete', 'Compete');
        	    	store.load();
    			}
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', 'Save Error');
    	    }
    	});
	},
	_add : function(rs, store) {
		if (rs.length > 0) {
	    	Ext.Ajax.request({
	    	    url: G_PATH + '/sample/add.json',
	    	    method: 'POST',
	    	    jsonData: Ext.encode(this._getData(rs)),
	    	    success: function(response){
	    	    	addFinish = true;
	    	    	SampleCore._exceptionMsg(JSON.parse(response.responseText));
	    	    	addTimer = setInterval(SampleCore._callback(store), 500);
	    	    },
	    	    failure: function(){
	    	    	Ext.Msg.alert('Error', 'Add Error');
	    	    	addFinish = true;
	    	    }
	    	});
		} else addFinish = true;
	},
	_modify : function(rs, store) {
		if (rs.length > 0) {
	    	Ext.Ajax.request({
	    	    url: G_PATH + '/sample/modify.json',
	    	    method: 'POST',
	    	    jsonData: Ext.encode(this._getData(rs)),
	    	    success: function(response){
	    	    	modifyFinish = true;
	    	    	SampleCore._exceptionMsg(JSON.parse(response.responseText));
	    	    	modifyTimer = setInterval(SampleCore._callback(store), 500);
	    	    },
	    	    failure: function(){
	    	    	Ext.Msg.alert('Error', 'Modify Error');
	    	    	modifyFinish = true;
	    	    }
	    	});
		} else modifyFinish = true;
	},
	_remove : function(rs, store) {
		if (rs.length > 0) {
	    	Ext.Ajax.request({
	    	    url: G_PATH + '/sample/remove.json',
	    	    method: 'POST',
	    	    jsonData: Ext.encode(this._getData(rs)),
	    	    success: function(response){
	    	    	removeFinish = true;
	    	    	SampleCore._exceptionMsg(JSON.parse(response.responseText));
	    	    	removeTimer = setInterval(SampleCore._callback(store), 500);
	    	    },
	    	    failure: function(){
	    	    	Ext.Msg.alert('Error', 'Remove Error');
	    	    	modifyFinish = true;
	    	    }
	    	});
		} else removeFinish = true;
	}
}; 