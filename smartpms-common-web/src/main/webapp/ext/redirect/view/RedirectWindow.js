Ext.define('Ext.redirect.view.RedirectWindow', {
	extend : 'Ext.form.Panel',
	alias : 'widget.redirectwindow',
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
	    	    title: '통합 Dashboard 정보..',
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
					html : '<center><h3>통합 Dashboard 서버가 변경되었습니다.</h3><p>http://10.217.136.78:8080/int 로 접속하시기 바랍니다....</p></center>'
	    	    }],
	    	    buttons: [{
					text : '이동',
					handler: function() {
						document.location.href = "http://10.217.136.78:8080/int";
					}
	    	    }],
	    	    listeners : {
	    	    	show : function() {
	    	    		document.location.href = "http://10.217.136.78:8080/int";
	    	    	}
	    	    }
			});
			win.center();
			win.show();
		}
	}
});

var Info = {
	sleep : function (msecs) {
		var stat = new Date().getTime();
		var cur = stat;
		while(cur - stat < msecs) {
			cur = new Date().getTime();
		}
	}
};
