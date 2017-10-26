var _modules = null;
var grid = null;
Ext.define('Ext.qainterfacesys.view.QaInterfaceSummaryGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.qainterfacesummarygrid',
    autoScroll: true,
    background: 'none',
    border: false,
//    id : 'qainterface-summary-grid',
    minHeight : 830,
    maxHeight : 830,
    stateful : true,
    collapsible : true,
    columnLines : true,
    viewConfig : {
    	enableTextSelection : true
    },
    initComponent: function() {

        this.store = 'QaInterfaceSummary';
        
        this.plugins = [];
        
        this.selModel = {
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
		    header: '기준 팀/모듈',
		    dataIndex: 'ownTeam',
		    width: 150,
		    flex:1,
		    align:'center',
		    summaryType : function(records) {
		    	return '전체';
		    },
		    summaryRenderer : function(value, meta, record, rowIndex) {
		    	return '전체';
		    },
		    renderer : function(value,  meta, record) {
		    	return value;
		    }
		},
		{ 
		    header: 'Source System',
		    dataIndex: 'sourceModule',
		    width: 150,
		    align:'center',
		    summaryType : function(records) {
		    	return '전체';
		    },
		    summaryRenderer : function(value, meta, record, rowIndex) {
		    	return '전체';
		    },
		    renderer : function(value,  meta, record) {
		    	return value;
		    }
		},
		{ 
		    header: 'Tatrget System',
		    dataIndex: 'targetModule',
		    width: 150,
		    align:'center',
            renderer : function(value, meta, record, rowIndex) {
            	return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;">' + value  + '</span>';
            },
            summaryType : function(records) {
            	return '<span style="color:black;font-weight:bold">전체</span>';
            },
            summaryRenderer : function(value, meta, record, rowIndex) {
            	return '전체';
            }
		},
		{
			header : '연동 정보',
			columns : [
				{ 
				    header: '연동방식',
				    width: 120,
				    align:'center',
				    dataIndex: 'linkType',
				    summaryType : function(records) {
		            	return '-';
		            },
		            summaryRenderer : function(value, meta, record, rowIndex) {
		            	return '-';
		            }
				},
				{ 
				    header: '건수',
				    dataIndex: 'sourceClassTotal',
				    width: 100,
				    align:'center',
				    summaryType : 'sum',
				    summaryRenderer : function(value, meta, record, rowIndex) {
				    	var team = rowIndex.record.get('team');
		            	return '<span style="color:blue;font-weight:bold"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._summaryView(\'pgComplete1\',\''+ team + '\');">' + value + '</span></span>';
		            },
				    renderer : function(value,  meta, record) {
				    	return '<span style="color:black;font-weight:bold">' + value + '</span>';
				    }
				},
				{ 
				    header: '실행율(%)',
				    width: 100,
				    align:'center',
				    dataIndex : 'sourceRunRatio',
		//		    summaryType : 'average',
				    summaryType : function(records) {
				    	var result = 0;
				    	var count = 0;
				    	var total = 0;
				    	Ext.each(records, function(record, index) {
							result +=  record.get('sourceMethodTotal');
							count++;
							total += record.get('sourceRunYn');
				    	});
				    	return total + " ("+ (count == 0 ? 0 : (total/result*100).toFixed(2)) + ")";
				    },
				    summaryRenderer : function(value, meta, record, rowIndex) {
		            	return '<span style="color:blue;font-weight:bold">' + value + '</span>';
		            },
				    renderer : function(value,  meta, record) {
				    	return '<span style="color:black;font-weight:bold">' + record.get('sourceRunYn') + '</span>' + ' (' + value + ')' ;
				    }
				}
			]
		}
		
//		{ 
//		    header: '품질상태',
//		    width: 120,
//		    align:'center',
//		    dataIndex: 'verifyScore',
//		    renderer : function(value,  meta, record) {
//		    	var result1 = record.get('sourceRunRatio');
//		    	var result2 = record.get('targetRunRatio');
//		    	var color= null;
//		    	if (result1 >= 95 && result2 >= 95) {
//		    		color = '#4caf50';
//		    	} else if (result1 >= 50 && result2 >= 50) {
//		    		color = '#ffc107';
//		    	} else {
//		    		color = '#e91e63';
//		    	}
//		    	return '<i class="x-fa fa-circle" style="color:' + color +'"></i>';
//		    },
//		    summaryType : function(records) {
//            	return '-';
//            },
//            summaryRenderer : function(value, meta, record, rowIndex) {
//            	return '-';
//            }
//		},
		
        ];
        
        grid = this;
        
        this.tbar = [
             {
	          	xtype : 'label',
	          	width : '100%',
	          	hieght : 10,
	          	html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;인터페이스 현황 -' + DateUtil._formatDateNormal(new Date()) + '기준 </span></div>'
	          		  + '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._loadInit()"><i class="x-fa fa-refresh" style="padding-left:5px;"></i></span></div>'
	          		  + '</div>'
	         }
        ];
        
        this.callParent(arguments);
        
//        this.getView().on('refresh', this.updateRowSpan, this);
    },
    listeners : {
    	resize : function (self, width, height) {
    	}
    }
});
var GridAction = {
	_loadInit : function() {
		var store = grid.getStore();
		store.load();
	}	
}
