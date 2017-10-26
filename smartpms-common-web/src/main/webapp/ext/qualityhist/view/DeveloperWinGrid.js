Ext.define('Ext.qualityhist.view.DeveloperWinGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.developerwingrid',
    autoScroll: true,
    background: 'none',
    border: false,
    id : 'developer-win-grid',
    minHeight : 650,
    maxHeight : 650,
    columnLines : true,
    initComponent: function() {

        this.store = 'DeveloperWin';
        
        this.plugins = ['gridfilters'];
        
        this.features = [{
        	ftype: 'groupingsummary',
        	id : 'group',
        	groupHeaderTpl: '{name}',
        	hideGroupHeader: true,
        	enbaleGroupingMenu: false
        }];
        
        this.columns = [
        { 
            header: '개발 유형',
            dataIndex: 'programType',
            width: 170,
            align:'center',
            summaryType : function(records) {
            	return '합계';
            },
            summaryRenderer : function(value, meta, record, rowIndex) {
            	return value == '합계' ? '합계' : record.get('developer');
            },
            filter: {
            	type: 'list'
            }
        },
        {
        	header : '진척현황',
        	columns : [
				{ 
				    header: '전체',
				    dataIndex: 'pgTotal',
				    width: 70,
				    align:'center',
		            summaryType : 'sum',
		            renderer : function(value) {
		            	var temp  = value >= 0 ? 'black' : 'black';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
		            }
				},{ 
				    header: '완료',
				    dataIndex: 'pgComplete',
				    width: 70,
				    align:'center',
		            summaryType : 'sum',
		            renderer : function(value) {
		            	var temp  = value >= 0 ? 'black' : 'black';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
		            }
				},{ 
				    header: 'SVN미등록',
				    dataIndex: 'svnReg',
				    width: 80,
				    align:'center',
		            summaryType : function(records) {
				    	var result = 0;
				    	Ext.each(records, function(record, index) {
				    		result += record.get('pgComTarget') - record.get('svnReg') < 0 ? 0 : record.get('pgComTarget') - record.get('svnReg');
				    	});
				    	return result;
				    },
		            renderer : function(value, meta, record, rowIndex) {
		            	value = record.get('pgComTarget') - value < 0 ? 0 : record.get('pgComTarget') - value;
		            	var temp  = value >= 0 ? 'black' : 'black';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
		            }
				},{ 
				    header: '지연',
				    dataIndex: 'pgDelay',
				    width: 70,
				    align:'center',
		            summaryType : 'sum',
		            renderer : function(value, meta) {
		            	meta.tdCls = 'grid-important';
		            	var temp  = value >= 0 ? 'black' : 'black';
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
				    header: '시작일',
				    dataIndex: 'minStartDateStr',
				    tooltip : '개발자가 최초로 개발을 시작한 일자',
				    width: 100,
				    align:'center'
				},
				{ 
				    header: 'LOC',
				    dataIndex: 'loc',
				    width: 70,
				    align:'center',
		            summaryType : 'sum',
		            renderer : function(value, meta, record, rowIndex) {
		            	var result;
		            	if (record.get('programType') == 'SO'
		            		|| record.get('programType') == 'JO'
		            	    || record.get('programType') == 'BO'
		            	    || record.get('programType') == 'BOC') {
		            		result = value;
		            	} else {
		            		result = '';
		            	}
		            	var temp  = result >= 0 ? 'black' : 'black';
		            	var temp2 = result == 0 || result == '' ? 'normal' : 'bold';
		            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + result + '</span>';
		            }
				},
				{ 
				    header: '소스Size(MB)',
				    dataIndex: 'fileSize2',
				    width: 100,
				    align:'center',
		            summaryType : 'sum',
		            summaryRenderer : function(value, meta, record, rowIndex) {
		            	return value.toFixed(2);
		            },
		            renderer : function(value, meta, record, rowIndex) {
		            	var result = value;
		            	var temp  = result >= 0 ? 'black' : 'black';
		            	var temp2 = result == 0 || result == '' ? 'normal' : 'bold';
		            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + result + '</span>';
		            }
				},
				{ 
				    header: '변동 소스',
				    dataIndex: 'changeFile',
				    width: 100,
				    align:'center',
		            summaryType : 'sum',
		            summaryRenderer : function(value, meta, record, rowIndex) {
		            	return value;
		            },
		            renderer : function(value, meta, record, rowIndex) {
		            	var result = value;
		            	var temp  = result >= 0 ? 'black' : 'black';
		            	var temp2 = result == 0 || result == '' ? 'normal' : 'bold';
		            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + result + '</span>';
		            }
				},
				{ 
				    header: '10미만',
				    tooltip : 'CoreBiz의 클래스 구문 수가 10 미만인 대상',
				    dataIndex: 'underStatement',
				    width: 80,
				    align:'center',
				    summaryType : function(records) {
				    	var result = 0;
				    	Ext.each(records, function(record, index) {
				    		if (record.get('programType') == 'SO'
				        		|| record.get('programType') == 'JO'
				        	    || record.get('programType') == 'BO'
				        	    || record.get('programType') == 'BOC') {
				    			result +=  record.get('underStatement');
				    		}
				    	});
				    	return result;
				    },
				    renderer : function(value, meta, record, rowIndex) {
				    	meta.tdCls = 'grid-important';
				    	var result;
				    	if (record.get('programType') == 'SO'
				    		|| record.get('programType') == 'JO'
				    	    || record.get('programType') == 'BO'
				    	    || record.get('programType') == 'BOC') {
				    		result = value;
				    	} else {
				    		result = '';
				    	}
				    	var temp  = result >= 0 ? 'black' : 'black';
				    	var temp2 = result == 0 || result == '' ? 'normal' : 'bold';
				    	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + result + '</span>';
				    }
				},
				{ 
				    header: '호출누락',
				    dataIndex: 'unUsedSource',
				    tooltip : '호출관계가 없는 소스 - 정적분석',
				    width: 80,
				    align:'center',
		            summaryType : 'sum',
		            renderer : function(value, meta) {
		            	meta.tdCls = 'grid-important';
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
		            }
				},
				{ 
				    header: '의심소스',
				    dataIndex: 'checkTarget',
				    tooltip : '비정상적인 소스로 개발 미완성 및 표준명명규칙 위반 등의 대상 소스',
				    width: 80,
				    align:'center',
		            summaryType : 'sum',
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
		            summaryType : function(records) {
		            	var result = 0;
		            	Ext.each(records, function(record, index) {
		            		if (record.get('programType') == 'UI'
			            		|| record.get('programType') == 'JO') {
		            			result +=  record.get('utTarget');
		            		}
		            	});
		            	return result;
		            },
		            renderer : function(value, meta, record, rowIndex) {
		            	var result;
		            	if (record.get('programType') == 'UI'
		            		|| record.get('programType') == 'JO') {
		            		result = value;
		            	} else {
		            		result = '';
		            	}
		            	var temp  = result >= 0 ? 'black' : 'black';
		            	var temp2 = result == 0 || result == ''? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + result + '</span>';
		            }
				},
				{ 
				    header: 'UT누락',
				    tooltip : 'PMSS의 프로그램 목록 중 단위테스트케이스로 만들어지지 않은 파일',
				    dataIndex: 'utNotest',
				    width: 80,
				    align:'center',
		            summaryType : function(records) {
		            	var result = 0;
		            	Ext.each(records, function(record, index) {
		            		if (record.get('programType') == 'UI'
			            		|| record.get('programType') == 'JO') {
		            			result +=  record.get('utNotest');
		            		}
		            	});
		            	return result;
		            },
		            renderer : function(value, meta, record, rowIndex) {
		            	meta.tdCls = 'grid-important';
		            	var result;
		            	if (record.get('programType') == 'UI'
		            		|| record.get('programType') == 'JO') {
		            		result = value;
		            	} else {
		            		result = '';
		            	}
		            	var temp  = result >= 0 ? 'black' : 'black';
		            	var temp2 = result == 0 || result == ''? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + result + '</span>';
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
		            summaryType : function(records) {
		            	var result = 0;
		            	Ext.each(records, function(record, index) {
		            		if (record.get('programType') == 'UI'
			            		|| record.get('programType') == 'JO') {
		            			result +=  record.get('sitTarget');
		            		}
		            	});
		            	return result;
		            },
		            renderer : function(value, meta, record, rowIndex) {
		            	var result;
		            	if (record.get('programType') == 'UI'
		            		|| record.get('programType') == 'JO') {
		            		result = value;
		            	} else {
		            		result = '';
		            	}
		            	var temp  = result >= 0 ? 'black' : 'black';
		            	var temp2 = result == 0 || result == ''? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + result + '</span>';
		            }
				},
				{ 
				    header: 'SIT누락',
				    tooltip : 'PMSS의 프로그램 목록 중 SIT 테스트케이스로 만들어지지 않은 파일',
				    dataIndex: 'sitNotest',
				    width: 90,
				    align:'center',
		            summaryType : function(records) {
		            	var result = 0;
		            	Ext.each(records, function(record, index) {
		            		if (record.get('programType') == 'UI'
			            		|| record.get('programType') == 'JO') {
		            			result +=  record.get('sitNotest');
		            		}
		            	});
		            	return result;
		            },
		            renderer : function(value, meta, record, rowIndex) {
		            	meta.tdCls = 'grid-important';
		            	var result;
		            	if (record.get('programType') == 'UI'
		            		|| record.get('programType') == 'JO') {
		            		result = value;
		            	} else {
		            		result = '';
		            	}
		            	var temp  = result >= 0 ? 'black' : 'black';
		            	var temp2 = result == 0 || result == ''? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + result + '</span>';
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
				     renderer : function(value, meta, record, rowIndex) {
				    	var result;
				    	if (record.get('programType') == 'SO'
				    		|| record.get('programType') == 'JO'
				    	    || record.get('programType') == 'BO'
				    	    || record.get('programType') == 'BOC') {
				    		result = value;
				    	} else {
				    		result = '';
				    	}
				    	var temp  = result >= 0 ? 'black' : 'black';
				    	var temp2 = result == 0 || result == ''? 'normal' : 'bold';
				    	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + result + '</span>';
				    }
				},
				{ 
				    header: 'Run미수행',
				    tooltip : '코드 커버리지 대상 클래스 중 비지니스 메소드가  호출되지 않은 건',
				    dataIndex: 'notRun',
				    width: 90,
				    align:'center',
				    summaryType : 'sum',
				    renderer : function(value, meta, record, rowIndex) {
				    	meta.tdCls = 'grid-important';
				    	var result;
				    	if (record.get('programType') == 'SO'
				    		|| record.get('programType') == 'JO'
				    	    || record.get('programType') == 'BO'
				    	    || record.get('programType') == 'BOC') {
				    		result = value;
				    	} else {
				    		result = '';
				    	}
				    	var temp  = result >= 0 ? 'black' : 'black';
				    	var temp2 = result == 0 || result == ''? 'normal' : 'bold';
				    	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + result + '</span>';
				    }
				},
				{ 
					 header: '대상 MTHD',
				     dataIndex: 'avgTotalFunction',
				     tooltip : '코드 커버리지 대상 클래스의 모든 메소드<br>(메소드 수 합계/클래스당 평균 메소드 수)',
				     width: 100,
				     align:'center',
				     summaryType : function(records) {
				    	var result = 0;
				    	var count = 0;
				    	var total = 0;
				    	Ext.each(records, function(record, index) {
				    		if (record.get('programType') == 'SO'
					    		|| record.get('programType') == 'JO'
					    	    || record.get('programType') == 'BO'
					    	    || record.get('programType') == 'BOC') {
					    		result += record.get('avgTotalFunction');
					    		count++;
					    		total += record.get('totalFunction');
					    	}
				    	});
				    	return total + "("+ (count == 0 ? 0 : (result/count).toFixed(2)) + ")";
				     },
				     renderer : function(value, meta, record, rowIndex) {
				    	var result;
				    	if (record.get('programType') == 'SO'
				    		|| record.get('programType') == 'JO'
				    	    || record.get('programType') == 'BO'
				    	    || record.get('programType') == 'BOC') {
				    		result = value;
				    	} else {
				    		result = '';
				    	}
				    	result = record.get('totalFunction') + ' (' + result + ')';
				    	return '<span style="cursor:pointer;cursor:hand;">' + result + '</span>';
				    }
				},
				{ 
					 header: '실행 MTHD',
				     dataIndex: 'avgRunFunction',
				     tooltip : '코드 커버리지 대상 클래스의 실행된 메소드<br>(메소드 수 합계/클래스당 실행된 평균 메소드 수)',
				     width: 100,
				     align:'center',
				     summaryType : function(records) {
				    	var result = 0;
				    	var count = 0;
				    	var total = 0;
				    	Ext.each(records, function(record, index) {
				    		if (record.get('programType') == 'SO'
					    		|| record.get('programType') == 'JO'
					    	    || record.get('programType') == 'BO'
					    	    || record.get('programType') == 'BOC') {
					    		result += record.get('avgRunFunction');
					    		count++;
					    		total += record.get('runFunction');
					    	}
				    	});
				    	return total + "("+ (count == 0 ? 0 : (result/count).toFixed(2)) + ")";
				     },
				     renderer : function(value, meta, record, rowIndex) {
				    	var result;
				    	if (record.get('programType') == 'SO'
				    		|| record.get('programType') == 'JO'
				    	    || record.get('programType') == 'BO'
				    	    || record.get('programType') == 'BOC') {
				    		result = value;
				    	} else {
				    		result = '';
				    	}
				    	result = record.get('runFunction') + ' (' + result + ')';
				    	return '<span style="cursor:pointer;cursor:hand;">' + result + '</span>';
				    }
				},
				{ 
				    header: 'UT-Crvg65%↓',
				    tooltip : '코드 커버리지 대상 클래스 커버리지 율이 65%미만',
				    dataIndex: 'utCoverage',
				    width: 110,
				    align:'center',
		            summaryType : 'sum',
		            renderer : function(value, meta, record, rowIndex) {
		            	meta.tdCls = 'grid-important';
		            	var result;
		            	if (record.get('programType') == 'SO'
		            		|| record.get('programType') == 'JO'
		            	    || record.get('programType') == 'BO'
		            	    || record.get('programType') == 'BOC') {
		            		result = value;
		            	} else {
		            		result = '';
		            	}
		            	var temp  = result >= 0 ? 'black' : 'black';
		            	var temp2 = result == 0 || result == '' ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + result + '</span>';
		            }
				},
				{ 
				    header: 'SIT-Crvg65%↓',
				    tooltip : '코드 커버리지 대상 클래스 커버리지 율이 65%미만',
				    dataIndex: 'underSitCoverage',
				    width: 110,
				    align:'center',
		            summaryType : 'sum',
		            renderer : function(value, meta, record, rowIndex) {
		            	meta.tdCls = 'grid-important';
		            	var result;
		            	if (record.get('programType') == 'SO'
		            		|| record.get('programType') == 'JO'
		            	    || record.get('programType') == 'BO'
		            	    || record.get('programType') == 'BOC') {
		            		result = value;
		            	} else {
		            		result = '';
		            	}
		            	var temp  = result >= 0 ? 'black' : 'black';
		            	var temp2 = result == 0 || result == '' ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + result + '</span>';
		            }
				},
				{ 
				    header: 'UT-평균Cvrg',
				    dataIndex: 'avgCoverage',
				    tooltip : '코드 커버리지의 대상 클래스의 UT 환경의 평균 코드 커버리지율',
				    width: 100,
				    align:'center',
				    summaryType : function(records) {
		            	var result = 0;
		            	var count = 0;
		            	Ext.each(records, function(record, index) {
		            		if (record.get('programType') == 'SO'
			            		|| record.get('programType') == 'JO'
			            	    || record.get('programType') == 'BO'
			            	    || record.get('programType') == 'BOC') {
		            			result +=  record.get('avgCoverage');
		            			count++;
		            		}
		            	});
		            	return count == 0 ? 0 : (result/count).toFixed(2);
		            },
		            renderer : function(value, meta, record, rowIndex) {
		            	var result;
		            	if (record.get('programType') == 'SO'
		            		|| record.get('programType') == 'JO'
		            	    || record.get('programType') == 'BO'
		            	    || record.get('programType') == 'BOC') {
		            		result = value.toFixed(2);
		            	} else {
		            		result = '';
		            	}
		            	var temp  = result >= 0 ? 'black' : 'black';
		            	var temp2 = result == 0 || result == '' ? 'normal' : 'bold';
		            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + result + '</span>';
		            }
				},
				{ 
				    header: 'SIT-평균Cvrg',
				    dataIndex: 'sitAvgCoverage',
				    tooltip : '코드 커버리지의 대상 클래스의 SIT 환경의 평균 코드 커버리지율',
				    width: 100,
				    align:'center',
				    summaryType : function(records) {
		            	var result = 0;
		            	var count = 0;
		            	Ext.each(records, function(record, index) {
		            		if (record.get('programType') == 'SO'
			            		|| record.get('programType') == 'JO'
			            	    || record.get('programType') == 'BO'
			            	    || record.get('programType') == 'BOC') {
		            			result +=  record.get('sitAvgCoverage');
		            			count++;
		            		}
		            	});
		            	return count == 0 ? 0 : (result/count).toFixed(2);
		            },
		            renderer : function(value, meta, record, rowIndex) {
		            	var result;
		            	if (record.get('programType') == 'SO'
		            		|| record.get('programType') == 'JO'
		            	    || record.get('programType') == 'BO'
		            	    || record.get('programType') == 'BOC') {
		            		result = value.toFixed(2);
		            	} else {
		            		result = '';
		            	}
		            	var temp  = result >= 0 ? 'black' : 'black';
		            	var temp2 = result == 0 || result == '' ? 'normal' : 'bold';
		            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + result + '</span>';
		            }
				}
        	]
        }
        ];
        
        
        this.tbar = [
             {
             	xtype : 'label',
             	width : '100%',
             	html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;개발자별 현황</span></div>'
             		  + '</div>'
              }
        ];
        
        this.callParent(arguments);
    },
    listeners : {
    	resize : function (self, width, height) {
    	},
    	afterrender : function( grid, eOpts ) {
    		
    	},
    	beforerender: function( grid, eOpts ) {
    	}
    }
});
