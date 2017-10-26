var _searchType, _team, _module, _func = null, _programType = null, _developer = null, _page = 1; 
Ext.define('Ext.quality.controller.Quality', {
    extend: 'Ext.app.Controller',
    stores: ['Org','QualitySummary','QualityFunction','QualityDetail','Developer','DeveloperTop','Program','DeveloperRank','DeveloperWin'],
    models: ['Org','QualitySummary','QualityDetail','Developer','DeveloperTop','Program'],

    views: ['QualitySummaryGrid','QualityDetailGrid', 'DeveloperTopGrid','DeveloperGrid','DeveloperWinGrid'],

    refs: [
		{
		    ref: 'qualitySummaryGrid',
		    selector: 'qualitysummarygrid'
		},
		{
		    ref: 'qualityDetailGrid',
		    selector: 'qualitydetailgrid'
		},
		{
		    ref: 'developerGrid',
		    selector: 'developergrid'
		},
		{
		    ref: 'developerWinGrid',
		    selector: 'developerwingrid'
		},
		{
		    ref: 'programGrid',
		    selector: 'programgrid'
		},
		{
		    ref: 'developerRankGrid',
		    selector: 'developerrankgrid'
		}
    ],
    
    init: function() {

        this.control({
        	'qualitysummarygrid' : {
        		cellclick : this.openQuailtySummaryList
        	},
        	'qualitydetailgrid' : {
        		cellclick : this.openQuailtyDetailList
        	},
        	'developergrid' : {
        		cellclick : this.openQuailtyDeveloperList
        	},
        	'developerwingrid' : {
        		cellclick : this.openQuailtyDeveloperWinList
        	},
        	'programgrid' : {
        		cellclick : this.openProgramDetailView
        	},
        	'developerrankgrid' : {
        		cellclick : this.openProgramDetailViewByDeveloper
        	}
        });
    },
    openProgramDetailViewByDeveloper : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var grid = this.getDeveloperRankGrid();
    	if (grid.columns[cellIndex-1].dataIndex == 'adjtRatio') {
    		_developer = null;
    		_searchType = 'pgTotal';
    		_programType = null;
    		_developer = record.data.developer;
    		var temp2 = Ext.getCmp('quality-detail-grid').getSelectionModel().getSelection()[0];
    		if (temp2) {
    			_func = temp.data.function;
    		}
    		this.setQualityParameterInfo();
    		this.openProgramGrid();
    	}
    },
    openProgramDetailView : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var grid = this.getProgramGrid();
    	if (grid.columns[cellIndex].dataIndex == 'programId') {
    		var param = record.data.svnFilePath;
    		var url = G_PATH + '/svn/file/view.do?svnFilePath=' + encodeURIComponent(param);
    	    var option = "left=100,top=100,width='100%',height='100%',fullscreen=yes,location=no,titlebar=no,scrollbars=yes";
        	var popup = window.open(url, 'CutOver_Task_' + param, option);
            popup.focus();
    	} else if (grid.columns[cellIndex].dataIndex == 'utJiraId') {
    		var jiraId = record.data.utJiraId;
    		var url = 'http://10.217.230.250:8080/browse/' + jiraId;
    	    var option = "left=100,top=100,width='100%',height='100%',fullscreen=yes,location=no,titlebar=no,scrollbars=yes";
        	var popup = window.open(url, 'Program_UT_JIRA_' + jiraId, option);
            popup.focus();
    	} else if (grid.columns[cellIndex].dataIndex == 'sitJiraId') {
    		var jiraId = record.data.sitJiraId;
    		var url = 'http://10.217.230.250:8080/browse/' + jiraId;
    	    var option = "left=100,top=100,width='100%',height='100%',fullscreen=yes,location=no,titlebar=no,scrollbars=yes";
        	var popup = window.open(url, 'Program_SIT_JIRA_' + jiraId, option);
            popup.focus();
    	}
    },
    openQuailtyDeveloperWinList : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var grid = this.getDeveloperWinGrid();
    	cellIndex = cellIndex;
    	if (grid.columns[cellIndex].dataIndex == 'pgTotal'
   		 || grid.columns[cellIndex].dataIndex == 'pgComplete'
   	     || grid.columns[cellIndex].dataIndex == 'pgDelay'
   	     || grid.columns[cellIndex].dataIndex == 'unUsedSource'
   	  	 || grid.columns[cellIndex].dataIndex == 'utTarget'
   	     || grid.columns[cellIndex].dataIndex == 'utComplete'
   	     || grid.columns[cellIndex].dataIndex == 'underStatement'
   	     || grid.columns[cellIndex].dataIndex == 'utTesting'
   	     || grid.columns[cellIndex].dataIndex == 'utNotest'
   	     || grid.columns[cellIndex].dataIndex == 'notRun'
   	     || grid.columns[cellIndex].dataIndex == 'runTarget'
   	     || grid.columns[cellIndex].dataIndex == 'sitTarget'
   	     || grid.columns[cellIndex].dataIndex == 'sitNotest'
   	     || grid.columns[cellIndex].dataIndex == 'sitRunYn'
   	     || grid.columns[cellIndex].dataIndex == 'underSitCoverage' 
   	     || grid.columns[cellIndex].dataIndex == 'utCoverage'
   	     || grid.columns[cellIndex].dataIndex == 'checkTarget') {
    		_team = null;
    		_module = null;
    		_func = null;
    		_developer = null;
    		_searchType = grid.columns[cellIndex].dataIndex;
    		_programType = record.data.programType;
    		_developer = record.data.developer;
    		var temp2 = Ext.getCmp('quality-detail-grid').getSelectionModel().getSelection()[0];
    		if (temp2) {
    			_func = temp.data.function;
    		}
    		this.setQualityParameterInfo();
    		this.openProgramGrid();
    	}
    },
    openQuailtyDeveloperList : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var grid = this.getDeveloperGrid();
    	cellIndex = cellIndex + 1;
    	if (grid.columns[cellIndex].dataIndex == 'pgTotal'
   		 || grid.columns[cellIndex].dataIndex == 'pgComplete'
   	     || grid.columns[cellIndex].dataIndex == 'pgDelay'
   	     || grid.columns[cellIndex].dataIndex == 'unUsedSource'
   	  	 || grid.columns[cellIndex].dataIndex == 'utTarget'
   	     || grid.columns[cellIndex].dataIndex == 'utComplete'
   	     || grid.columns[cellIndex].dataIndex == 'underStatement'
   	     || grid.columns[cellIndex].dataIndex == 'utTesting'
   	     || grid.columns[cellIndex].dataIndex == 'utNotest'
   	     || grid.columns[cellIndex].dataIndex == 'notRun'
   	     || grid.columns[cellIndex].dataIndex == 'runTarget'
   	     || grid.columns[cellIndex].dataIndex == 'sitTarget'
   	   	 || grid.columns[cellIndex].dataIndex == 'sitNotest'
   	   	 || grid.columns[cellIndex].dataIndex == 'sitRunYn'
   	   	 || grid.columns[cellIndex].dataIndex == 'underSitCoverage'
   	     || grid.columns[cellIndex].dataIndex == 'utCoverage'
   	     || grid.columns[cellIndex].dataIndex == 'checkTarget') {
    		_team = null;
    		_module = null;
    		_func = null;
    		_developer = null;
    		_searchType = grid.columns[cellIndex].dataIndex;
    		_programType = record.data.programType;
    		_developer = record.data.developer;
    		var temp2 = Ext.getCmp('quality-detail-grid').getSelectionModel().getSelection()[0];
    		if (temp2) {
    			_func = temp.data.function;
    		}
    		this.setQualityParameterInfo();
    		this.openProgramGrid();
    	}
    },
    openQuailtyDetailList : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var grid = this.getQualityDetailGrid();
    	if (grid.columns[cellIndex-1].dataIndex == 'uiCount'
   		 || grid.columns[cellIndex-1].dataIndex == 'esbCount'
   	     || grid.columns[cellIndex-1].dataIndex == 'sjCount'
   	     || grid.columns[cellIndex-1].dataIndex == 'bocCount'
   	  	 || grid.columns[cellIndex-1].dataIndex == 'boCount'
   	     || grid.columns[cellIndex-1].dataIndex == 'doCount'
   	     || grid.columns[cellIndex-1].dataIndex == 'dtoCount'
   	     || grid.columns[cellIndex-1].dataIndex == 'etcCount'
   	     || grid.columns[cellIndex-1].dataIndex == 'totCount') {
    		_team = null;
    		_module = null;
    		_func = null;
    		_developer = null;
    		_func = record.data.function;
    		if (record.data.verifyType == "01.개발지연") {
    			_searchType = "pgDelay";
    		} else if (record.data.verifyType == "02.UT 미수행") {
    			_searchType = "utNotest";
    		} else if (record.data.verifyType == "04.구문 10미만") {
    			_searchType = "underStatement";
    		} else if (record.data.verifyType == "05.미사용 소스") {
    			_searchType = "unUsedSource";
    		} else if (record.data.verifyType == "06.Run 미 수행") {
    			_searchType = "notRun";
    		} else if (record.data.verifyType == "03.SIT 미수행") {
    			_searchType = "sitNotest";
    		} else if (record.data.verifyType == "07.커버리지 65%미만 -UT") {
    			_searchType = "utCoverage";
    		} else if (record.data.verifyType == "08.커버리지 65%미만 -SIT") {
    			_searchType = "underSitCoverage";
    		} else {
    			_searchType = null;
    		}
    		if (_searchType == null) {
    			return ;
    		}
    		
    		if (grid.columns[cellIndex-1].dataIndex == 'uiCount') {
    			_programType = "UI";
    		} else if (grid.columns[cellIndex-1].dataIndex == 'esbCount') {
    			_programType = "ESB";
    		} else if (grid.columns[cellIndex-1].dataIndex == 'sjCount') {
    			_programType = "SJ";
    		} else if (grid.columns[cellIndex-1].dataIndex == 'bocCount') {
    			_programType = "BOC";
    		} else if (grid.columns[cellIndex-1].dataIndex == 'boCount') {
    			_programType = "BO";
    		} else if (grid.columns[cellIndex-1].dataIndex == 'doCount') {
    			_programType = "DO";
    		} else if (grid.columns[cellIndex-1].dataIndex == 'dtoCount') {
    			_programType = "DTO";
    		} else if (grid.columns[cellIndex-1].dataIndex == 'etcCount') {
    			_programType = "ETC";
    		} else if (grid.columns[cellIndex-1].dataIndex == 'totCount') {
    			_programType = null;
    		}
    		
    		this.setQualityParameterInfo();
    		this.openProgramGrid();
    	}
    	
    },
    openQuailtySummaryList : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var grid = this.getQualitySummaryGrid();
    	cellIndex = cellIndex + 1;
    	if (grid.columns[cellIndex].dataIndex == 'pgTotal'
    		 || grid.columns[cellIndex].dataIndex == 'pgComplete'
    	     || grid.columns[cellIndex].dataIndex == 'pgDelay'
    	     || grid.columns[cellIndex].dataIndex == 'unUsedSource'
    	  	 || grid.columns[cellIndex].dataIndex == 'utTarget'
    	     || grid.columns[cellIndex].dataIndex == 'utComplete'
    	     || grid.columns[cellIndex].dataIndex == 'utTesting'
    	     || grid.columns[cellIndex].dataIndex == 'utNotest'
    	     || grid.columns[cellIndex].dataIndex == 'notRun'
    	     || grid.columns[cellIndex].dataIndex == 'runTarget'
    	     || grid.columns[cellIndex].dataIndex == 'sitTarget'
       	   	 || grid.columns[cellIndex].dataIndex == 'sitNotest'
       	   	 || grid.columns[cellIndex].dataIndex == 'sitTesting'
       	   	 || grid.columns[cellIndex].dataIndex == 'sitComplete'
       	   	 || grid.columns[cellIndex].dataIndex == 'sitRunYn'
       	   	 || grid.columns[cellIndex].dataIndex == 'underSitCoverage'
    	     || grid.columns[cellIndex].dataIndex == 'utCoverage'
    	     || grid.columns[cellIndex].dataIndex == 'checkTarget') {
    		_team = null;
    		_module = null;
    		_func = null;
    		_programType = null;
    		_developer = null;
    		_searchType = grid.columns[cellIndex].dataIndex;
    		this.setQualityParameterInfo();
    		this.openProgramGrid();
    	}
    },
    setQualityParameterInfo : function() {
    	var grid = Ext.getCmp('org-grid');
		var sm = grid.getSelectionModel();
		var rec = sm.getSelection()[0];
		if (rec) {
			_team = rec.data.originalOrgName;
			var temp = Ext.getCmp('quality-summary-grid').getSelectionModel().getSelection()[0];
			if (temp) {
				_module = temp.data.module;
			}
		}
    },
    openProgramGrid : function() {
    	var win = Ext.getCmp('program-info');
		if (win == null) {
			win = Ext.create('Ext.window.Window', {
				id : 'program-info',
	    	    title: '프로그램 정보',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
//	    	    closeAction : 'hide',
	    	    layout: 'fit',
	    	    modal: true,
	    	    animateTarget:this,
	    	    padding : 10,
	    	    width : '85%',
	    	    height : '90%',
	    	    border:false,
	    	    items : [
	    	        {
	    	        	xtype : 'programgrid'
	    	        } 
	    	    ],
	    	    listeners : {
        	    	beforeshow : function() {
        	    		var grid = Ext.getCmp('program-grid');
        	    		var store = grid.getStore();
        	    		var proxy = store.getProxy();
        	    		proxy.extraParams.team = _team;
        	    		proxy.extraParams.module = _module;
        	    		proxy.extraParams.function = _func;
        	    		proxy.extraParams.searchType = _searchType;
        	    		proxy.extraParams.programType = _programType;
        	    		proxy.extraParams.developer = _developer;
        	    		proxy.extraParams.page = _page;
        	    		store.load();
        	    	}
	    	    }
			});
		}
		win.show();
    }
});
