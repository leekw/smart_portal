Ext.define('Ext.admin.controller.Admin', {
    extend: 'Ext.app.Controller',
    stores: ['SessionUser','RoleTree', 'UserSearch','User','Role','Menu','MenuAuth'],
    models: ['SessionUser', 'UserSearch','User','Role','Menu'],

    views: ['SessionUserGrid', 'RoleTree', 'UserSearchGrid','UserGrid','RoleGrid', 'MenuTree','MenuAuthGrid'],

    refs: [{
        ref: 'sessionUserGrid',
        selector: 'sessionusergrid'
    },{
        ref: 'roleTree',
        selector: 'roletree'
    },{
        ref: 'userSearchGrid',
        selector: 'usersearchgrid'
    },{
        ref: 'userGrid',
        selector: 'usergrid'
    },{
        ref: 'roleGrid',
        selector: 'rolegrid'
    },{
        ref: 'menuTree',
        selector: 'menutree'
    },{
        ref: 'menuAuthGrid',
        selector: 'menuauthgrid'
    }],
    
    init: function() {

        this.control({
        	'menutree' : {
        		beforeload : this.menuBeforeLoad
        	},
            'sessionusergrid': {
            },
            'usergrid': {
            	
            },
            'rolegrid' : {
            	selectionchange: this.roleSelected,
            	beforeedit : this.gridBeforeedit
            },
            'button[action=add-role-record]' : {
            	click : this.addGridRecord
            },
            'button[action=remove-role-record]' : {
            	click : this.removeGridRecord
            },
            'button[action=save-role-record]' : {
            	click : this.saveGridRecord
            },
            'button[action=reload-session-record]' : {
            	click : this.reloadGridRecord
            },
            'button[action=search-user-record]' : {
            	click : this.searchUserInfo
            },
            'button[action=remove-resource-record]' :{
            	click : this.removeResourceRole
            }
        });
        
    },
    gridBeforeedit : function(editor, context, opt) {
    	var grid = this.getRoleGrid();
    	if (context.record.get('mode') == 'R') {
			grid.getPlugin('rowEditing').editor.form.findField('roleId').disable();
		} else {
			grid.getPlugin('rowEditing').editor.form.findField('roleId').enable();
		}
    },
    addGridRecord : function() {
    	var rowEditing = this.getRoleGrid().getPlugin('rowEditing');
    	var store = this.getRoleGrid().getStore();
    	rowEditing.cancelEdit();

        var r = Ext.create('Ext.admin.model.Role', {
        	roleId : '',
        	roleName : '',
        	roleDescription : ''
        });

        store.insert(0, r);
        rowEditing.startEdit(0, 0);
    },
    removeGridRecord : function() {
    	var grid = this.getRoleGrid();
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
    _getData : function(rs, mode) {
		var data = [];
    	for (var i = 0, ln = rs.length; i < ln; i++) {
    	   if(rs[i].getData().channel == '') continue;
    	   rs[i].set("mode", mode);
     	   data.push(rs[i].getData());
     	}
    	return data;
	},
    saveGridRecord : function() {
    	var grid = this.getRoleGrid();
    	var store = grid.getStore();
    	var url = "/int/role/save.json";
    	var mods = this._getData(store.getModifiedRecords(), 'M');
		var dels = this._getData(store.getRemovedRecords(), 'D');
		var params = mods.concat(dels);
		if (params.length > 0) {
	    	Ext.Ajax.request({
	    	    url: url,
	    	    method: 'POST',
	    	    jsonData: Ext.encode(params),
	    	    success: function(response){
	    	    	if (result.error != null) {
	    				Ext.Msg.alert('Exception', result.error.message);
	    			} else {
	    				Ext.Msg.alert('Complete', '저장 되었습니다.');
	    				store.load();
	    			}
	    	    },
	    	    failure: function(){
	    	    	Ext.Msg.alert('Error', '저장 처리 중 오류가 발생되었습니다.');
	    	    }
	    	});
		} else {
			Ext.Msg.alert('Info', '저장할 내용이 없습니다.');
		}
    },
    roleSelected : function(model, records) {
    	var grid = this.getRoleGrid();
    	grid.down('#removeItem').setDisabled(!records.length);
        if (records[0]) {
        	SELECTED_ROlE_NAME = records[0].getData().roleName;
        	SELECTED_ROlE_ID = records[0].getData().roleId;
        	var cmp = Ext.getCmp('menu-auth-grid');
        	cmp.setTitle(SELECTED_ROlE_NAME + '역할에 포함된 권한');
        	var authGrid = this.getMenuAuthGrid();
        	var store = authGrid.getStore();
        	var proxy = store.getProxy();
        	proxy.extraParams.roleId = SELECTED_ROlE_ID;
        	store.load();
        }
    },
    
    menuBeforeLoad : function(store, operation, eOpts) {
    	var proxy = store.getProxy();
        var node = operation.node;
        if (node != null && proxy != null) {
        	if (node.data.id != 'root') {
        		proxy.extraParams.parentResourceId = node.data.id;
        	}
        	
        }
    },
    
    reloadGridRecord : function() {
    	var grid = this.getSessionUserGrid();
    	var store = grid.getStore();
    	store.load();
    },
    
    searchUserInfo : function() {
    	var grid = this.getUserGrid();
    	var store = grid.getStore();
    	var userId = Ext.getCmp('searchUserId').getValue();
    	var userName = Ext.getCmp('searchUserName').getValue();
    	var proxy = store.getProxy();
    	proxy.extraParams.userId = userId;
    	proxy.extraParams.userName = userName;
    	store.currentPage = 1;
    	store.load();
    	
    },
    removeResourceRole : function() {
    	var menu = this.getMenuTree();
    	var grid = this.getMenuAuthGrid();
    	var store = grid.getStore();
    	var url = G_PATH + '/resource/role/remove.json';
    	var rs = grid.getSelectionModel().getSelection();
    	var data = [];
    	if (rs == null || rs.length == 0) {
    		Ext.Msg.alert('Info', '삭제 대상을 선택해주십시오.');
    		return false;
    	}
    	for (var i = 0, ln = rs.length; i < ln; i++) {
    	  var param = {roleId : rs[i].getData().roleId, resourceId : rs[i].getData().resourceId};
     	   data.push(param);
     	} 
    	Ext.Ajax.request({
    	    url: url,
    	    method: 'POST',
    	    jsonData: Ext.encode(data),
    	    success: function(response){
    	    	Ext.Msg.alert('Complete', '삭제되었습니다.');
    	    	var cmp = Ext.getCmp('menu-auth-grid');
    	    	cmp.getStore().getProxy().extraParams.roleId = SELECTED_ROlE_ID;
    	    	cmp.getStore().load();
    	    	menu.getStore().load();
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', '삭제 중 오류가 발생되었습니다.');
    	    }
    	});
    }
    
    
});