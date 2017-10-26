Ext.define('Ext.quality.view.QualityFunctionGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.qualityfunctiongrid',
    autoScroll: true,
    background: 'none',
    border: false,
    id : 'quality-function-grid',
    minHeight : 350,
    maxHeight : 350,
    initComponent: function() {

        this.store = 'QualityFunction';
        
        this.plugins = [];
        
        this.features = [{
        	ftype: 'groupingsummary',
        	id : 'group',
        	groupHeaderTpl: '{name}',
        	hideGroupHeader: true,
        	enbaleGroupingMenu: false
        }];
        
        this.columns = [		
//        { 
//            header: '모듈',
//            dataIndex: 'module',
//            width: 150,
//            align:'center'
//        },
        { 
            header: '기능',
            dataIndex: 'function',
            width: 150,
            flex:1,
            align:'center',
            summaryType : function(records) {
            	return '합계';
            },
            summaryRenderer : function(value, meta, record, rowIndex) {
            	return value == '합계' ? '합계' : record.get('module');
            }
        },{
        	header : '진척현황',
        	columns : [
				{ 
				    header: '전체',
				    dataIndex: 'pgTotal',
				    width: 100,
				    align:'center',
		            summaryType : 'sum'
				},{ 
				    header: '완료',
				    dataIndex: 'pgComplete',
				    width: 100,
				    align:'center',
		            summaryType : 'sum'
				},{ 
				    header: '지연',
				    dataIndex: 'pgDelay',
				    width: 100,
				    align:'center',
		            summaryType : 'sum'
				}
        	]
        },
        {
        	header : '참조정보',
        	columns : [
				{ 
				    header: '초기 개발물량',
				    dataIndex: 'initCount',
				    width: 120,
				    align:'center',
		            summaryType : 'sum'
				},
				{ 
				    header: '미사용 소스',
				    dataIndex: 'unUsedSource',
				    width: 120,
				    align:'center',
		            summaryType : 'sum'
				}
//				,{ 
//				    header: '월 평균 처리량',
//				    dataIndex: 'avgCompleteCount',
//				    width: 120,
//				    align:'center'
//				}
        	]
        },
        {
        	header : '검토 필요 대상',
        	columns : [
				{ 
				    header: 'Run 미 수행',
				    dataIndex: 'notRun',
				    width: 120,
				    align:'center',
		            summaryType : 'sum'
				},{ 
				    header: '커버리지 65%미만',
				    dataIndex: 'utCoverage',
				    width: 120,
				    align:'center',
		            summaryType : 'sum'
				}
        	]
        },
        { 
            header: '종합상태',
            dataIndex: 'totalStatus',
            width: 120,
            align:'center'
        }
        ];
        
        
        this.tbar = [
        ];
        
        this.callParent(arguments);
    },
    listeners : {
    	resize : function (self, width, height) {
    	}
    }
});
