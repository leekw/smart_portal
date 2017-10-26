Ext.define('Ui.admin.org.controller.Org', {
    extend: 'Ext.app.Controller',
    stores: ['OrgTree','OrgUser', 'OrgRole'],
    models: ['OrgTree','OrgUser', 'OrgRole'],

    views: ['OrgTree','OrgUserGrid'],

    refs: [{
    	ref: 'orgTree',
        selector: 'orgtree'
    }],
    
    init: function() {

        this.control({
        	'orgtree' : {
        		
        	}
        });
        
    }

    
});

var GridAction = {
	_addUser : function() {
		var tree = Ext.getCmp('org-tree');
		var nodes = tree.getSelectionModel().selected;
		var orgId = nodes.items[0].id;
		if (orgId != null) {
			var grid = Ext.getCmp('org-user-grid');
			var rowEditing = grid.getPlugin('rowEditing');
	    	var store = grid.getStore();
	    	rowEditing.cancelEdit();
	
	        var r = Ext.create('Ui.admin.org.model.OrgUser', {
	        });
	
	        store.insert(0, r);
	        rowEditing.startEdit(0, 0);
		} else {
			Ext.Msg.alert('Info', '사용자를 지정할 조직을 선택하십시오.');
		}
	},
	_removeUser : function() {
		var grid = Ext.getCmp('org-user-grid');
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	var record = sm.getSelection();
    	var params = new Array();
    	for (var i=0;i < record.length;i++) {
    		var r = record[i].data;
    		params.push({defaultOrgId : r.defaultOrgId, userId: r.userId});
    	}
    	if (params.length > 0) {
			var url = url = G_PATH + '/permit/res/org/user/remove.json';
			Ext.Ajax.request({
	    	    url: url,
	    	    method: 'POST',
	    	    jsonData: Ext.encode(params),
	    	    success: function(response){
	    	    	var result = JSON.parse(response.responseText);
	    	    	if (result.error != null) {
	    				Ext.Msg.alert('Exception', result.error.message);
	    			} else {
	    				Ext.Msg.alert('Compete', '삭제 되었습니다.');
	    				grid.getStore().load();
	    			}
	    	    },
	    	    failure: function(){
	    	    	Ext.Msg.alert('Error', '삭제중 오류가 발생되었습니다.');
	    	    }
	    	});
    	} else {
    		Ext.Msg.alert('Info', '삭제할 내용이 없습니다.');
    	}
	}
}