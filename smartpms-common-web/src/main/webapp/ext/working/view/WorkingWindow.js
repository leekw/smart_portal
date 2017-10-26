Ext.define('Ext.working.view.WorkingWindow', {
	extend : 'Ext.form.Panel',
	alias : 'widget.workingwindow',
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
	    	    title: '통합 Dashboard 작업 중....',
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
					html : '<center><h3>PA1-2 오픈을 위해 통합 Dashboard 작업 및 준비 중입니다.</h3><p>준비가 완료되면 재 오픈 할 예정입니다.</p></center>'
	    	    }],
	    	    buttons: []
			});
			win.center();
			win.show();
		}
	}
});
