var _searchType, _team, _module, _func = null, _programType = null, _developer = null, _page = 1, _searchDesc = null; 
Ext.define('Ext.qualityhist.controller.QualityHist', {
    extend: 'Ext.app.Controller',
    stores: ['QualityHistSummary','UnUsedSourceChart'
             ,'CoverageChart','UnitTestChart', 'UnitTestNoTestChart'
             ,'UnderStatementChart','RunChart','SitTestChart'
             ,'SitCoverageChart','Program','DeveloperWin','DeveloperRank','CheckTargetChart'
             ,'SourceSizeChart','ChangeSourceChart','SitRunChart','SitNoTestChart', 'SvnNotRegChart'],
    models: ['QualityHistSummary','ChartData','Program','DeveloperTop','Developer'],

    views: ['QualityHistSummaryGrid','DeveloperWinGrid'],

    refs: [
		{
		    ref: 'qualityHistSummaryGrid',
		    selector: 'qualityhistsummarygrid'
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
        	'qualityhistsummarygrid' : {
        		cellclick : this.openQuailtyProgramList
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
    	if (grid.columns[cellIndex-1] != null && grid.columns[cellIndex-1].dataIndex == 'adjtRatio') {
    		_developer = null;
    		_searchType = 'pgTotal';
    		_programType = null;
    		_developer = record.data.developer;
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
   	     || grid.columns[cellIndex].dataIndex == 'checkTarget'
   	     || grid.columns[cellIndex].dataIndex == 'changeFile'
   	     || grid.columns[cellIndex].dataIndex == 'svnReg') {
//    		_team = null;
//    		_module = null;
//    		_func = null;
    		_developer = null;
    		_searchType = grid.columns[cellIndex].dataIndex;
    		if (grid.columns[cellIndex].dataIndex == 'changeFile') _searchType = 'changeSource';
    		if (grid.columns[cellIndex].dataIndex == 'svnReg') _searchType = 'nosvn';
    		_programType = record.data.programType;
    		_developer = record.data.developer;
//    		this.setQualityParameterInfo(record);

    		this.openProgramGrid();
    	}
    },
    openQuailtyProgramList : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var grid = this.getQualityHistSummaryGrid();
    	cellIndex = cellIndex - 1;
    	if (grid.columns[cellIndex] != null &&
    	     (grid.columns[cellIndex].dataIndex == 'verifyResult'
    		 || grid.columns[cellIndex].dataIndex == 'pgTotal1'
    	     || grid.columns[cellIndex].dataIndex == 'pgComplete1'
    		 || grid.columns[cellIndex].dataIndex == 'comRatio2'
    		 || grid.columns[cellIndex].dataIndex == 'checkTarget2'
    		 || grid.columns[cellIndex].dataIndex == 'unusedSource2'
    	     || grid.columns[cellIndex].dataIndex == 'underStatement2'
    	     || grid.columns[cellIndex].dataIndex == 'utNoTestRatio2'
    	     || grid.columns[cellIndex].dataIndex == 'utNoTest2'
    	  	 || grid.columns[cellIndex].dataIndex == 'sitNoTestRatio2'
    	  	 || grid.columns[cellIndex].dataIndex == 'sitNoTest2'
    	     || grid.columns[cellIndex].dataIndex == 'runRatio2'
    	     || grid.columns[cellIndex].dataIndex == 'coverageRatio2'
    	     || grid.columns[cellIndex].dataIndex == 'sitCoverageRatio2'
    	     || grid.columns[cellIndex].dataIndex == 'changeFile2'
    	     || grid.columns[cellIndex].dataIndex == 'sitRunRatio'
    	     || grid.columns[cellIndex].dataIndex == 'sitInclude')) {
    		_team = null;
    		_module = null;
    		_func = null;
    		_programType = null;
    		_developer = null;
    		
    		if (grid.columns[cellIndex].dataIndex == 'verifyResult') {
    			_searchType = "pgTotal";
    			_searchDesc = '전체 프로그램';
    		}else if (grid.columns[cellIndex].dataIndex == 'comRatio2') {
    			_searchType = "pgDelay";
    			_searchDesc = '개발지연';
    		} else if (grid.columns[cellIndex].dataIndex == 'utNoTestRatio2') {
    			_searchType = "utTesting";
    			_searchDesc = 'UT 테스트 미진행';
    		} else if (grid.columns[cellIndex].dataIndex == 'utNoTest2') {
    			_searchType = "utNotest";
    			_searchDesc = 'UT 누락';
    		} else if (grid.columns[cellIndex].dataIndex == 'underStatement2') {
    			_searchType = "underStatement";
    			_searchDesc = '구문 10 미만';
    		} else if (grid.columns[cellIndex].dataIndex == 'unusedSource2') {
    			_searchType = "unUsedSource";
    			_searchDesc = '호출관계 누락 소스';
    		} else if (grid.columns[cellIndex].dataIndex == 'runRatio2') {
    			_searchType = "notRun";
    			_searchDesc = 'Run 미수행';
    		} else if (grid.columns[cellIndex].dataIndex == 'sitNoTestRatio2') {
    			_searchType = "sitTesting";
    			_searchDesc = 'SIT 테스트 진행중';
    		} else if (grid.columns[cellIndex].dataIndex == 'sitNoTest2') {
    			_searchType = "sitNotest";
    			_searchDesc = 'SIT 테스트 누락';
    		} else if (grid.columns[cellIndex].dataIndex == 'coverageRatio2') {
    			_searchType = "utCoverage";
    			_searchDesc = 'UT 커버리지 65% 미만';
    		} else if (grid.columns[cellIndex].dataIndex == 'sitCoverageRatio2') {
    			_searchType = "underSitCoverage";
    			_searchDesc = 'SIT 커버리지 65% 미만';
    		} else if (grid.columns[cellIndex].dataIndex == 'pgTotal1') {
    			_searchType = "pgTotal";
    			_searchDesc = '전체 개발 물량';
    		} else if (grid.columns[cellIndex].dataIndex == 'pgComplete1') {
    			_searchType = "pgComplete";
    			_searchDesc = '완료된 개발 물량';
    		} else if (grid.columns[cellIndex].dataIndex == 'checkTarget2') {
    			_searchType = "checkTarget";
    			_searchDesc = '의심 소스';
    		} else if (grid.columns[cellIndex].dataIndex == 'changeFile2') {
    			_searchType = "changeSource";
    			_searchDesc = '변동 소스';
    		} else if (grid.columns[cellIndex].dataIndex == 'sitRunRatio') {
    			_searchType = "sitRunTarget";
    			_searchDesc = 'SIT 클래스 호출 대상';
    		} else if (grid.columns[cellIndex].dataIndex == 'sitInclude') {
    			_searchType = "sitExclude";
    			_searchDesc = 'SIT 클래스 호출 누락 대상';
    		} else {
    			_searchType = null;
    		}
    		this.setQualityParameterInfo(record);
    		this.openProgramGrid();
    	} else if (grid.columns[cellIndex] != null &&
    			grid.columns[cellIndex].dataIndex == 'module') {
    		_team = null;
    		_module = null;
    		_func = null;
    		_programType = null;
    		_developer = null;
    		this.setQualityParameterInfo(record);
        	
        	var win = Ext.getCmp('developer-info');
    		if (win == null) {
    			win = Ext.create('Ext.window.Window', {
    				id : 'developer-info',
    	    	    title: '개발자 정보',
    	    	    resizable : true,
    	    	    autoScroll: true,
    	    	    maximizable : true,
//    	    	    closeAction : 'hide',
    	    	    layout: 'fit',
    	    	    modal: true,
    	    	    animateTarget:this,
    	    	    padding : 10,
    	    	    width : '90%',
    	    	    height : '95%',
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
    },
    setQualityParameterInfo : function(record) {
    	_team = record.get('originalTeam');
    	_module = record.get('originalModule');
    	if (_module == '') _module = null;
    	_func = record.get('originalFunction');
    	if (_func == '') _func = null;
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
        	    	beforeshow : function(win) {
        	    		var temp = _team + (_module != null && _module != '' ? ' > ' +  _module : '') + (_func != null && _func != '' ? ' > ' +  _func : '');
        	    		win.setTitle('프로그램 정보 -' + (_searchDesc == null ? '' : _searchDesc) + '(' + temp + ')');
        	    		var grid = Ext.getCmp('program-grid');
        	    		var store = grid.getStore();
        	    		store.removeAll();
        	    		var proxy = store.getProxy();
        	    		proxy.extraParams.team = _team;
        	    		proxy.extraParams.module = _module;
        	    		proxy.extraParams.function = _func;
        	    		proxy.extraParams.searchType = _searchType;
        	    		proxy.extraParams.programType = _programType;
        	    		proxy.extraParams.developer = _developer;
        	    		proxy.extraParams.searchFilter = null;
        	    		proxy.extraParams.searchOption = null;
        	    		proxy.extraParams.page = _page;
        	    		store.load();
        	    	}
	    	    }
			});
		}
		win.show();
    }
});
