Ext.define('Ui.admin.role.controller.Role', {
    extend: 'Ext.app.Controller',
    stores: ['Role','RoleInUser','RoleAuth','ServiceAuth', 'UserCombo'],
    models: ['Role','RoleInUser','RoleAuth','ServiceAuth', 'User'],

    views: [],

    refs: [
    ],
    
    init: function() {

        this.control({
        	
        });
        
    }
    
});
var isException = false;
var GridAction = {
	_addRole : function() {
		var grid = Ext.getCmp('role-grid');
		var rowEditing = grid.getPlugin('rowEditing');
    	var store = grid.getStore();
    	rowEditing.cancelEdit();

        var r = Ext.create('Ui.admin.role.model.Role', {
        	roleId : '',
        	roleName : '',
        	roleDescription : ''
        });

        store.insert(0, r);
        rowEditing.startEdit(0, 0);
	},
	_addRoleInUser : function() {
		var roleGrid = Ext.getCmp('role-grid');
		var selectRole = roleGrid.getSelectionModel().getSelection()[0];
		if (selectRole != null) {
			var grid = Ext.getCmp('role-inuser-grid');
			var rowEditing = grid.getPlugin('rowEditing');
	    	var store = grid.getStore();
	    	rowEditing.cancelEdit();
	
	        var r = Ext.create('Ui.admin.role.model.RoleInUser', {
	        	roleId : selectRole.data.roleId,
	        	roleName : selectRole.data.roleName
	        });
	
	        store.insert(0, r);
	        rowEditing.startEdit(0, 0);
		} else {
			Ext.Msg.alert('Info', '사용자를 지정할 Role을 선택하십시오.');
		}
	},
	_removeRoleInUser : function() {
		var grid = Ext.getCmp('role-inuser-grid');
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	var record = sm.getSelection();
    	var params = new Array();
    	for (var i=0;i < record.length;i++) {
    		var r = record[i].data;
    		params.push({roleId : r.roleId, userId: r.userId});
    	}
    	if (params.length > 0) {
			var url = url = G_PATH + '/role/user/remove.json';
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
	},
	_removeRole : function() {
		var grid = Ext.getCmp('role-grid');
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	var record = sm.getSelection()[0];
        var param = {roleId : record.data.roleId};
		var url = url = G_PATH + '/role/remove.json';
		Ext.Ajax.request({
    	    url: url,
    	    method: 'POST',
    	    jsonData: Ext.encode(param),
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
	},
	_callback : function(store) {
		if (!isException)
			Ext.Msg.alert('Complete', '저장완료!');
		store.load();
	},
	_exceptionMsg : function(result) {
		if (result.error != null) {
			isException = true;
			Ext.Msg.alert('Exception', result.error.message);
		}
	},
	_saveAuth : function(index) {
		var id = null;
		if (index == 1) {
			id = 'role-auth-grid';
		} else {
			id = 'service-auth-grid';
		}
		var grid = Ext.getCmp(id);
		var store = grid.getStore();
		var params = this._getData(store.getModifiedRecords());
		if (params.length > 0) {
	    	Ext.Ajax.request({
	    	    url: G_PATH + '/role/auth/save.json',
	    	    method: 'POST',
	    	    jsonData: Ext.encode(params),
	    	    success: function(response){
	    	    	GridAction._exceptionMsg(JSON.parse(response.responseText));
	    	    	GridAction._callback(store);
	    	    },
	    	    failure: function(){
	    	    	Ext.Msg.alert('Error', '저장 처리 중 오류가 발생되었습니다.');
	    	    }
	    	});
		} else {
			Ext.Msg.alert('Info', '저장할 내용이 없습니다.');
		}
	},
	_getData : function(rs) {
		var data = [];
    	for (var i = 0, ln = rs.length; i < ln; i++) {
    		var r = rs[i].getData();
     	   data.push({resourceId : r.resourceId, roleId : r.roleId, include : r.include, exclude : r.exclude});
     	}
    	return data;
	}
}