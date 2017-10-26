var DateUtil = {
	_getWeekOfMonth : function(index) {
		var date = DateUtil._getWeek(index);
		var yearMonth =  (date.getMonth() + 1).toString() + "월";
		var day = date.getDate();
		day-=(date.getDay()==0?6:date.getDay()-1);
		
		day+=7;
		
		prefiexs = ['0','1','2','3','4','5'];
		return yearMonth + (parseInt(prefiexs[0 | (day) / 7]) + 1) + "주";
	},
	_getWeek : function(index) {
		var now = new Date();
		var temp = new Date(now.getFullYear(), now.getMonth(), 1);
		var monthFirst = new Date();
		monthFirst.setDate(temp.getDate() - temp.getDay() + (7 * (index - 1)));
		return monthFirst;
	}	
};
Ext.define('Ext.programvf.view.VolumeGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.volumegrid',
    autoScroll: true,
    background: 'none',         
    border: false,
    id : 'volume-grid',
    minHeight : 800,
    maxHeight : 800,
    columnLines : true,
    initComponent: function() {

        this.store = 'Volume';
        
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
            dataIndex: 'type',
            locked : true,
            width: 100,
            align:'center',
            summaryType : function(records) {
            	return '합계';
            },
            summaryRenderer : function(value, meta, record, rowIndex) {
            	return value == '합계' ? '합계' : record.get('developer');
            }
        },{ 
            header: '최근 3개월전',
            dataIndex: 'oldMonth3',
            width: 100,
            align:'center',
            summaryType : 'sum'
        },{ 
            header: '최근 2개월전',
            dataIndex: 'oldMonth2',
            width: 100,
            align:'center',
            summaryType : 'sum'
        },{ 
            header: '최근 1개월전',
            dataIndex: 'oldMonth1',
            width: 100,
            align:'center',
            summaryType : 'sum'
        },{ 
            header: DateUtil._getWeekOfMonth(1),
            dataIndex: 'curWeek1',
            width: 100,
            align:'center',
            summaryType : 'sum',
            renderer : function(value) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            },
            summaryRenderer : function(value, summaryData, dataIndex) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            }
        },{ 
            header: DateUtil._getWeekOfMonth(2),
            dataIndex: 'curWeek2',
            width: 100,
            align:'center',
            summaryType : 'sum',
            renderer : function(value) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            },
            summaryRenderer : function(value, summaryData, dataIndex) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            }
        },{ 
            header: DateUtil._getWeekOfMonth(3),
            dataIndex: 'curWeek3',
            width: 100,
            align:'center',
            summaryType : 'sum',
            renderer : function(value) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            },
            summaryRenderer : function(value, summaryData, dataIndex) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            }
        },{ 
            header: DateUtil._getWeekOfMonth(4),
            dataIndex: 'curWeek4',
            width: 100,
            align:'center',
            summaryType : 'sum',
            renderer : function(value) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            },
            summaryRenderer : function(value, summaryData, dataIndex) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            }
        },{ 
            header: DateUtil._getWeekOfMonth(5),
            dataIndex: 'curWeek5',
            width: 100,
            align:'center',
            summaryType : 'sum',
            renderer : function(value) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            },
            summaryRenderer : function(value, summaryData, dataIndex) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            }
        },{ 
            header: DateUtil._getWeekOfMonth(6),
            dataIndex: 'curWeek6',
            width: 100,
            align:'center',
            summaryType : 'sum',
            renderer : function(value) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            },
            summaryRenderer : function(value, summaryData, dataIndex) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            }
        },{ 
            header: DateUtil._getWeekOfMonth(7),
            dataIndex: 'curWeek7',
            width: 100,
            align:'center',
            summaryType : 'sum',
            renderer : function(value) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            },
            summaryRenderer : function(value, summaryData, dataIndex) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            }
        },{ 
            header: DateUtil._getWeekOfMonth(8),
            dataIndex: 'curWeek8',
            width: 100,
            align:'center',
            summaryType : 'sum',
            renderer : function(value) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            },
            summaryRenderer : function(value, summaryData, dataIndex) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            }
        },{ 
            header: DateUtil._getWeekOfMonth(9),
            dataIndex: 'curWeek9',
            width: 100,
            align:'center',
            summaryType : 'sum',
            renderer : function(value) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            },
            summaryRenderer : function(value, summaryData, dataIndex) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            }
        },{ 
            header: DateUtil._getWeekOfMonth(10),
            dataIndex: 'curWeek10',
            width: 100,
            align:'center',
            summaryType : 'sum',
            renderer : function(value) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            },
            summaryRenderer : function(value, summaryData, dataIndex) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            }
        }
        
        
        ];
        
        
        this.tbar = [
             {
             	xtype : 'label',
             	width : '100%',
             	html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;개발자별 물량 현황</span></div>'
             		  + '</div>'
              }
        ];
        
        this.callParent(arguments);
    },
    listeners : {
    	resize : function (self, width, height) {
    	},
    	afterrender : function(vgrid) {
    		var grid = Ext.getCmp('cr-grid');
  		    var sm = grid.getSelectionModel();
  	        var rec = sm.getSelection();
  	        var data = new Array();
    	    if (!rec || rec == "") {
    	    	Ext.Msg.alert('Info', 'WBS-CR을 선택해야 합니다.');
    	    	return ;
    	    }
    	    
    	    for (var i=0;i < rec.length;i++) {
    	    	data.push(rec[i].data.jiraId);
    	    }
    	    
    	    alert("aaa");
			var vstore = vgrid.getStore();
           	var vproxy = vstore.getProxy();
           	vproxy.extraParams.jiraList = data;
           	vstore.load();
    	}
    }
});
