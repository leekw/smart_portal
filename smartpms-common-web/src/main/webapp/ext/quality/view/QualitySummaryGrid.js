Ext.define('Ext.quality.view.QualitySummaryGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.qualitysummarygrid',
    autoScroll: true,
    background: 'none',
    border: false,
    id : 'quality-summary-grid',
    minHeight : 350,
    maxHeight : 350,
    columnLines : true,
    initComponent: function() {
    	
    	var me = this;

        this.store = 'QualitySummary';
        
        this.plugins = [];
        
        this.selModel = {
            selType: 'checkboxmodel',
            mode : 'SINGLE',
            listeners : {
            	deselect : function( check, record, index, eOpts ) {
               	    Ext.getCmp('quality-detail-grid').getStore().removeAll();
               	    Ext.getCmp('developer-grid').getStore().removeAll();
               	    Ext.getCmp('developer-top-grid').getStore().removeAll();
            	},
	            select : function(check, record, index, eOpts ) {
	            	var grid = Ext.getCmp('quality-detail-grid');
				    var store = grid.getStore();
               	    var proxy = store.getProxy();
               	    proxy.extraParams.team = record.data.team;
	               	proxy.extraParams.module = record.data.module;
               	    store.load();
	            	
	             	var grid2 = Ext.getCmp('developer-grid');
	    			var store2 = grid2.getStore();
	               	var proxy2 = store2.getProxy();
	               	proxy2.extraParams.team = record.data.team;
	               	proxy2.extraParams.module = record.data.module;
	               	proxy2.extraParams.function = null;
	               	proxy2.extraParams.developerList = null;
	               	store2.load();
	               	
	               	var topGrid = Ext.getCmp('developer-top-grid');
	               	var topStore = topGrid.getStore();
	               	var topProxy = topStore.getProxy();
	               	var topList = Ext.getCmp('top-list').getValue()["topList"] + "";
	               	topProxy.extraParams.topList = topList.split(",") ;
	               	topProxy.extraParams.team = record.data.team;
	               	topProxy.extraParams.module = record.data.module;
	               	topProxy.extraParams.function = null;
	               	topStore.load();
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
            header: '모듈',
            dataIndex: 'module',
            width: 150,
            locked : true,
            align:'center',
            summaryType : function(records) {
            	return '합계';
            },
            summaryRenderer : function(value, meta, record, rowIndex) {
            	return value == '합계' ? '합계' : record.get('module');
            }
        },
        { 
		    header: '설계',
		    dataIndex: 'initCount',
		    width: 70,
		    align:'center',
		    hidden: true
		},
        { 
		    header: '설계',
		    dataIndex: 'initCount',
		    width: 70,
		    align:'center',
		    tooltip : '각 영역별 설계 후 PMSS 프로그램 물량',
            summaryType : 'sum'
		},
        {
        	header : '진척현황',
        	columns : [
				{ 
				    header: '전체',
				    dataIndex: 'pgTotal',
				    width: 65,
				    align:'center',
		            summaryType : 'sum',
		            summaryRenderer : function(value, meta, record, rowIndex) {
		            	return '<span style="cursor:pointer;cursor:hand;" onclick="ColumnAction._summaryView(\'pgTotal\');">' + value + '</span>';
		            },
		            renderer : function(value) {
		            	return '<span style="cursor:pointer;cursor:hand;">' + value + '</span>';
		            }
				},{ 
				    header: '완료',
				    dataIndex: 'pgComplete',
				    width: 65,
				    align:'center',
		            summaryType : 'sum',
		            summaryRenderer : function(value, meta, record, rowIndex) {
		            	return '<span style="cursor:pointer;cursor:hand;" onclick="ColumnAction._summaryView(\'pgComplete\');">' + value + '</span>';
		            },
		            renderer : function(value) {
		            	return '<span style="cursor:pointer;cursor:hand;">' + value + '</span>';
		            }
				},{ 
				    header: '지연',
				    dataIndex: 'pgDelay',
				    width: 65,
				    align:'center',
				    componentCls : 'redheader',
		            summaryType : 'sum',
		            summaryRenderer : function(value, meta, record, rowIndex) {
		            	meta.tdCls = 'grid-important';
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '" onclick="ColumnAction._summaryView(\'pgDelay\');">' + value + '</span>';
		            },
		            renderer : function(value, meta) {
		            	meta.tdCls = 'grid-important';
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
		            }
				}
        	]
        },
        {
        	header : '공통정보',
        	columns : [
				{ 
				    header: '소스Size(MB)',
				    tooltip : '소스 Size - MB',
				    dataIndex: 'fileSize2',
				    width: 80,
				    align:'center',
				    summaryType : 'sum',
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	meta.tdCls = 'grid-important';
				    	var temp  = value >= 0 ? 'black' : 'red';
				    	var temp2 = value == 0 ? 'normal' : 'bold';
				    	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '" onclick="ColumnAction._summaryView(\'fileSize\');">' + value.toFixed(2) + '</span>';
				    },
				    renderer : function(value, meta) {
				    	meta.tdCls = 'grid-important';
				    	var temp  = value >= 0 ? 'black' : 'red';
				    	var temp2 = value == 0 ? 'normal' : 'bold';
				    	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value.toFixed(2) + '</span>';
				    }
				},
				{ 
				    header: '호출누락',
				    tooltip : '호출관계가 없는 소스 - 정적분석',
				    dataIndex: 'unUsedSource',
				    width: 80,
				    align:'center',
				    summaryType : 'sum',
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	meta.tdCls = 'grid-important';
				    	var temp  = value >= 0 ? 'black' : 'red';
				    	var temp2 = value == 0 ? 'normal' : 'bold';
				    	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '" onclick="ColumnAction._summaryView(\'unUsedSource\');">' + value + '</span>';
				    },
				    renderer : function(value, meta) {
				    	meta.tdCls = 'grid-important';
				    	var temp  = value >= 0 ? 'black' : 'red';
				    	var temp2 = value == 0 ? 'normal' : 'bold';
				    	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
				    }
				},
				{ 
				    header: '의심소스',
				    tooltip : '개발이 완성되지 않았거나 표준명명 규칙 위반 등의 비정상적인 소스',
				    dataIndex: 'checkTarget',
				    width: 80,
				    align:'center',
				    summaryType : 'sum',
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	meta.tdCls = 'grid-important';
				    	var temp  = value >= 0 ? 'black' : 'red';
				    	var temp2 = value == 0 ? 'normal' : 'bold';
				    	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '" onclick="ColumnAction._summaryView(\'unUsedSource\');">' + value + '</span>';
				    },
				    renderer : function(value, meta) {
				    	meta.tdCls = 'grid-important';
				    	var temp  = value >= 0 ? 'black' : 'red';
				    	var temp2 = value == 0 ? 'normal' : 'bold';
				    	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
				    }
				}
        	]
        },
        {
        	header : 'UT 관련',
        	columns : [
				{ 
				    header: 'UT대상',
				    tooltip : 'PMSS의 프로그램 목록 중 UT 대상(UI, JO)',
				    dataIndex: 'utTarget',
				    width: 80,
				    align:'center',
		            summaryType : 'sum',
		            summaryRenderer : function(value, meta, record, rowIndex) {
		            	return '<span style="cursor:pointer;cursor:hand;" onclick="ColumnAction._summaryView(\'utTarget\');">' + value + '</span>';
		            },
		            renderer : function(value) {
		            	return '<span style="cursor:pointer;cursor:hand;">' + value + '</span>';
		            }
				},
				{ 
				    header: 'UT완료',
				    dataIndex: 'utComplete',
				    width: 80,
				    align:'center',
		            summaryType : 'sum',
		            summaryRenderer : function(value, meta, record, rowIndex) {
		            	return '<span style="cursor:pointer;cursor:hand;" onclick="ColumnAction._summaryView(\'utComplete\');">' + value + '</span>';
		            },
		            renderer : function(value) {
		            	return '<span style="cursor:pointer;cursor:hand;">' + value + '</span>';
		            }
				},
				{ 
				    header: 'UT진행',
				    dataIndex: 'utTesting',
				    width: 80,
				    align:'center',
		            summaryType : 'sum',
		            summaryRenderer : function(value, meta, record, rowIndex) {
		            	return '<span style="cursor:pointer;cursor:hand;" onclick="ColumnAction._summaryView(\'utTesting\');">' + value + '</span>';
		            },
		            renderer : function(value) {
		            	return '<span style="cursor:pointer;cursor:hand;">' + value + '</span>';
		            }
				},
				{ 
				    header: 'UT누락',
				    tooltip : 'PMSS의 프로그램 목록 중 단위테스트케이스로 만들어지지 않은 파일',
				    dataIndex: 'utNotest',
				    width: 80,
				    align:'center',
		            summaryType : 'sum',
		            summaryRenderer : function(value, meta, record, rowIndex) {
		            	meta.tdCls = 'grid-important';
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '" onclick="ColumnAction._summaryView(\'utNotest\');">' + value + '</span>';
		            },
		            renderer : function(value, meta) {
		            	meta.tdCls = 'grid-important';
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
		            }
				}
        	]
        },
        {
        	header : 'SIT 관련',
        	columns : [
				{ 
				    header: 'SIT대상',
				    tooltip : 'PMSS의 프로그램 목록 중 SIT 대상(UI, JO)',
				    dataIndex: 'sitTarget',
				    width: 80,
				    align:'center',
				    summaryType : 'sum',
				    summaryRenderer : function(value, meta, record, rowIndex) {
					return '<span style="cursor:pointer;cursor:hand;" onclick="ColumnAction._summaryView(\'sitTarget\');">' + value + '</span>';
				    },
				    renderer : function(value) {
					return '<span style="cursor:pointer;cursor:hand;">' + value + '</span>';
				    }
				},
				{ 
				    header: 'SIT완료',
				    dataIndex: 'sitComplete',
				    width: 80,
				    align:'center',
		            summaryType : 'sum',
		            summaryRenderer : function(value, meta, record, rowIndex) {
		            	return '<span style="cursor:pointer;cursor:hand;" onclick="ColumnAction._summaryView(\'sitComplete\');">' + value + '</span>';
		            },
		            renderer : function(value) {
		            	return '<span style="cursor:pointer;cursor:hand;">' + value + '</span>';
		            }
				},
				{ 
				    header: 'SIT진행',
				    dataIndex: 'sitTesting',
				    width: 80,
				    align:'center',
		            summaryType : 'sum',
		            summaryRenderer : function(value, meta, record, rowIndex) {
		            	return '<span style="cursor:pointer;cursor:hand;" onclick="ColumnAction._summaryView(\'sitTesting\');">' + value + '</span>';
		            },
		            renderer : function(value) {
		            	return '<span style="cursor:pointer;cursor:hand;">' + value + '</span>';
		            }
				},
				{ 
				    header: 'SIT누락',
				    tooltip : 'PMSS의 프로그램 목록 중 SIT테스트케이스로 만들어지지 않은 파일',
				    dataIndex: 'sitNotest',
				    width: 80,
				    align:'center',
		            summaryType : 'sum',
		            summaryRenderer : function(value, meta, record, rowIndex) {
		            	meta.tdCls = 'grid-important';
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '" onclick="ColumnAction._summaryView(\'sitNotest\');">' + value + '</span>';
		            },
		            renderer : function(value, meta) {
		            	meta.tdCls = 'grid-important';
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
		            }
				}
        	]
        },
        {
        	header : '커버리지 관련',
        	columns : [
				{ 
				    header: 'Run대상',
				    tooltip : 'CoreBiz 영역 중 코드 커버리지 대상(SO,JO,BOC,BO)',
				    dataIndex: 'runTarget',
				    width: 80,
				    align:'center',
				    summaryType : 'sum',
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	return '<span style="cursor:pointer;cursor:hand;" onclick="ColumnAction._summaryView(\'runTarget\');">' + value + '</span>';
				    },
				    renderer : function(value) {
				    	return '<span style="cursor:pointer;cursor:hand;">' + value + '</span>';
				    }
				},
				{ 
				    header: 'Run미수행',
				    tooltip : '코드 커버리지 대상 클래스 중 비지니스 메소드가  호출되지 않은 건 - UT',
				    dataIndex: 'notRun',
				    width: 80,
				    align:'center',
				    summaryType : 'sum',
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	meta.tdCls = 'grid-important';
				    	var temp  = value >= 0 ? 'black' : 'red';
				    	var temp2 = value == 0 ? 'normal' : 'bold';
				    	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '" onclick="ColumnAction._summaryView(\'notRun\');">' + value + '</span>';
				    },
				    renderer : function(value, meta) {
				    	meta.tdCls = 'grid-important';
				    	var temp  = value >= 0 ? 'black' : 'red';
				    	var temp2 = value == 0 ? 'normal' : 'bold';
				    	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
				    }
				},
				{ 
				    header: '대상 MTHD',
				    dataIndex: 'avgTotalFunction',
				    tooltip : '코드 커버리지 대상 클래스의 모든 메소드<br>(메소드 수 합계/클래스당 평균 메소드 수)',
				    width: 90,
				    align:'center',
				    summaryType : function(records) {
				    	var result = 0;
				    	var count = 0;
				    	var total = 0;
				    	Ext.each(records, function(record, index) {
							result +=  record.get('avgTotalFunction');
							count++;
							total += record.get('totalFunction');
				    	});
				    	return total + " ("+ (count == 0 ? 0 : (result/count).toFixed(2)) + ")";
				    },
				    renderer : function(value, meta, record, rowIndex) {
				    	var result = record.get('totalFunction') + ' (' + value + ')';
				    	return '<span style="cursor:pointer;cursor:hand;">' + result + '</span>';
				    }
				},
				{ 
				    header: '실행 MTHD',
				    dataIndex: 'avgRunFunction',
				    tooltip : '코드 커버리지 대상 클래스의 실행된 메소드<br>(메소드 수 합계/클래스당 실행된 평균 메소드 수)',
				    width: 90,
				    align:'center',
				    summaryType : function(records) {
				    	var result = 0;
				    	var count = 0;
				    	var total = 0;
				    	Ext.each(records, function(record, index) {
							result +=  record.get('avgRunFunction');
							count++;
							total += record.get('runFunction');
				    	});
				    	return total + " ("+ (count == 0 ? 0 : (result/count).toFixed(2)) + ")";
				    },
				    renderer : function(value, meta, record, rowIndex) {
				    	var result = record.get('runFunction') + ' (' + value + ')';
				    	return '<span style="cursor:pointer;cursor:hand;">' + result + '</span>';
				    }
				},
				{ 
				    header: 'UT-Cvrg 65%↓',
				    dataIndex: 'utCoverage',
				    tooltip : '코드 커버리지 대상 클래스 커버리지 율이 65%미만-UT',
				    width: 100,
				    align:'center',
		            summaryType : 'sum',
		            summaryRenderer : function(value, meta, record, rowIndex) {
		            	meta.tdCls = 'grid-important';
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '" onclick="ColumnAction._summaryView(\'utCoverage\');">' + value + '</span>';
		            },
		            renderer : function(value, meta) {
		            	meta.tdCls = 'grid-important';
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
		            }
				},
				{ 
				    header: 'SIT-Cvrg 65%↓',
				    dataIndex: 'underSitCoverage',
				    tooltip : '코드 커버리지 대상 클래스 커버리지 율이 65%미만-SIT',
				    width: 100,
				    align:'center',
		            summaryType : 'sum',
		            summaryRenderer : function(value, meta, record, rowIndex) {
		            	meta.tdCls = 'grid-important';
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '" onclick="ColumnAction._summaryView(\'utCoverage\');">' + value + '</span>';
		            },
		            renderer : function(value, meta) {
		            	meta.tdCls = 'grid-important';
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
		            }
				},
				{ 
				    header: 'UT-평균Cvrg',
				    dataIndex: 'avgCoverage',
				    tooltip : '코드 커버리지 대상 클래스의 UT 평균 커버리지',
				    width: 110,
				    align:'center',
		            summaryType : 'average',
		            renderer : function(value, meta) {
		            	meta.tdCls = 'grid-important';
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
		            }
				},
				{ 
				    header: 'SIT-평균Cvrg',
				    dataIndex: 'sitAvgCoverage',
				    tooltip : '코드 커버리지 대상 클래스의 SIT 평균 커버리지',
				    width: 110,
				    align:'center',
		            summaryType : 'average',
		            renderer : function(value, meta) {
		            	meta.tdCls = 'grid-important';
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
		            }
				}
        	]
        }
        ];
        
        
        this.tbar = [
        ];
        
        this.callParent(arguments);
    },
    listeners : {
    	resize : function (self, width, height) {
    	},
    	click : {
    		element : 'body',
    		delegate : '.x-grid-row-summary',
    		fun : function(e, target) {
    		}
    	}
    }
});
var ColumnAction = {
	_summaryView : function(column) {
		_team = null;
		_module = null;
		_func = null;
		_programType = null;
		_developer = null;
		_searchType = column;
		var grid = Ext.getCmp('org-grid');
		var sm = grid.getSelectionModel();
		var rec = sm.getSelection()[0];
		if (rec) {
			_team = rec.data.originalOrgName;
		}
		var win = Ext.getCmp('program-info');
		if (win == null) {
			win = Ext.create('Ext.window.Window', {
				id : 'program-info',
	    	    title: '프로그램 정보',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
	    	    closeAction : 'hide',
	    	    layout: 'fit',
	    	    modal: true,
	    	    animateTarget:this,
	    	    padding : 10,
	    	    width : '85%',
	    	    height : 800,
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
        	    		proxy.extraParams.page = 1;
        	    		store.load();
        	    	}
	    	    }
			});
		}
		win.show();
	}
}