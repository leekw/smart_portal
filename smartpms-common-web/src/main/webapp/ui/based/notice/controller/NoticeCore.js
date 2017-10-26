
var NoticeCore = {
	_getData : function(rs) {
		var data = [];
    	for (var i = 0, ln = rs.length; i < ln; i++) {
     	   data.push(rs[i].getData());
     	}
    	return data;
	},
	_callback : function(store) {
		if (!isException)
			Ext.Msg.alert('Complete', 'Complete');
		store.load();
	},
	_exceptionMsg : function(result) {
		if (result.error != null) {
			isException = true;
			Ext.Msg.alert('Exception', result.error.message);
		}
	},
	_merge : function(data, mode, store) {
		var url = G_PATH + '/notice/modify.json';
		if (mode != 'R') {
			url = G_PATH + '/notice/add.json';
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
    				Ext.Msg.alert('Complete', 'Complete');
        	    	store.load();
    			}
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', 'Save Error');
    	    }
    	});
	},
	_getMailGroup : function(mailGroupId) {
		var url = G_PATH + '/mail/get.json';
		var data = {mailGroupId : mailGroupId};
		Ext.Ajax.request({
    	    url: url,
    	    method: 'POST',
    	    jsonData: Ext.encode(data),
    	    success: function(response){
    	    	var result = JSON.parse(response.responseText);
    	    	if (result.error != null) {
    				Ext.Msg.alert('Exception', result.error.message);
    			} else {
					var data =  result.mail.targetMailAddress;
    				var cmp = Ext.getCmp('targetMailAddress');
    				cmp.setValue(data);
    			}
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', 'Mail Group 조회하는 중 오류가 발생되었습니다.');
    	    }
    	});
	},
	_modifyMailGroup : function(mailGroupId, mailAddress) {
		var url = G_PATH + '/mail/modify.json';
		var data = {mailGroupId : mailGroupId, targetMailAddress : mailAddress};
		Ext.Ajax.request({
    	    url: url,
    	    method: 'POST',
    	    jsonData: Ext.encode(data),
    	    success: function(response){
    	    	var result = JSON.parse(response.responseText);
    	    	if (result.error != null) {
    				Ext.Msg.alert('Exception', result.error.message);
    			} else {
    				Ext.Msg.alert('Complete', 'Mail Group이 수정되었습니다.');
    				NoticeCore._getMailGroup(mailGroupId);
    			}
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', 'Mail Group 처리하는 중 오류가 발생되었습니다.');
    	    }
    	});
	}
};