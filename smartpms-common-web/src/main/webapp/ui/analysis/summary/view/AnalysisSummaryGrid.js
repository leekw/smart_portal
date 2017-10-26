var _data;
var stsCombo = CommonCode._getCodeStore('STATUS');
Ext.define('Ui.analysis.summary.view.AnalysisSummaryGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.analysissummarygrid',    
    title: '진단결과 요약',
    background: 'none',
    layout: 'fit',
    minHeight : 600,
    maxHeight : 700,
    columnLines : true,
    initComponent: function() {
    
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            pluginId: 'rowEditing',
            listeners : {
            	beforeedit : function( editor, e, eOpts ) {
            		
            	},
            	canceledit : function( editor, context, eOpts ) {
            		
            	},
            	edit : function(editor, e) {
            		
            		if (e.record.data.veeringCheck1 == "N/A" && e.record.data.veeringCheck2 != "N/A" ) {
            			Ext.Msg.alert('Info', '이행점검1이 시작되지 않은 상태에서 이행점검2 상태변경을 할 수 없습니다.');
            			return;
            		}
            		if ((e.record.data.veeringCheck1 != "COMPLETED" 
            			|| e.record.data.veeringCheck2 != "COMPLETED") && e.record.data.finalStatus == "COMPLETED" ) {
            			Ext.Msg.alert('Info', '이행점검이 완료되지 않은 상태에서 최종상태를 완료할 수 없습니다.');
            			return;
            		}
          
            		var param = {
            			serviceName : e.record.data.serviceName,
            			repoName : e.record.data.repoName,
            			analysisDateByString : e.record.data.analysisDateByString,
            			orderNo : e.record.data.orderNo,
            			veeringCheck1 : e.record.data.veeringCheck1,
            			veeringCheck2 : e.record.data.veeringCheck2,
            			finalStatus : e.record.data.finalStatus
            		};
            		var url = G_PATH + '/analysis/summary/save.json';
					Ext.Ajax.request({
			    	    url: url,
			    	    method: 'POST',
			    	    jsonData: Ext.encode(param),
			    	    success: function(response){
			    	    	var grid = Ext.getCmp('analysis-summary-list');
		           			var store = grid.getStore();
		           			store.load();
			    	    },
			    	    failure: function(){
			    	    	Ext.Msg.alert('Error', '저장 중 오류가 발생되었습니다.');
			    	    }
			    	});
            	}
            }
        });
    	
        this.store = 'AnalysisSummary';
        
        this.plugins = [rowEditing];
        
        this.features = [{
        	ftype: 'groupingsummary',
        	id : 'group',
        	groupHeaderTpl: '{name}',
        	hideGroupHeader: true,
        	enbaleGroupingMenu: false
        }];
       
        this.columns = [
        { 
            header: '서비스',
            dataIndex: 'serviceName'
        },
        { 
            header: 'Repo명',
            dataIndex: 'repoName'
        },
        { 
            header: '날짜',
            align:'center',
            dataIndex: 'analysisDateByString'
        },
        { 
            header: '차수',
            width:50,
            align:'center',
            dataIndex: 'orderNo'
        },
        { 
            header: '담당부서',
            align:'center',
            dataIndex: 'team',
            renderer : function(value,  meta, record) {
            	return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;color:black;font-weight:bold">' + value + '</span>';
            }
        },
        { 
            header: '담당자',
            align:'center',
            dataIndex: 'manager',
            renderer : function(value,  meta, record) {
            	return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;color:black;font-weight:bold">' + value + '</span>';
            }
        },
        { 
            header: '조치대상 취약점',
            columns : [
            	{ 
		            header: 'C',
		            width:35,
		            align:'center',
		            dataIndex: 'criticalCount'
		        },
		        { 
		            header: 'H',
		            width:35,
		            align:'center',
		            dataIndex: 'highCount'
		        },
		        { 
		            header: 'M',
		            width:35,
		            align:'center',
		            dataIndex: 'majorCount'
		        },
		        { 
		            header: 'L',
		            width:35,
		            align:'center',
		            dataIndex: 'lowCount'
		        }
            ]
        },
        { 
            header: '조치상태',
            align:'center',
            dataIndex: 'measureStatus'
        },
        { 
            header: '이행점검',
            align:'center',
            columns : [
            	{ 
		            header: '1차',
		            align:'center',
		            dataIndex: 'veeringCheck1',
		            editor: {
		            	xtype: 'combobox',
		            	displayField : 'commonCodeName',
		            	valueField : 'commonCode',
		            	forceSelection : true,
		            	store : stsCombo,
				        allowBlank: false
				    },
				    renderer : function(value) {
			        	var index = stsCombo.findExact('commonCode', value);
			        	if ( index != -1) {
			        		var rs = stsCombo.getAt(index).data;
			        		return rs.commonCodeName;
			        	}
			        }
		        },
		        { 
		            header: '2차',
		            align:'center',
		            dataIndex: 'veeringCheck2',
		            editor: {
		            	xtype: 'combobox',
		            	displayField : 'commonCodeName',
		            	valueField : 'commonCode',
		            	forceSelection : true,
		            	store : stsCombo,
				        allowBlank: false
				    },
				    renderer : function(value) {
			        	var index = stsCombo.findExact('commonCode', value);
			        	if ( index != -1) {
			        		var rs = stsCombo.getAt(index).data;
			        		return rs.commonCodeName;
			        	}
			        }
		        }
            ]
        },
        { 
            header: '최종상태',
            align:'center',
            dataIndex: 'finalStatus',
            editor: {
            	xtype: 'combobox',
            	displayField : 'commonCodeName',
            	valueField : 'commonCode',
            	forceSelection : true,
            	store : stsCombo,
		        allowBlank: false
		    },
		    renderer : function(value) {
	        	var index = stsCombo.findExact('commonCode', value);
	        	if ( index != -1) {
	        		var rs = stsCombo.getAt(index).data;
	        		return rs.commonCodeName;
	        	}
	        }
        }
        
        ];
        
        this.tbar = [
        	{
			    name: 'area',
			    xtype: CommonCode._getCombo('AREA', '영역', false, 'area-param', {labelWidth:80, labelAlign : 'right', width: '25%'}),
			    allowBlank: false
			},
			{
	        	   text: '조회',
	               ui : 'gray',
	               handler : function() {
	            	    var grid = Ext.getCmp('analysis-summary-list');
		           		var store = grid.getStore();
		           		var proxy = store.getProxy();
		           		proxy.extraParams.area = Ext.getCmp('area-param').getValue();
		           		store.load();
		           }
		    }
        ];
        
        this.callParent(arguments);
    },
    tools:[{
        xtype: 'tool',                                    
        cls: 'x-fa fa-refresh dashboard-tools',
        tooltip: '조회',
        width: 20,
        height: 20,
        handler : function() {
        }
    }
    ],
    listeners : {
    	afterrender : function(panel) {
    	},
    	beforerender : function(panel) {
    		
    	}
    }
});