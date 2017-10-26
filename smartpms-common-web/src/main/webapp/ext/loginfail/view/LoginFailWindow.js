Ext.define('Ext.loginfail.view.LoginFailWindow', {
	extend : 'Ext.form.Panel',
	alias : 'widget.loginfailwindow',
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
	    	    title: '통합 Dashboard Login 실패..',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
	    	    height: 250,
	    	    width: 450,
	    	    layout: 'fit',
	    	    animateTarget:this,
	    	    buttonAlign: 'center',
	    	    items : [{
					xtype : 'form',
					id : 'login-form',
					labelWidth: 150,
					labelAlign: 'right',
					margin: '10 10 10 10',
					maxHeight : 120,
					bodyPadding: 10,
					defaultType: 'textfield',
					html : '<center><h3>입력하신 정보로 로그인에 실패하였습니다.</h3><p><h3>' + G_ERROR_MSG + '</h3></p></center>'
	    	    }],
	    	    buttons: [{
					text : '재로그인',
					handler: function() {
						document.location.href = G_PATH + "/login.do";
					}
	    	    }]
			});
			win.center();
			win.show();
		}
	}
});
