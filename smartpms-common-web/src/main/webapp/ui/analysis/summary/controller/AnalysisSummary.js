var _team, _manager, _serviceName, _repoName, _orderNo;
Ext.define('Ui.analysis.summary.controller.AnalysisSummary', {
    extend: 'Ext.app.Controller',
    stores: ['AnalysisSummary','AnalysisResult'],
    models: ['AnalysisSummary'],

    views: ['AnalysisSummaryGrid','AnalysisTeamGrid','AnalysisManagerGrid','AnalysisSummaryPanel'],

    refs: [{
        ref: 'analysisSummaryGrid',
        selector: 'analysissummarygrid'
    }],
    
    init: function() {

        this.control({
            'analysissummarygrid': {
            	cellclick : this.openAnalysisResultList
            }
        });
        
    },
    openAnalysisResultList : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var grid = this.getAnalysisSummaryGrid();
    	if (grid.columns[cellIndex] != null) {
    		var selectValue = '', type ='';
    		_serviceName = record.data.serviceName;
    		_repoName = record.data.repoName;
    		_team = null;
    		_manager = null;
    		_orderNo = record.data.orderNo;
	    	if (grid.columns[cellIndex].dataIndex == 'team') {
	    		selectValue = record.data.team;
	    		_team = record.data.team;
	    	} else if (grid.columns[cellIndex].dataIndex == 'manager') {
	    		selectValue = record.data.manager;
	    		_manager = record.data.manager;
	    	}
	    	this.openWindow(grid.columns[cellIndex].dataIndex, selectValue);
	    }
    },
    openWindow : function(type, selectValue) {
    	var win = Ext.getCmp('analysis-' + type + '-info');
		if (win == null) {
			win = Ext.create('Ext.window.Window', {
				id : 'program-info',
	    	    title: '기준 조치 대상 취약점 List',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
	    	    layout: 'fit',
	    	    modal: true,
	    	    animateTarget:this,
	    	    padding : 10,
	    	    width : '85%',
	    	    height : '90%',
	    	    border:false,
	    	    items : [
	    	        {
	    	        	xtype : 'analysis' + type + 'grid'
	    	        } 
	    	    ],
	    	    listeners : {
        	    	beforeshow : function(win) {
        	    		win.setTitle(selectValue + ' 기준 조치 대상 취약점 List');
        	    		var grid = Ext.getCmp('analysis-' + type + '-grid');
        	    		var store = grid.getStore();
        	    		store.removeAll();
        	    		var proxy = store.getProxy();
        	    		proxy.extraParams.serviceName = _serviceName;
        	    		proxy.extraParams.repoName = _repoName;
        	    		proxy.extraParams.orderNo = _orderNo;
        	    		proxy.extraParams.team = _team;
        	    		proxy.extraParams.manager = _manager;
        	    		store.load();
        	    	}
	    	    }
			});
		}
		win.show();
    }
});