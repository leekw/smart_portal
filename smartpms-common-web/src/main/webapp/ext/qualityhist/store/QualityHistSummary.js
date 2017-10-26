Ext.define('Ext.qualityhist.store.QualityHistSummary', {
    extend: 'Ext.data.Store',
    model: 'Ext.qualityhist.model.QualityHistSummary',
    autoDestroy: true,
    grouper : {
    	groupFn : function(item) {
    		return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;" onclick="StoreAction.view(\'' + item.get("team") +'\');"><b>' + item.get("team") + '</b></span>';
    	}
    },
    proxy: {
        type: 'ajax',
        url: G_PATH + '/quality/history/summary/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'summarys'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0}
    },
    autoLoad : true
});
var StoreAction = {
	view : function(team) {
		_team = team;
		_module = null;
		_func = null;
		_programType = null;
		_developer = null;
    	
    	var win = Ext.getCmp('developer-info');
		if (win == null) {
			win = Ext.create('Ext.window.Window', {
				id : 'developer-info',
	    	    title: '개발자 정보',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
	    	    closeAction : 'hide',
	    	    layout: 'fit',
	    	    modal: true,
	    	    animateTarget:this,
	    	    padding : 10,
	    	    width : '90%',
	    	    height : 800,
	    	    border:false,
	    	    items : [
	    	         {
	    	        	xtype : 'qualitywinpanel'
	    	        }
	    	    ],
	    	    listeners : {
        	    	beforeshow : function() {
        	    		var temp = _team + (_module != null && _module != '' ? ' > ' +  _module : '') + (_func != null && _func != '' ? ' > ' +  _func : '');
        	    		win.setTitle('개발자 정보 - (' + temp + ')');
        	    		var topGrid = Ext.getCmp('developer-rank-grid');
        	    		topGrid.getStore().removeAll();
        	           	var topStore = topGrid.getStore();
        	           	var topProxy = topStore.getProxy();
        	           	topProxy.extraParams.team = _team;
        	           	topProxy.extraParams.topList = ['notRun','utCoverage'] ;
        	           	topProxy.extraParams.module = _module;
        	           	topProxy.extraParams.function = _func;
        	           	topProxy.extraParams.searchMode = 'ALL';
        	           	topStore.load();
        	           	
        	           	Ext.getCmp('developer-win-grid').getStore().removeAll();
        	    	}
	    	    }
			});
		}
		win.show();
	}	
}