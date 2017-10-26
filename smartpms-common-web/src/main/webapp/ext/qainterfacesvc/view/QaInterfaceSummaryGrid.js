var _modules = null;
var grid = null;
Ext.define('Ext.qainterfacesvc.view.QaInterfaceSummaryGrid' ,{
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
		    dataIndex: 'sourceModule',
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
//            ,
//            renderer : function(value, meta, record, rowIndex, colIndex, store) {
//            	valur = value == '' ? '구분없음' : value;
//            	var first = !rowIndex || value !== store.getAt(rowIndex - 1).get('sourceModule');
//            	var last = rowIndex >= store.getCount() - 1 || value !== store.getAt(rowIndex + 1).get('sourceModule');
//            	meta.css = 'grid-row-span';
//            	meta.css += 'row-span' + (first ? ' row-span-first' : '') + (last ? ' row-span-last' : '');
//            	if (first) {
//            		var i = rowIndex + 1, span = 1;
//            		while (i < store.getCount() && value === store.getAt(i).get('sourceModule')) {
//            			i++;
//            			span++;
//            		}
//            		var rowHeight = 20; padding = 6;
//            		var height = (rowHeight * (i - rowIndex) - padding) + 'px';
//            		meta.style = 'height:' + height + ':line-height:' + height + ';';
//            		meta.tdAttr = 'rowspan=' + span;
//            	} 
//            	
//            	return first ? value : '';
//            }
		},
		{ 
		    header: '품질상태',
		    width: 120,
		    align:'center',
		    dataIndex: 'verifyScore',
		    renderer : function(value,  meta, record) {
		    	var result1 = record.get('sourceRunRatio');
		    	var result2 = record.get('targetRunRatio');
		    	var color= null;
		    	if (result1 >= 95 && result2 >= 95) {
		    		color = '#4caf50';
		    	} else if (result1 >= 50 && result2 >= 50) {
		    		color = '#ffc107';
		    	} else {
		    		color = '#e91e63';
		    	}
		    	return '<i class="x-fa fa-circle" style="color:' + color +'"></i>';
		    },
		    summaryType : function(records) {
            	return '-';
            },
            summaryRenderer : function(value, meta, record, rowIndex) {
            	return '-';
            }
		},
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
			header : '연동 기준',
			columns : [
		        {
		    	    header : '연동 Program',
		    	    columns : [
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
						}
					]
			    },        	    
			    {
		    	    header : '연동 Operation',
		    	    columns : [
						{ 
						    header: '건수',
						    dataIndex: 'sourceMethodTotal',
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
//						    summaryType : 'average',
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
			 ]
		},
		{ 
		    header: '연동방향',
		    width: 120,
		    align:'center',
		    dataIndex: 'linkWay',
		    renderer : function(value, meta, record, rowIndex) {
		    	var item = value == 'source' ? 'right' : 'left';
		    	var color = value == 'source' ? 'blue' : 'red';
		    	return '<i class="x-fa fa-arrow-' + item + '" style="color:' + color +'"></i>';
            },
            summaryType : function(records) {
            	return '-';
            },
            summaryRenderer : function(value, meta, record, rowIndex) {
            	return '-';
            }
		},
		{
        	header : '연동 대상',
        	columns : [
				{ 
				    header: '대상 모듈',
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
	        	    header : '대상 Program',
	        	    columns : [
						{ 
						    header: '건수',
						    dataIndex: 'targetClassTotal',
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
						}
					]
        	    },        	    
        	    {
	        	    header : '대상 Operation',
	        	    columns : [
						{ 
						    header: '건수',
						    dataIndex: 'targetMethodTotal',
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
						    dataIndex: 'targetRunRatio',
//						    summaryType : 'average',
						    summaryType : function(records) {
						    	var result = 0;
						    	var count = 0;
						    	var total = 0;
						    	Ext.each(records, function(record, index) {
									result +=  record.get('targetMethodTotal');
									count++;
									total += record.get('targetRunYn');
						    	});
						    	return total + " ("+ (count == 0 ? 0 : (total/result*100).toFixed(2)) + ")";
						    },
						    summaryRenderer : function(value, meta, record, rowIndex) {
				            	return '<span style="color:blue;font-weight:bold">' + value + '</span>';
				            },
						    renderer : function(value,  meta, record) {
						    	return '<span style="color:black;font-weight:bold">' + record.get('targetRunYn') + '</span>' + ' (' + value + ')' ;
						    }
						}
					]
        	    }
			]
		}
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
