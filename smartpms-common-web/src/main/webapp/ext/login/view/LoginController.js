Ext.define('Ext.login.view.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.logincontroller',
    
    onFaceBookLogin : function(button, e) {
        this.redirectTo("dashboard");
    },

    onLoginButton: function(button, e, eOpts) {
    	var form = document.login_form;
		form.userId.value = Ext.getCmp('userid').getValue();
		form.userPassword.value = Ext.getCmp('password').getValue();
		form.action = "/int/login/process.do";
		form.submit();
    },

    onLoginAsButton: function(button, e, eOpts) {
        this.redirectTo("authentication.login");
    },

    onNewAccount:  function(button, e, eOpts) {
        this.redirectTo("authentication.register");
    },

    onSignupClick:  function(button, e, eOpts) {
        this.redirectTo("dashboard");
    },

    onResetClick:  function(button, e, eOpts) {
        this.redirectTo("dashboard");
    }
});