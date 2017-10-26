Ext.define('Ext.accessdenied.view.AccessDeniedWindow', {
	extend : 'Ext.form.Panel',
	alias : 'widget.accessdeniedwindow',
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
	    	    title: '통합 Dashboard 권한 인증 실패..',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
	    	    height: 230,
	    	    width: 380,
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
					html : '<center><h3>해당 페이지에 권한이 없습니다.</h3></center>'
	    	    }],
	    	    buttons: [{
					text : '재 로그인',
					handler: function() {
						document.location.href = "/int/login.do";
					}
	    	    }]
			});
			win.center();
			win.show();
		}
	}
});
