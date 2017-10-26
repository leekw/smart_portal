Ext.define('Ui.external.controller.RegUser', {
    extend: 'Ext.app.Controller',
    stores: ['OrgTree'],
    models: ['OrgTree'],

    views: ['OrgTree'],

    refs: [{
    	ref: 'orgTree',
        selector: 'orgtree'
    }],
    
    init: function() {

        this.control({
        	'orgtree' : {
        		beforeload : this.subMenuBeforeLoad,
        		checkchange : this.setDefaultOrg
        	},
        	'button[action=reg-user]' : {
        		click : this.requestRollIn
        	}
        });
        
    },
    setDefaultOrg : function(node , checked , e , eOpts) {
    	if (checked) {
    		Ext.getCmp('defaultOrgId').setValue(node.id);
    	}
    },
    subMenuBeforeLoad : function(store, operation, eOpts) {
		var proxy = store.getProxy();
	    var node = operation.node;
	    if (node != null && proxy != null) {
	    	if (node.data.id != 'root') {
	    		proxy.extraParams.parentOrgId = node.data.id;
	    	}
	    	
	    }
	},
	requestRollIn : function() {
		var form = Ext.getCmp('reg-user-form');
    	var formData = form.getForm().getValues();
    	var idCheck = Ext.getCmp('idCheck').getValue();
    	if (idCheck != 'T') {
    		Ext.Msg.alert('Errors', '유효하지 않은 아이디 정보입니다. 다른 아이디를 입력하여 검증하십시오.');
    		return false;
    	} 
    	if (!form.isValid()) {
    		var errorMsg = '아래와 같은 입력 오류가 발생되었습니다.<br><br>';
    		form.getForm().getFields().each(function(f) {
    			if (f.getErrors() != null && f.getErrors().length > 0) {
    				errorMsg += '<b>' + f.viewText + ':</b>' + f.getErrors() + '<br>';
    			}
    		});
    		Ext.Msg.alert('Errors', errorMsg);
    		return false;
    	}
    	if (Ext.getCmp('defaultOrgId') == null || Ext.getCmp('defaultOrgId') == '') {
    		Ext.Msg.alert('Errors', '소속 조직정보를 입력하십시오.');
    		return false;
    	}
    	var params = formData;
		Ext.Ajax.request({
    	    url: G_PATH + '/based/res/user/reg.json',
    	    method: 'POST',
    	    jsonData: Ext.encode(params),
    	    success: function(response){
    	    	var result = JSON.parse(response.responseText);
    	    	if (result.error != null) {
    				Ext.Msg.alert('Exception', result.error.message);
    			} else {
    				Ext.Msg.alert('Info', 'Roll-in 요청되었습니다.');
    				document.location.href = G_PATH + '/login.do';
    			}
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', '처리 중 오류가 발생되었습니다.');
    	    }
    	});
	}

    
});