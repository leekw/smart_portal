Ext.define('Ext.loginm.view.LoginWindow', {
	extend : 'Ext.form.Panel',
	alias : 'widget.loginwindow',
	bodyPadding : 5,
	layout:{
		type : 'fit',
		border: true
	},
	listeners : {
		afterrender : function() {
			if (Ext.getCmp('login-win') != null) {
				Ext.getCmp('login-win').close();
			}
			var win = Ext.create('Ext.window.Window', {
				id : 'login-win',
	    	    title: '통합 Dashboard Login..',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
	    	    height: 300,
	    	    width: 350, 
	    	    layout: 'fit',
	    	    animateTarget:this,
	    	    buttonAlign: 'center',
	    	    items : [{
					xtype : 'form',
					id : 'login-form',
					labelWidth: 150,
					labelAlign: 'right',
					margin: '10 10 10 10',
					maxHeight : 170,
					bodyPadding: 10,
					defaultType: 'textfield',
					items :[{
					    fieldLabel: 'User ID',
					    name: 'userId',
					    value : !Cookies._getCookie("SAVED_USER") ? '' : Cookies._getCookie("SAVED_USER"), 
					    listeners : {
					    	afterrender : function(field) {
					    		if (!Cookies._getCookie("SAVED_USER"))
					    			field.focus(false, 1000);	
					    	}
					    }
					},{
						inputType: 'password',
					    fieldLabel: 'Password',
					    name: 'userPassword',
					    listeners : {
					    	afterrender : function(field) {
					    		if (Cookies._getCookie("SAVED_USER"))
					    			field.focus(false, 1000);	
					    	},
					    	specialkey : function(f, e) {
					    		if (e.getKey() == e.ENTER) {
					    			var form = Ext.getCmp('login-form');
									var formData = form.getForm().getValues();
									LoginAction._login(formData.userId, formData.userPassword);
					    		}
					    	}
					    }
					}],
					html : '<center><input type="checkbox" id="login_check" name="login_check" onClick="LoginAction._saveId();"' + (Cookies._getCookie("SAVED_USER") ? 'checked' : '') + '>아이디 저장<br><p>아이디와 패스워드는 JIRA와 동일합니다.<br>JIRA 접속 정보를 입력하십시오.</p></center>'
	    	    }],
	    	    buttons: [{
					text : '로그인',
					handler: function() {
						var form = Ext.getCmp('login-form');
						var formData = form.getForm().getValues();
						LoginAction._login(formData.userId, formData.userPassword);
					}
	    	    }]
			});
			win.center();
			win.show();
		}
	}
});

var LoginAction = {
	_login : function(userId, userPassword) {
		var form = document.login_form;
		form.userId.value = userId;
		form.userPassword.value = userPassword;
		form.action = "/int/login/process.do";
		form.submit();
	},
	_saveId : function() {
		//var check = document.login_check.value;
		var check = document.getElementById('login_check').checked;
		if (check) {
			var form = Ext.getCmp('login-form');
			var formData = form.getForm().getValues();
			Cookies._setCookie("SAVED_USER", formData.userId, -1);
		} else {
			Cookies._delCookie("SAVED_USER");
		}
	}
};