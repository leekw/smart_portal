var tgtCombo = CommonCode._getCodeStore('TARGETYN');
var stsCombo = CommonCode._getCodeStore('STATUS');
Ext.define('Ui.analysis.result.view.AnalysisResultGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.analysisresultgrid',    
    title: '상세 진단 결과',
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
            		if (e.record.data.targetYn == "") {
            			Ext.Msg.alert('Info', '대상여부를 선택해 주십시오.');
            			return;
            		}
            		if (e.record.data.status == "") {
            			Ext.Msg.alert('Info', '상태를 선택해 주십시오.');
            			return;
            		}
            		var param = {
            			analysisResultId : e.record.data.analysisResultId,
            			targetYn : e.record.data.targetYn,
            			status : e.record.data.status,
            			remark : e.record.data.remark,
            			refKey : e.record.data.refKey
            		};
            		var url = G_PATH + '/analysis/result/save.json';
					Ext.Ajax.request({
			    	    url: url,
			    	    method: 'POST',
			    	    jsonData: Ext.encode(param),
			    	    success: function(response){
			    	    	var grid = Ext.getCmp('analysis-result-list');
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
    	
        this.store = 'AnalysisResult';
        
        this.plugins = [rowEditing];
       
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'No',
			width: 60,
			align :'center'
		}),
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
            dataIndex: 'analysisDateByString'
        },
        { 
            header: '차수',
            dataIndex: 'orderNo'
        },
        { 
            header: 'CWE#',
            dataIndex: 'cwe'
        },
        { 
            header: '취약점명',
            dataIndex: 'securityRule',
            flex:1
        },
        { 
            header: '영향도',
            dataIndex: 'severity'
        },
        { 
            header: 'File명',
            dataIndex: 'file'
        },
        { 
            header: 'Line',
            dataIndex: 'source'
        },
        { 
            header: '대상',
            dataIndex: 'targetYn',
            align: 'center',
            editor: {
            	xtype: 'combobox',
            	displayField : 'commonCodeName',
            	valueField : 'commonCode',
            	forceSelection : true,
            	store : tgtCombo,
		        allowBlank: false
		    },
		    renderer : function(value) {
	        	var index = tgtCombo.findExact('commonCode', value);
	        	if ( index != -1) {
	        		var rs = tgtCombo.getAt(index).data;
	        		return rs.commonCodeName;
	        	}
	        	return null;
	        }
        },
        { 
            header: '비고',
            dataIndex: 'remark',
            editor: {
		        allowBlank: true
		    }
        },
        { 
            header: 'file',
            dataIndex: 'attachFileUrl',
            align: 'center',
            renderer: function(value, meta, record) {
            	if (record.get('targetYn') != 'Y') {
            		return  '-';
            	}
                return '<span class="x-fa '+ (value ? 'fa-file' : 'fa-file-o') +'"></span>';
            }
        },
        { 
            header: '<span class="x-fa fa-download"></span>',
            dataIndex: 'attachFileName',
            width:35,
            align: 'center',
            renderer: function(value, meta, record) {
            	if (record.get('targetYn') != 'Y') {
            		return  '-';
            	}
                return '<span class="x-fa '+ (value ? 'fa-download' : '') +'"></span>';
            }
        },
        { 
            header: '상태',
            dataIndex: 'status',
            align: 'center',
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
            header: 'jira#',
            dataIndex: 'refKey',
            align: 'center',
            editor: {
		        allowBlank: true
		    }
        },
        { 
            header: 'Tool',
            align: 'center',
            dataIndex: 'tool'
        }
        
        ];
        
        this.tbar = [
        	{
			    name: 'service',
			    xtype: CommonCode._getCombo('SERVICE', '서비스', false, 'svr-param', {labelWidth:40, labelAlign : 'right', width: '15%'}),
			    allowBlank: false
			},
			{
			    name: 'repository',
			    xtype: CommonCode._getCombo('REPO', 'REPO', false, 'rep-param', {labelWidth:40, labelAlign : 'right', width: '15%'}),
			    allowBlank: false
			},
			{
			    name: 'analysisDay',
			    xtype: CommonCode._getCombo('DAY', '날짜', false, 'day-param', {labelWidth:40, labelAlign : 'right', width: '15%'}),
			    allowBlank: false
			},
			{
			    name: 'severity',
			    xtype: CommonCode._getCombo('SEVERITY', '영향도', false, 'svt-param', {labelWidth:40, labelAlign : 'right', width: '15%'}),
			    allowBlank: false
			},
			{
			    name: 'targetyn-sr',
			    xtype: CommonCode._getCombo('TARGETYN', '대상', false, 'tgt-param', {labelWidth:40, labelAlign : 'right', width: '10%'}),
			    allowBlank: false
			},
			{
			    name: 'status-sr',
			    xtype: CommonCode._getCombo('STATUS', '상태', false, 'status-param', {labelWidth:40, labelAlign : 'right', width: '10%'}),
			    allowBlank: false
			},
			{
			    name: 'tool',
			    xtype: CommonCode._getCombo('TOOL', 'Tool', false, 'tool-param', {labelWidth:40, labelAlign : 'right', width: '15%'}),
			    allowBlank: false
			},
			{
	        	   text: '조회',
	               ui : 'gray',
	               handler : function() {
	            	    var grid = Ext.getCmp('analysis-result-list');
		           		var store = grid.getStore();
		           		var proxy = store.getProxy();
		           		if (Ext.getCmp('svr-param').rawValue != "") {
		           			proxy.extraParams.serviceName = Ext.getCmp('svr-param').rawValue;
		           		}
		           		if (Ext.getCmp('rep-param').rawValue != "") {
		           			proxy.extraParams.repoName = Ext.getCmp('rep-param').rawValue;
		           		}
		           		if (Ext.getCmp('day-param').getValue() != "") {
		           			proxy.extraParams.analysisDateByString = Ext.getCmp('day-param').getValue();
		           		}
		           		if (Ext.getCmp('svt-param').getValue() != "") {
		           			proxy.extraParams.severity = Ext.getCmp('svt-param').getValue();
		           		}
		           		if (Ext.getCmp('tool-param').getValue() != "") {
		           			proxy.extraParams.tool = Ext.getCmp('tool-param').getValue();
		           		}
		           		store.load();
		           }
		    }
        ];
        
        this.callParent(arguments);
    },
    tools:[{
        xtype: 'tool',                                    
        cls: 'x-fa fa-refresh dashboard-tools',
        tooltip: '새로고침',
        width: 20,
        height: 20,
        handler : function() {
        	var grid = Ext.getCmp('analysis-result-list');
       		var store = grid.getStore();
       		var proxy = store.getProxy();
   			proxy.extraParams.serviceName = null;
   			proxy.extraParams.repoName = null;
   			proxy.extraParams.analysisDateByString = null;
   			proxy.extraParams.severity = null;
   			proxy.extraParams.tool = null;
       		store.load();
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