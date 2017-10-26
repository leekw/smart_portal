Ext.define('Ui.admin.session.controller.Session', {
    extend: 'Ext.app.Controller',
    stores: ['SessionUser'],
    models: ['SessionUser'],

    views: ['SessionUserGrid'],

    refs: [{
        ref: 'sessionUserGrid',
        selector: 'sessionusergrid'
    }],
    
    init: function() {

        this.control({
            'sessionusergrid': {
            	
            },
            'button[action=reload-session-record]' : {
            	click : this.reloadGridRecord
            },
            'button[action=force-session-record]' : {
            	click : this.forceInvalidSession
            }
        });
        
    },
    
    
    reloadGridRecord : function() {
    	var grid = this.getSessionUserGrid();
    	var store = grid.getStore();
    	store.load();
    },
    forceInvalidSession : function() {
    	var grid = this.getSessionUserGrid();
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	var rec = sm.getSelection();
    	if (rec.length < 1) {
    		Ext.Msg.alert('Info', '강제 종료할 세션을 선택하십시오.');
    		return ;
    	}
    	Ext.getBody().mask("Processing...");
    	var params = [];
    	for (var i=0;i< rec.length;i++) {
    		var r = rec[i].getData();
    		params.push({userId : r.userId, sessionId : r.sessionId});
    	}
    	Ext.Ajax.request({
    	    url: G_PATH + '/permit/res/session/invalid.json',
    	    method: 'POST',
    	    jsonData: Ext.encode(params),
    	    success: function(response){
    	    	var data = JSON.parse(response.responseText);
    	    	Ext.Msg.alert('Complete', '세션 강제 종료처리 되었습니다.');
    	    	store.load();
    	    	Ext.getBody().unmask();
    	    },
    	    failure: function(){
    	    	
    	    }
    	});
    }
    
    
});