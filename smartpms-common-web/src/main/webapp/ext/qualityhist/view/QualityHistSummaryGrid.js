var _modules = null;
Ext.define('Ext.qualityhist.view.QualityHistSummaryGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.qualityhistsummarygrid',
    autoScroll: true,
    background: 'none',
    border: false,
    id : 'quality-hist-summary-grid',
    minHeight : 1380,
    maxHeight : 1380,
    columnLines : true,
    initComponent: function() {

        this.store = 'QualityHistSummary';
        
        this.plugins = [];
        
        this.selModel = {
            selType: 'checkboxmodel',
            checkOnly : true,
            listeners : {
            	deselect : function( check, record, index, eOpts ) {
            		var grid = Ext.getCmp('quality-hist-summary-grid');
	    		    var sm = grid.getSelectionModel();
	    	        var rec = sm.getSelection();
	    	        if (rec.length > 5) {
	    	        	Ext.Msg.alert('Info', '모듈은 최대 5개 선택 가능합니다.');
		    	    	return ;
	    	        }
	    	        
	    	        var params = [];
	    	        for (var i=0;i < rec.length;i++) {
	    	        	params.push(rec[i].data.module);
		    	    }
	    	        
	    	        var chart0 = Ext.getCmp('sourcesize-chart');
        			var store0 = chart0.getStore();
	               	var proxy0 = store0.getProxy();
	               	proxy0.extraParams.searchModuleList = _mode == null ? params : _modules;
	               	proxy0.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy0.extraParams.searchType = 'sourceSize';
	               	store0.load();
	    	        
	    	        var chart1 = Ext.getCmp('checktarget-chart');
        			var store1 = chart1.getStore();
	               	var proxy1 = store1.getProxy();
	               	proxy1.extraParams.searchModuleList = _mode == null ? params : _modules;
	               	proxy1.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy1.extraParams.searchType = 'checkTarget';
	               	store1.load();
	               	
	                var chart2 = Ext.getCmp('unusedsource-chart');
        			var store2 = chart2.getStore();
	               	var proxy2 = store2.getProxy();
	               	proxy2.extraParams.searchModuleList =  _mode == null ? params : _modules;
	               	proxy2.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy2.extraParams.searchType = 'unusedSource';
	               	store2.load();
	               	
	                var chart3 = Ext.getCmp('understatement-chart');
        			var store3 = chart3.getStore();
	               	var proxy3 = store3.getProxy();
	               	proxy3.extraParams.searchModuleList =  _mode == null ? params : _modules;
	               	proxy3.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy3.extraParams.searchType = 'underStatement';
	               	store3.load();
	               	
	                var chart4 = Ext.getCmp('sitrun-chart');
        			var store4 = chart4.getStore();
	               	var proxy4 = store4.getProxy();
	               	proxy4.extraParams.searchModuleList =  _mode == null ? params : _modules;
	               	proxy4.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy4.extraParams.searchType = 'sitClssRun';
	               	store4.load();
	               	
	                var chart5 = Ext.getCmp('run-chart');
        			var store5 = chart5.getStore();
	               	var proxy5 = store5.getProxy();
	               	proxy5.extraParams.searchModuleList =  _mode == null ? params : _modules;
	               	proxy5.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy5.extraParams.searchType = 'runRatio';
	               	store5.load();
	               	
	                var chart6 = Ext.getCmp('sitnotest-chart');
        			var store6 = chart6.getStore();
	               	var proxy6 = store6.getProxy();
	               	proxy6.extraParams.searchModuleList =  _mode == null ? params : _modules;
	               	proxy6.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy6.extraParams.searchType = 'sitNoTest';
	               	store6.load();
	               	
	               	var chart7 = Ext.getCmp('sittest-chart');
        			var store7 = chart7.getStore();
	               	var proxy7 = store7.getProxy();
	               	proxy7.extraParams.searchModuleList =  _mode == null ? params : _modules;
	               	proxy7.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy7.extraParams.searchType = 'sitRun';
	               	store7.load();
	               	
	               	var chart8 = Ext.getCmp('sitcoverage-chart');
        			var store8 = chart8.getStore();
	               	var proxy8 = store8.getProxy();
	               	proxy8.extraParams.searchModuleList =  _mode == null ? params : _modules;
	               	proxy8.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy8.extraParams.searchType = 'sitCoverage';
	               	store8.load();
	               	
	               	var chart9 = Ext.getCmp('changesource-chart');
        			var store9 = chart9.getStore();
	               	var proxy9 = store9.getProxy();
	               	proxy9.extraParams.searchModuleList = _mode == null ? params : _modules;
	               	proxy9.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy9.extraParams.searchType = 'changeSource';
	               	store9.load();
	               	
	               	var chart10 = Ext.getCmp('svnnotreg-chart');
        			var store10 = chart10.getStore();
	               	var proxy10 = store10.getProxy();
	               	proxy10.extraParams.searchModuleList = _mode == null ? params : _modules;
	               	proxy10.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy10.extraParams.searchType = 'svnNotReg';
	               	store10.load();
	               	
	               	var chart11 = Ext.getCmp('unittest-chart');
        			var store11 = chart11.getStore();
	               	var proxy11 = store11.getProxy();
	               	proxy11.extraParams.searchModuleList = _mode == null ? params : _modules;
	               	proxy11.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy11.extraParams.searchType = 'utRun';
	               	store11.load();
	               	
	               	
	               	var chart12 = Ext.getCmp('utnotest-chart');
        			var store12 = chart12.getStore();
	               	var proxy12 = store12.getProxy();
	               	proxy12.extraParams.searchModuleList = _mode == null ? params : _modules;
	               	proxy12.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy12.extraParams.searchType = 'utNoTest';
	               	store12.load();
	               	
	               	var chart13 = Ext.getCmp('coverage-chart');
        			var store13 = chart13.getStore();
	               	var proxy13 = store13.getProxy();
	               	proxy13.extraParams.searchModuleList = _mode == null ? params : _modules;
	               	proxy13.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy13.extraParams.searchType = 'utCoverage';
	               	store13.load();
	               	
	               	if (_mode == null)
	               		_modules = params;
            	},
	            select : function(check, record, index, eOpts ) {
	            	var grid = Ext.getCmp('quality-hist-summary-grid');
	    		    var sm = grid.getSelectionModel();
	    	        var rec = sm.getSelection();
	    	        if (rec.length > 5) {
	    	        	Ext.Msg.alert('Info', '모듈은 최대 5개 선택 가능합니다.');
		    	    	return ;
	    	        }
	    	        
	    	        var params = [];
	    	        for (var i=0;i < rec.length;i++) {
	    	        	params.push(rec[i].data.module);
		    	    }
	    	        
	    	        var chart0 = Ext.getCmp('sourcesize-chart');
        			var store0 = chart0.getStore();
	               	var proxy0 = store0.getProxy();
	               	proxy0.extraParams.searchModuleList = _mode == null ? params : _modules;
	               	proxy0.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy0.extraParams.searchType = 'sourceSize';
	               	store0.load();
	    	        
	    	        var chart1 = Ext.getCmp('checktarget-chart');
        			var store1 = chart1.getStore();
	               	var proxy1 = store1.getProxy();
	               	proxy1.extraParams.searchModuleList = _mode == null ? params : _modules;
	               	proxy1.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy1.extraParams.searchType = 'checkTarget';
	               	store1.load();
	               	
	                var chart2 = Ext.getCmp('unusedsource-chart');
        			var store2 = chart2.getStore();
	               	var proxy2 = store2.getProxy();
	               	proxy2.extraParams.searchModuleList =  _mode == null ? params : _modules;
	               	proxy2.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy2.extraParams.searchType = 'unusedSource';
	               	store2.load();
	               	
	                var chart3 = Ext.getCmp('understatement-chart');
        			var store3 = chart3.getStore();
	               	var proxy3 = store3.getProxy();
	               	proxy3.extraParams.searchModuleList =  _mode == null ? params : _modules;
	               	proxy3.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy3.extraParams.searchType = 'underStatement';
	               	store3.load();
	               	
	                var chart4 = Ext.getCmp('sitrun-chart');
        			var store4 = chart4.getStore();
	               	var proxy4 = store4.getProxy();
	               	proxy4.extraParams.searchModuleList =  _mode == null ? params : _modules;
	               	proxy4.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy4.extraParams.searchType = 'sitClssRun';
	               	store4.load();
	               	
	                var chart5 = Ext.getCmp('run-chart');
        			var store5 = chart5.getStore();
	               	var proxy5 = store5.getProxy();
	               	proxy5.extraParams.searchModuleList =  _mode == null ? params : _modules;
	               	proxy5.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy5.extraParams.searchType = 'runRatio';
	               	store5.load();
	               	
	               	var chart6 = Ext.getCmp('sitnotest-chart');
        			var store6 = chart6.getStore();
	               	var proxy6 = store6.getProxy();
	               	proxy6.extraParams.searchModuleList =  _mode == null ? params : _modules;
	               	proxy6.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy6.extraParams.searchType = 'sitNoTest';
	               	store6.load();
	               	
	               	var chart7 = Ext.getCmp('sittest-chart');
        			var store7 = chart7.getStore();
	               	var proxy7 = store7.getProxy();
	               	proxy7.extraParams.searchModuleList =  _mode == null ? params : _modules;
	               	proxy7.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy7.extraParams.searchType = 'sitRun';
	               	store7.load();
	               	
	               	var chart8 = Ext.getCmp('sitcoverage-chart');
        			var store8 = chart8.getStore();
	               	var proxy8 = store8.getProxy();
	               	proxy8.extraParams.searchModuleList =  _mode == null ? params : _modules;
	               	proxy8.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy8.extraParams.searchType = 'sitCoverage';
	               	store8.load();
	               	
	               	var chart9 = Ext.getCmp('changesource-chart');
        			var store9 = chart9.getStore();
	               	var proxy9 = store9.getProxy();
	               	proxy9.extraParams.searchModuleList = _mode == null ? params : _modules;
	               	proxy9.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy9.extraParams.searchType = 'changeSource';
	               	store9.load();
	               	
	               	var chart10 = Ext.getCmp('svnnotreg-chart');
        			var store10 = chart10.getStore();
	               	var proxy10 = store10.getProxy();
	               	proxy10.extraParams.searchModuleList = _mode == null ? params : _modules;
	               	proxy10.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy10.extraParams.searchType = 'svnNotReg';
	               	store10.load();
	               	
	               	var chart11 = Ext.getCmp('unittest-chart');
        			var store11 = chart11.getStore();
	               	var proxy11 = store11.getProxy();
	               	proxy11.extraParams.searchModuleList = _mode == null ? params : _modules;
	               	proxy11.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy11.extraParams.searchType = 'utRun';
	               	store11.load();
	               	
	               	
	               	var chart12 = Ext.getCmp('utnotest-chart');
        			var store12 = chart12.getStore();
	               	var proxy12 = store12.getProxy();
	               	proxy12.extraParams.searchModuleList = _mode == null ? params : _modules;
	               	proxy12.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy12.extraParams.searchType = 'utNoTest';
	               	store12.load();
	               	
	               	var chart13 = Ext.getCmp('coverage-chart');
        			var store13 = chart13.getStore();
	               	var proxy13 = store13.getProxy();
	               	proxy13.extraParams.searchModuleList = _mode == null ? params : _modules;
	               	proxy13.extraParams.searchFunctionList = _mode == null ? null : params;
	               	proxy13.extraParams.searchType = 'utCoverage';
	               	store13.load();
	               	
	               	if (_mode == null)
	               		_modules = params;
	            }
            }
        }
        
        this.features = [{
        	ftype: 'groupingsummary',
        	id : 'group',
        	groupHeaderTpl: '{name}',
        	hideGroupHeader: true,
        	enbaleGroupingMenu: false
        }];
        
        this.columns = [		
        { 
            header: '구분',
            dataIndex: 'module',
//            locked : true,
            width: 150,
            flex:1,
            align:'center',
            summaryType : function(records) {
            	return '전체';
            },
            summaryRenderer : function(value, meta, record, rowIndex) {
            	return '<span style="color:black;font-weight:bold">전체</span>';
            },
            renderer : function(value, meta, record, rowIndex) {
            	return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;">' + (value == null || value == ' ' ? '구분없음' : value) + '</span>';
            }
        },
        { 
//		    header: '상태',
		    dataIndex: 'verifyResult',
		    width: 35,
//		    locked : true,
		    align:'center',
		    tooltip : '각 영역별 소스코드의 종합 품질 현황 - 판단기준 : 개밣지연, RUN 수행율',
		    renderer : function(value, meta, record) {
		    	var exclude = record.get('module') == '모바일BSS' || record.get('module') == 'PSTN/WiFi UI 웹화'
		    		record.get('team') == 'DIH' ||  record.get('team') == 'CDM' ? true : false ;
		    	var result1 = record.get('comRatio2') - 100;
		    	var result2 = exclude ? 0 : 0 - record.get('unusedSource2');
		    	var result3 = exclude ? 0 : 0 - record.get('underStatement2');
		    	var result4 = exclude || record.get('utTarget2') == 0 ? 0 : record.get('utNoTestRatio2') - 100;
		    	var result5 = exclude || record.get('runTarget2') == 0 ? 0 : record.get('runRatio2') - 90;
		    	var result6 = exclude || record.get('runTarget2') == 0 ? 0 : record.get('coverageRatio2') - 65;
		    	var result7 = exclude || record.get('sitRunTarget') == 0 ? 0 : record.get('sitNoTestRatio2') - 100;
		    	var result8 = exclude || record.get('sitRunTarget') == 0 ? 0 : record.get('sitCoverageRatio2') - 65;
		    	var result9 = exclude ? 0 : 0 - record.get('checkTarget2');
		    	var result10 = record.get('module') == '모바일BSS' ? 0 : 0 - (record.get("pgComTarget2") - record.get("svnReg2"));
		    	var result11 = record.get('module') == '모바일BSS' || record.get('utTarget2') == 0 ? 0 : 0 - record.get("utNoTest2");
		    	var result12 = record.get('module') == '모바일BSS' || record.get('sitTarget2') == 0 ? 0 : record.get("sitNoTestRatio2") - 100;
		    	var result13 = record.get('module') == '모바일BSS' || record.get('sitTarget2') == 0 ? 0 : 0 - record.get("sitNoTest2");
		    	
		    	var count = 0;
		    	if (result1 < 0) {
		    		count++;
		    	}
		    	if (result2 < 0) {
		    		count++;
		    	}
		    	if (result3 < 0) {
		    		count++;
		    	}
		    	if (result4 < 0) {
		    		count++;
		    	}
		    	if (result5 < 0) {
		    		count++;
		    	}
		    	if (result6 < 0) {
		    		count++;
		    	}
		    	if (result7 < 0) {
		    		count++;
		    	}
		    	if (result8 < 0) {
		    		count++;
		    	}
		    	if (result9 < 0) {
		    		count++;
		    	}
		    	if (result10 < 0) {
		    		count++;
		    	}
		    	if (result11 < 0) {
		    		count++;
		    	}
		    	if (result12 < 0) {
		    		count++;
		    	}
		    	if (result13 < 0) {
		    		count++;
		    	}
		    		
		    	var color = count  == 0 ? '#4caf50' : count >= 1 && count <= 4 ? '#ffc107' : '#e91e63';
		    	return '<i class="x-fa fa-circle" style="color:' + color +'"></i>';
		    }
		},
		{
	    	header: '팀정보',
		    dataIndex: 'team',
		    width: 90,
		    align:'center',
		    hidden : true,
		    summaryType : function(records) {
            	return records[0].data.team;
            },
		    summaryRenderer : function(value, meta, record, rowIndex) {
            	return value;
            }
	    },
		{
        	header : '개발현황',
        	columns : [
				{ 
				    header: '전체물량',
				    dataIndex: 'pgTotal1',
				    width: 70,
				    align:'center',
				    summaryType : 'sum',
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	var team = rowIndex.record.get('team');
		            	return '<span style="color:black;font-weight:bold"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._summaryView(\'pgTotal1\',\''+ team + '\');">' + value + '</span></span>';
		            },
				    renderer : function(value,  meta, record) {
				    	return '<span style="color:black;font-weight:bold">' + value + '</span>';
				    }
				},
				{ 
				    header: '완료물량',
				    dataIndex: 'pgComplete1',
				    width: 100,
				    align:'center',
//				    summaryType : 'sum',
				    summaryType : function(records) {
				    	var result = 0;
				    	var count = 0;
				    	var total = 0;
				    	Ext.each(records, function(record, index) {
							result +=  record.get('pgComplete1');
							count++;
							if (record.get("module") != '모바일BSS')
								total += record.get("pgComTarget2") - record.get("svnReg2");
				    	});
				    	total = 0 - total;
				    	return (count == 0 ? 0 : result) + " (<span style=\"color:blue;font-weight:normal\">"+ total + "</span>)";
				    },
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	var team = rowIndex.record.get('team');
		            	return '<span style="color:black;font-weight:bold"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._summaryView(\'pgComplete1\',\''+ team + '\');">' + value + '</span></span>';
		            },
				    renderer : function(value,  meta, record) {
				    	var result = record.get("pgComTarget2") - record.get("svnReg2");
				    	result = result < 0 ? 0 : 0 - result;
				    	if (record.get("module") == '모바일BSS') result = '-';
				    	return '<span style="color:black;font-weight:bold">' + value + '(<span style="color:blue;font-weight:normal">' + result + '</span>)</span>';
				    }
				},
				{ 
				    header: '진척율(%)',
				    dataIndex: 'comRatio2',
				    width: 80,
				    align:'center',
				    summaryType : 'average',
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	var team = rowIndex.record.get('team');
		            	return '<span style="color:black;font-weight:bold"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._summaryView(\'comRatio2\',\''+ team + '\');">' + value.toFixed(2) + '</span></span>';
		            },
		            renderer : function(value,  meta, record) {
		            	var result = record.get('comRatio2') - 100;
				    	var color = result < 0 ? 'blue' :  result == 0 ? 'black' : 'red';
				    	var item = result > 0 ? '▲' : result == 0 ? '' : '▼';
		            	return '<span style="color:black;font-weight:bold">' + value + '(</span><span style="color:' +  color + ';font-weight:normal">' + item + result.toFixed(2) + '</span>)';
		            }
				},
				{ 
				    header: '변동소스(건)',
				    dataIndex: 'changeFile2',
				    tooltip : '추가 및 소스 변경된 물량',
				    width: 80,
				    align:'center',
				    summaryType : 'sum',
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	var team = rowIndex.record.get('team');
		            	return '<span style="color:black;font-weight:bold"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._summaryView(\'changeFile2\',\''+ team + '\');">' + value + '</span></span>';
		            },
				    renderer : function(value,  meta, record) {
		            	var result = record.get('changeFile2') - (record.get('changeFile1') == 0 ? record.get('changeFile2') : record.get('changeFile1'));
				    	var color = result < 0 ? 'blue' :  result == 0 ? 'black' : 'red';
				    	var item = result > 0 ? '▲' : result == 0 ? '' : '▼';
		            	return '<span style="color:black;font-weight:bold">' + value + '(</span><span style="color:' +  color + ';font-weight:normal">' + item + result+ '</span>)';
		            }
				}
			]
		},
		{
			header : '개발 품질(UT)',
        	columns : [
				{ 
				    header: '의심소스(건)',
				    dataIndex: 'checkTarget2',
				    tooltip : '의심소스 - UT 커버리지가 존재하여 RUN이 수행되었다고 판단되었으나 소스가 Logging 출력만 존재하는 등 비정상적인 소스로 의심되는 대상',
				    width: 65,
				    align:'center',
				    summaryType : 'sum',
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	var team = rowIndex.record.get('team');
				    	value = 0 - value;
				    	if (team == 'DIH' || team == 'CDM') {
				    		return '-';
				    	} else {
				    		return '<span style="color:black;font-weight:bold"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._summaryView(\'checkTarget2\',\''+ team + '\');">' + value + '</span></span>';
				    	}
		            },
		            renderer : function(value,  meta, record) {
		            	var result = 0 - record.get('checkTarget2');
				    	var color = result < 0 ? 'blue' :  result == 0 ? 'black' : 'red';
				    	var item = result > 0 ? '▲' : result == 0 ? '' : '▼';
				    	var team = record.get('team');
				    	if (team == 'DIH' || team == 'CDM') {
				    		return '-';
				    	} else {
				    		return '<span style="color:' +  color + ';font-weight:normal">' + item + result + '</span>';
				    	}
		            }
				},
				{ 
				    header: '호출누락(건)',
				    dataIndex: 'unusedSource2',
				    tooltip : '호출누락 -해당 클래스 또는 파일이 호출 되는 다른 파일또는 클래스가 없은 대상',
				    width: 65,
				    align:'center',
				    summaryType : 'sum',
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	var team = rowIndex.record.get('team');
				    	value = 0 - value;
				    	if (team == 'DIH' || team == 'CDM') {
				    		return '-';
				    	} else {
				    		return '<span style="color:black;font-weight:bold"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._summaryView(\'unusedSource2\',\''+ team + '\');">' + value + '</span></span>';
				    	}
		            },
		            renderer : function(value,  meta, record) {
		            	var result = 0 - record.get('unusedSource2');
				    	var color = result < 0 ? 'blue' :  result == 0 ? 'black' : 'red';
				    	var item = result > 0 ? '▲' : result == 0 ? '' : '▼';
				    	var team = record.get('team');
				    	if (team == 'DIH' || team == 'CDM') {
				    		return '-';
				    	} else {
				    		return '<span style="color:' +  color + ';font-weight:normal">' + item + result + '</span>';
				    	}
		            }
				},
				{ 
				    header: '구문10미만(건)',
				    dataIndex: 'underStatement2',
				    tooltip : '구문10미만 -BO,BOC 클래스 중  구분수가 10 미만인 건',
				    width: 65,
				    align:'center',
				    summaryType : 'sum',
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	var team = rowIndex.record.get('team');
				    	value = 0 - value;
				    	if (team == 'DIH' || team == 'CDM') {
				    		return '-';
				    	} else {
				    		return '<span style="color:black;font-weight:bold"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._summaryView(\'underStatement2\',\''+ team + '\');">' + value + '</span></span>';
				    	}
		            },
		            renderer : function(value,  meta, record) {
		            	
		            	var result = 0 - record.get('underStatement2');
				    	var color = result < 0 ? 'blue' :  result == 0 ? 'black' : 'red';
				    	var item = result > 0 ? '▲' : result == 0 ? '' : '▼';
				    	var team = record.get('team');
				    	if (team == 'DIH' || team == 'CDM') {
				    		return '-';
				    	} else {
				    		return '<span style="color:' +  color + ';font-weight:normal">' + item + result + '</span>';
				    	}
		            }
				},
				{ 
				    header: '테스트율(%)',
				    dataIndex: 'utNoTestRatio2',
				    width: 140,
				    align:'center',
//				    summaryType : 'average',
				    summaryType : function(records) {
				    	var result = 0;
				    	var count = 0;
				    	var total = 0;
				    	Ext.each(records, function(record, index) {
							result +=  record.get('utComplete2') + record.get('utTesting2');
							count++;
							total += record.get('utComplete2');
				    	});
				    	return (count == 0 ? 0 : (total/result*100).toFixed(2)) + " ("+ total + '/' + result  + ")";
				    },
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	var team = rowIndex.record.get('team');
		            	return '<span style="color:black;font-weight:bold"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._summaryView(\'utNoTestRatio2\',\''+ team + '\');">' + value + '</span></span>';
		            },
		            renderer : function(value,  meta, record) {
		            	var result = record.get('utComplete2') + record.get('utTesting2');
		            	var child = record.get('utComplete2');
				    	var color = result < 0 ? 'blue' :  result == 0 ? 'black' : 'red';
				    	var item = result > 0 ? '▲' : result == 0 ? '' : '▼';
		            	return '<span style="color:black;font-weight:bold">' + value + '(</span>' + child + '/' + result + '</span>)';
		            }
				},
				{ 
				    header: '누락 PG',
				    dataIndex: 'utNoTest2',
				    width: 70,
				    align:'center',
//				    summaryType : 'sum',
				    summaryType : function(records) {
				    	var result = 0;
				    	var count = 0;
				    	var total = 0;
				    	Ext.each(records, function(record, index) {
							count++;
							if (record.get("module") != '모바일BSS')
								total += 0 - record.get("utNoTest2");
				    	});
				    	return total;
				    },
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	value = 0 - value;
				    	var team = rowIndex.record.get('team');
		            	return '<span style="color:black;font-weight:bold"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._summaryView(\'utNoTest2\',\''+ team + '\');">' + value + '</span></span>';
		            },
		            renderer : function(value,  meta, record) {
		            	var result = 0 - record.get('utNoTest2');
				    	var color = result < 0 ? 'blue' :  result == 0 ? 'black' : 'red';
				    	var item = result > 0 ? '▲' : result == 0 ? '' : '▼';
				    	if (record.get("module") == '모바일BSS') {
				    		item = '';
				    		result = '-';
				    	}
		            	return '<span style="color:' +  color + ';font-weight:normal">' + item + result + '</span>';
		            }
				},
				{ 
				    header: 'RUN수행율(%)',
				    dataIndex: 'runRatio2',
				    width: 90,
				    align:'center',
				    summaryType : 'average',
				    renderer : function(value,  meta, record) {
				    	var result = record.get('runRatio2') == 0 ? 0 : record.get('runRatio2') - 90;
				    	var color = result < 0 ? 'blue' :  result == 0 ? 'black' : 'red';
				    	var item = result > 0 ? '▲' : result == 0 ? '' : '▼';
				    	var team = record.get('team');
				    	if (team == 'DIH' || team == 'CDM') {
				    		return '-';
				    	} else {
				    		return '<span style="color:black;font-weight:bold">' + value + '(</span><span style="color:' +  color + ';font-weight:normal">' + item + result.toFixed(2) + '</span>)';
				    	}
		            },
		            summaryRenderer : function(value, meta, record, rowIndex) {
				    	var team = rowIndex.record.get('team');
				    	if (team == 'DIH' || team == 'CDM') {
				    		return '-';
				    	} else {
				    		return '<span style="color:black;font-weight:bold"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._summaryView(\'runRatio2\',\''+ team + '\');">' + value.toFixed(2) + '</span></span>';
				    	}
		            }
				},
				{ 
				    header: '커버리지율(%)',
				    dataIndex: 'coverageRatio2',
				    width: 110,
				    align:'center',
				    summaryType : 'average',
				    renderer : function(value,  meta, record) {
				    	var result = record.get('coverageRatio2') == 0 ? 0 : record.get('coverageRatio2') - 65;
				    	var color = result < 0 ? 'blue' :  result == 0 ? 'black' : 'red';
				    	var item = result > 0 ? '▲' : result == 0 ? '' : '▼';
				    	var team = record.get('team');
				    	if (team == 'DIH' || team == 'CDM') {
				    		return '-';
				    	} else {
				    		return '<span style="color:black;font-weight:bold">' + value + '(</span><span style="color:' +  color + ';font-weight:normal">' + item + result.toFixed(2) + '</span>)';
				    	}
		            },
		            summaryRenderer : function(value, meta, record, rowIndex) {
				    	var team = rowIndex.record.get('team');
				    	if (team == 'DIH' || team == 'CDM') {
				    		return '-';
				    	} else {
				    		return '<span style="color:black;font-weight:bold"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._summaryView(\'coverageRatio2\',\''+ team + '\');">' + value.toFixed(2) + '</span></span>';
				    	}
		            }
				}
		   ]
		},
		{
			header : '테스트 품질(SIT)',
        	columns : [
				{ 
				    header: '테스트율(%)',
				    dataIndex: 'sitNoTestRatio2',
				    width: 135,
				    align:'center',
//				    summaryType : 'average',
				    summaryType : function(records) {
				    	var result = 0;
				    	var count = 0;
				    	var total = 0;
				    	Ext.each(records, function(record, index) {
							result +=  record.get('sitComplete2') + record.get('sitTesting2');
							count++;
							total += record.get('sitComplete2');
				    	});
				    	return (count == 0 ? 0 : (total/result*100).toFixed(2)) + " ("+ total + '/' + result  + ")";
				    },
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	var team = rowIndex.record.get('team');
		            	return '<span style="color:black;font-weight:bold"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._summaryView(\'sitNoTestRatio2\',\''+ team + '\');">' + value + '</span></span>';
		            },
		            renderer : function(value,  meta, record) {
		            	var result = record.get('sitComplete2') + record.get('sitTesting2');
		            	var child = record.get('sitComplete2');
				    	var color = result < 0 ? 'blue' :  result == 0 ? 'black' : 'red';
				    	var item = result > 0 ? '▲' : result == 0 ? '' : '▼';
		            	return '<span style="color:black;font-weight:bold">' + value + '(</span>' + child + '/' + result + '</span>)';
		            }
				},
				{ 
				    header: '누락 PG',
				    dataIndex: 'sitNoTest2',
				    width: 70,
				    align:'center',
//				    summaryType : 'sum',
				    summaryType : function(records) {
				    	var result = 0;
				    	var count = 0;
				    	var total = 0;
				    	Ext.each(records, function(record, index) {
							count++;
							if (record.get("module") != '모바일BSS')
								total += 0 - record.get("sitNoTest2");
				    	});
				    	return total;
				    },
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	value = 0 - value;
				    	var team = rowIndex.record.get('team');
		            	return '<span style="color:black;font-weight:bold"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._summaryView(\'sitNoTest2\',\''+ team + '\');">' + value + '</span></span>';
		            },
		            renderer : function(value,  meta, record) {
		            	var result = 0 - record.get('sitNoTest2');
				    	var color = result < 0 ? 'blue' :  result == 0 ? 'black' : 'red';
				    	var item = result > 0 ? '▲' : result == 0 ? '' : '▼';
				    	if (record.get("module") == '모바일BSS') {
				    		item = '';
				    		result = '-';
				    	}
		            	return '<span style="color:' +  color + ';font-weight:normal">' + item + result + '</span>';
		            }
				},
				{ 
				    header: 'Class호출율(%)',
				    dataIndex: 'sitRunRatio',
				    width: 135,
				    align:'center',
//				    summaryType : 'average',
				    summaryType : function(records) {
				    	var result = 0;
				    	var count = 0;
				    	var total = 0;
				    	Ext.each(records, function(record, index) {
							result +=  record.get('sitRunTarget');
							count++;
							total += record.get('sitRun');
				    	});
				    	return (result == 0 ? 0 : (total/result*100).toFixed(2)) + " ("+ total + '/' + result  + ")";
				    },
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	var team = rowIndex.record.get('team');
				    	if (team == 'DIH' || team == 'CDM') {
				    		return '-';
				    	} else {
				    		return '<span style="color:black;font-weight:bold"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._summaryView(\'runRatio2\',\''+ team + '\');">' + value + '</span></span>';
				    	}
		            },
		            renderer : function(value,  meta, record) {
		            	var child = record.get('sitRun');
		            	var parent = record.get('sitRunTarget');
		            	var team = record.get('team');
				    	if (team == 'DIH' || team == 'CDM') {
				    		return '-';
				    	} else {
				    		return '<span style="color:black;font-weight:bold">' + value.toFixed(2) + '</span>(' + child + '/' + parent  + ')';
				    	}
		            }
				},
				{ 
				    header: 'Class예상호출율(%)',
				    dataIndex: 'sitInclude',
				    width: 110,
				    align:'center',
//				    summaryType : 'average',
				    summaryType : function(records) {
				    	var result = 0;
				    	var count = 0;
				    	var total = 0;
				    	Ext.each(records, function(record, index) {
							result +=  record.get('sitInclude');
							count++;
							total += record.get('sitExclude');
				    	});
				    	return (count == 0 ? 0 : (result/count).toFixed(2)) + " ("+ total + ")";
				    },
				    renderer : function(value,  meta, record) {
				    	var result = record.get("sitExclude");
				    	var team = record.get('team');
				    	if (team == 'DIH' || team == 'CDM') {
				    		return '-';
				    	} else {
				    		return '<span style="color:black;font-weight:bold">' + value.toFixed(2) + '(</span><span style="color:blue;font-weight:normal">' + result + '</span>)';
				    	}
		            },
		            summaryRenderer : function(value, meta, record, rowIndex) {
				    	var team = rowIndex.record.get('team');
				    	if (team == 'DIH' || team == 'CDM') {
				    		return '-';
				    	} else {
				    		return '<span style="color:black;font-weight:bold"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._summaryView(\'sitInclude\',\''+ team + '\');">' + value + '</span></span>';
				    	}
		            }
				},
				{ 
				    header: '커버리지율(%)',
				    dataIndex: 'sitCoverageRatio2',
				    width: 110,
				    align:'center',
				    summaryType : 'average',
				    renderer : function(value,  meta, record) {
				    	var result = record.get('sitCoverageRatio2') == 0 ? 0 : record.get('sitCoverageRatio2') - 65;
				    	var color = result < 0 ? 'blue' :  result == 0 ? 'black' : 'red';
				    	var item = result > 0 ? '▲' : result == 0 ? '' : '▼';
				    	var team = record.get('team');
				    	if (team == 'DIH' || team == 'CDM') {
				    		return '-';
				    	} else {
				    		return '<span style="color:black;font-weight:bold">' + value + '(</span><span style="color:' +  color + ';font-weight:normal">' + item + result.toFixed(2) + '</span>)';
				    	}
		            },
		            summaryRenderer : function(value, meta, record, rowIndex) {
				    	var team = rowIndex.record.get('team');
				    	if (team == 'DIH' || team == 'CDM') {
				    		return '-';
				    	} else {
				    		return '<span style="color:black;font-weight:bold"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._summaryView(\'sitCoverageRatio2\',\''+ team + '\');">' + value.toFixed(2) + '</span></span>';
				    	}
		            }
				}
        	]
        }
        ];
        
        
        this.tbar = [
             {
              	xtype : 'label',
              	width : '100%',
              	hieght : 10,
              	html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;소스 품질 현황 -' + DateUtil._formatDateNormal(new Date()) + '기준 </span></div>'
              		  + '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._loadInit()"><i class="x-fa fa-refresh" style="padding-left:5px;"></i></span><span style="cursor:pointer;cursor:hand;" onclick="GridAction._loadSimple()"><i class="x-fa fa-minus-square" style="padding-left:5px;"></i></span><span style="cursor:pointer;cursor:hand;" onclick="GridAction._loadDetail()"><i class="x-fa fa-plus-square" style="padding-left:5px;"></i></span></div>'
              		  + '</div>'
               }
        ];
        
        this.callParent(arguments);
    },
    listeners : {
    	resize : function (self, width, height) {
    	}
    }
});
var _mode = null;
var GridAction = {
	_summaryView : function(_type, team) {
		var temp = team.split('-');
		_team = temp[0] + (temp[1] != null ? ('-' + temp[1]) : '');
		_module = temp.length > 2 && temp[2] != null ? temp[2] : null;
		_func = null;
		_programType = null;
		_developer = null;
		
		if (_type == 'verifyResult') {
			_searchType = "pgTotal";
			_searchDesc = '전체 프로그램';
		}else if (_type == 'comRatio2') {
			_searchType = "pgDelay";
			_searchDesc = '개발지연';
		} else if (_type == 'utNoTestRatio2') {
			_searchType = "utTesting";
			_searchDesc = 'UT 테스트 미진행';
		} else if (_type == 'utNotest2') {
			_searchType = "utNotest";
			_searchDesc = 'UT 누락';
		} else if (_type == 'underStatement2') {
			_searchType = "underStatement";
			_searchDesc = '구문 10 미만';
		} else if (_type == 'unusedSource2') {
			_searchType = "unUsedSource";
			_searchDesc = '호출관계 누락 소스';
		} else if (_type == 'runRatio2') {
			_searchType = "notRun";
			_searchDesc = 'Run 미수행';
		} else if (_type == 'sitNoTestRatio2') {
			_searchType = "sitTesting";
			_searchDesc = 'SIT 테스트 미진행';
		} else if (_type == 'sitNoTest2') {
			_searchType = "sitNotest";
			_searchDesc = 'SIT 누락';
		} else if (_type == 'coverageRatio2') {
			_searchType = "utCoverage";
			_searchDesc = 'UT 커버리지 65% 미만';
		} else if (_type == 'sitCoverageRatio2') {
			_searchType = "underSitCoverage";
			_searchDesc = 'SIT 커버리지 65% 미만';
		} else if (_type == 'pgTotal1') {
			_searchType = "pgTotal";
			_searchDesc = '전체 개발 물량';
		} else if (_type == 'pgComplete1') {
			_searchType = "pgComplete";
			_searchDesc = '완료된 개발 물량';
		} else if (_type == 'checkTarget2') {
			_searchType = "checkTarget";
			_searchDesc = '의심 소스';
		} else if (_type == 'changeFile2') {
			_searchType = "changeSource";
			_searchDesc = '변동 소스';
		} else {
			_searchType = null;
		}
		
    	
		var win = Ext.getCmp('program-info');
		if (win == null) {
			win = Ext.create('Ext.window.Window', {
				id : 'program-info',
	    	    title: '프로그램 정보',
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
	    	    renderTo : parent.Ext.get('body'),
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
        	    		proxy.extraParams.page = _page;
        	    		proxy.extraParams.searchFilter = null;
        	           	proxy.extraParams.searchOption = null;
        	    		store.load();
        	    	}
	    	    }
			});
		}
		win.show();
	},
	_loadInit : function() {
		var grid = Ext.getCmp('quality-hist-summary-grid');
		var store = grid.getStore();
       	var proxy = store.getProxy();
       	proxy.extraParams.searchModuleList = null;
       	store.load();
       	_mode = null;
       	
        var chart0 = Ext.getCmp('sourcesize-chart');
		var store0 = chart0.getStore();
       	var proxy0 = store0.getProxy();
       	proxy0.extraParams.searchModuleList = null;
       	proxy0.extraParams.searchFunctionList = null;
       	proxy0.extraParams.searchType = 'sourceSize';
       	store0.load();
        
        var chart1 = Ext.getCmp('checktarget-chart');
		var store1 = chart1.getStore();
       	var proxy1 = store1.getProxy();
       	proxy1.extraParams.searchModuleList = null;
       	proxy1.extraParams.searchFunctionList = null;
       	proxy1.extraParams.searchType = 'checkTarget';
       	store1.load();
       	
        var chart2 = Ext.getCmp('unusedsource-chart');
		var store2 = chart2.getStore();
       	var proxy2 = store2.getProxy();
       	proxy2.extraParams.searchModuleList = null;
       	proxy2.extraParams.searchFunctionList = null;
       	proxy2.extraParams.searchType = 'unusedSource';
       	store2.load();
       	
        var chart3 = Ext.getCmp('understatement-chart');
		var store3 = chart3.getStore();
       	var proxy3 = store3.getProxy();
       	proxy3.extraParams.searchModuleList =  null;
       	proxy3.extraParams.searchFunctionList = null;
       	proxy3.extraParams.searchType = 'underStatement';
       	store3.load();
       	
        var chart4 = Ext.getCmp('sitrun-chart');
		var store4 = chart4.getStore();
       	var proxy4 = store4.getProxy();
       	proxy4.extraParams.searchModuleList =  null;
       	proxy4.extraParams.searchFunctionList = null;
       	proxy4.extraParams.searchType = 'sitClssRun';
       	store4.load();
       	
        var chart5 = Ext.getCmp('run-chart');
		var store5 = chart5.getStore();
       	var proxy5 = store5.getProxy();
       	proxy5.extraParams.searchModuleList =  null;
       	proxy5.extraParams.searchFunctionList = null;
       	proxy5.extraParams.searchType = 'runRatio';
       	store5.load();
       	
        var chart6 = Ext.getCmp('sitnotest-chart');
		var store6 = chart6.getStore();
       	var proxy6 = store6.getProxy();
       	proxy6.extraParams.searchModuleList =  null;
       	proxy6.extraParams.searchFunctionList = null;
       	proxy6.extraParams.searchType = 'sitNoTest';
       	store6.load();
       	
       	var chart7 = Ext.getCmp('sittest-chart');
		var store7 = chart7.getStore();
       	var proxy7 = store7.getProxy();
       	proxy7.extraParams.searchModuleList =  null;
       	proxy7.extraParams.searchFunctionList = null;
       	proxy7.extraParams.searchType = 'sitRun';
       	store7.load();
       	
       	var chart8 = Ext.getCmp('sitcoverage-chart');
		var store8 = chart8.getStore();
       	var proxy8 = store8.getProxy();
       	proxy8.extraParams.searchModuleList =  null;
       	proxy8.extraParams.searchFunctionList = null;
       	proxy8.extraParams.searchType = 'sitCoverage';
       	store8.load();
       	
       	var chart9 = Ext.getCmp('changesource-chart');
		var store9 = chart9.getStore();
       	var proxy9 = store9.getProxy();
       	proxy9.extraParams.searchModuleList = null;
       	proxy9.extraParams.searchFunctionList = null;
       	proxy9.extraParams.searchType = 'changeSource';
       	store9.load();
       	
       	var chart10 = Ext.getCmp('svnnotreg-chart');
		var store10 = chart10.getStore();
       	var proxy10 = store10.getProxy();
       	proxy10.extraParams.searchModuleList = null;
       	proxy10.extraParams.searchFunctionList = null;
       	proxy10.extraParams.searchType = 'svnNotReg';
       	store10.load();
       	
       	var chart11 = Ext.getCmp('unittest-chart');
		var store11 = chart11.getStore();
       	var proxy11 = store11.getProxy();
       	proxy11.extraParams.searchModuleList = null;
       	proxy11.extraParams.searchFunctionList = null;
       	proxy11.extraParams.searchType = 'utRun';
       	store11.load();
       	
       	
       	var chart12 = Ext.getCmp('utnotest-chart');
		var store12 = chart12.getStore();
       	var proxy12 = store12.getProxy();
       	proxy12.extraParams.searchModuleList = null;
       	proxy12.extraParams.searchFunctionList = null;
       	proxy12.extraParams.searchType = 'utNoTest';
       	store12.load();
       	
       	var chart13 = Ext.getCmp('coverage-chart');
		var store13 = chart13.getStore();
       	var proxy13 = store13.getProxy();
       	proxy13.extraParams.searchModuleList = null;
       	proxy13.extraParams.searchFunctionList = null;
       	proxy13.extraParams.searchType = 'utCoverage';
       	store13.load();
       	
	},	
	_loadSimple : function() {
		if (_mode == 'detail') {
			var grid = Ext.getCmp('quality-hist-summary-grid');
			var store = grid.getStore();
	       	var proxy = store.getProxy();
	       	proxy.extraParams.searchModuleList = null;
	       	store.load();
	       	_mode = null;
		}
	},
	_loadDetail : function() {
		if (_mode == null) {
			var grid = Ext.getCmp('quality-hist-summary-grid');
			var sm = grid.getSelectionModel();
	        var rec = sm.getSelection();
	        if (rec.length > 5) {
	        	Ext.Msg.alert('Info', '모듈은 최대 5개 선택 가능합니다.');
		    	return ;
	        }
	        
	        var params = [];
	        for (var i=0;i < rec.length;i++) {
	        	params.push(rec[i].data.module);
		    }
			var store = grid.getStore();
	       	var proxy = store.getProxy();
	       	proxy.extraParams.searchModuleList = params;
	       	store.load();
	       	_mode = 'detail';
		}
	}
}
