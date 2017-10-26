
var BoardCore = {
	_getData : function(rs) {
		var data = [];
    	for (var i = 0, ln = rs.length; i < ln; i++) {
     	   data.push(rs[i].getData());
     	}
    	return data;
	},
	_callback : function(store) {
		if (!isException)
			Ext.Msg.alert('Compete', 'Compete');
		store.load();
	},
	_exceptionMsg : function(result) {
		if (result.error != null) { 
			isException = true;
			Ext.Msg.alert('Exception', result.error.message);
		}
	}, 
	_fileAdd : function(store, boardData) {
		var formData = Ext.getCmp('board-form').getForm().getValues();
		var data = [];
		if (Ext.getCmp('file-grid') != null 
				&& Ext.getCmp('file-grid').getStore() != null 
				&& Ext.getCmp('file-grid').getStore().getCount() > 0) {
			var fileStore = Ext.getCmp('file-grid').getStore();
			var recs = fileStore.getRange();
			for (var i=0;i< recs.length;i++) {
				var rec = recs[i];
				if (boardData != null) {
					rec.set("boardId", boardData.boardId);
					rec.set("boardNo", boardData.boardNo);
				} else {
					rec.set("boardId", formData.boardId);
					rec.set("boardNo", formData.boardNo);
				}
				data.push(rec.getData());
			}
			var url = G_PATH + '/file/add.json';
			Ext.Ajax.request({
	    	    url: url,
	    	    method: 'POST',
	    	    jsonData: Ext.encode(data),
	    	    success: function(response){
	    	    	var result = JSON.parse(response.responseText);
	    	    	if (result.error != null) {
	    				Ext.Msg.alert('Exception', result.error.message);
	    			} else {
	    				Ext.Msg.alert('Compete', '저장 완료되었습니다.');
	    				store.load();
	    			}
	    	    },
	    	    failure: function(){
	    	    	Ext.Msg.alert('Error', '저장중 오류가 발생되었습니다.');
	    	    }
	    	});
		}
	},
	_merge : function(data, mode, store) {
		var url = G_PATH + '/board/modify.json';
		if (mode != 'R') {
			url = G_PATH + '/board/add.json';
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
    				if (Ext.getCmp('file-grid') != null 
    						&& Ext.getCmp('file-grid').getStore() != null 
    						&& Ext.getCmp('file-grid').getStore().getCount() > 0) {
    					BoardCore._fileAdd(store, result != null ? result.board : null);
    				} else {
    					Ext.Msg.alert('Compete', '저장 완료되었습니다.');
	    				store.load();
    				}
    			}
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', '저장중 오류가 발생되었습니다.');
    	    }
    	});
	},
	_remove : function(data, mode, store) {
		var url = G_PATH + '/board/remove.json';
		Ext.Ajax.request({
    	    url: url,
    	    method: 'POST',
    	    jsonData: Ext.encode(data),
    	    success: function(response){
    	    	var result = JSON.parse(response.responseText);
    	    	if (result.error != null) {
    				Ext.Msg.alert('Exception', result.error.message);
    			} else {
    				Ext.Msg.alert('Compete', '삭제 완료되었습니다.');
        	    	store.load();
    			}
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', '삭제 중 오류가 발생되었습니다.');
    	    }
    	});
	}
};