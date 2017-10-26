var _data;
Ext.define('Ui.analysis.raw.view.AnalysisRawGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.analysisrawgrid',    
    title: '소스진단 R/D',
    background: 'none',
    layout: 'fit',
    minHeight : 600,
    maxHeight : 700,
    columnLines : true,
    initComponent: function() {
    	
        this.store = 'AnalysisRaw';
        
        this.selModel = {
        };
       
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
            header: 'CWE#',
            dataIndex: 'cwe'
        },
        { 
            header: 'Security 룰',
            dataIndex: 'securityRule'
        },
        { 
            header: '영향도',
            dataIndex: 'severity'
        },
        { 
            header: 'Full Location',
            dataIndex: 'fullLocation'
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
            header: 'Result Message',
            dataIndex: 'resultMessage',
            flex:1
        }
        
        ];
        
        this.tbar = [
        	{
			    name: 'area',
			    xtype: CommonCode._getCombo('AREA', '영역', false, 'area-param', {labelWidth:80, labelAlign : 'right', width: '25%'}),
			    allowBlank: false
			},
			{
			    name: 'tool',
			    xtype: CommonCode._getCombo('TOOL', '점검Tool', false, 'tool-param', {labelWidth:80, labelAlign : 'right', width: '25%'}),
			    allowBlank: false
			},
			{
			    name: 'orderNo',
			    xtype: CommonCode._getCombo('ORDERNO', '차수', false, 'orderNo-param', {labelWidth:80, labelAlign : 'right', width: '25%'}),
			    allowBlank: false
			},
			{
	        	   text: '조회',
	               ui : 'gray',
	               handler : function() {
	            	    var grid = Ext.getCmp('analysis-raw-list');
		           		var store = grid.getStore();
		           		var proxy = store.getProxy();
		           		var area = Ext.getCmp('area-param').getValue();
			    		var tool = Ext.getCmp('tool-param').getValue();
			    		var orderNo = Ext.getCmp('orderNo-param').getValue();
		           		if (area == null) {
			    			Ext.Msg.alert('Info', '영역을 선택해야 합니다.');
			    			return;
			    		}
			    		if (tool == null) {
			    			Ext.Msg.alert('Info', 'Tool을 선택해야 합니다.');
			    			return;
			    		}
			    		if (tool == null) {
			    			Ext.Msg.alert('Info', 'Tool을 선택해야 합니다.');
			    			return;
			    		}
		           		proxy.extraParams.area = area;
		           		proxy.extraParams.tool = tool;
		           		proxy.extraParams.orderNo = orderNo;
		           		store.load();
		           }
		    },
		    {
	        	   text: '엑셀 Import',
	               ui : 'soft-blue',
	               handler : function() {
	                    var area = Ext.getCmp('area-param').getValue();
			    		var tool = Ext.getCmp('tool-param').getValue();
			    		if (area == null) {
			    			Ext.Msg.alert('Info', '영역을 선택해야 합니다.');
			    			return;
			    		}
			    		if (tool == null) {
			    			Ext.Msg.alert('Info', 'Tool을 선택해야 합니다.');
			    			return;
			    		}
	               		FileUpload.openUploadFile();
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
         	var grid = Ext.getCmp('analysis-raw-list');
       		var store = grid.getStore();
       		var proxy = store.getProxy();
       		proxy.extraParams.area = Ext.getCmp('area-param').getValue();
       		proxy.extraParams.tool = Ext.getCmp('tool-param').getValue();
       		proxy.extraParams.orderNo = Ext.getCmp('orderNo-param').getValue();
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
var FileUpload = {
	openUploadFile : function() {
		var win = Ext.getCmp('upload-info');
		if (win == null) {
			win = Ext.create('Ext.window.Window', {
				id : 'upload-info',
	    	    title: '엑셀 업로드',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
	    	    closeAction : 'hide',
	    	    height: 200,
	    	    width: 400,
	    	    layout: 'fit',
	    	    animateTarget:this,
	    	    items : [{
	    	    	xtype : 'form',
	    			labelWidth: 80,
	    			labelAlign: 'right',
	    			margin: '10 10 10 10',
	    			maxHeight : 60,
	    			bodyPadding: 10,
	    			items :[
	    			{
	    				xtype : 'filefield',
	    			    name: 'fileupload',
	    			    id : 'file-upload',
	    			    fileInputEl : {
	    			    	multiple: 'multiple'
	    			    },
	    			    anchor: '80%',
	    			    buttonText : 'Search',
	    			    listeners: {
	    			    	afterrender : function(object) {
	    			    		object.fileInputEl.set({multiple: 'multiple'});
	    			    	},
	    			    	change : function(object, value, eOpts) {
	    			    		var frm = object.up("form").getForm();
	    			    		if (frm.isValid()) {
	    			    			frm.submit({
	    			    				url : G_PATH + '/permit/res/excel/upload.file',
	    			    				success : function(ft, res) {
	    			    					var jsonResult = Ext.JSON.decode(res.response.responseText);
	    			    					var path = jsonResult.success[0].filePath;
	    			    					FileUpload.parseExcel(path);
	    			    				},
	    			    				failure: function(ft, res){
	    			    					Ext.Msg.alert('Exception', result.error.message);
	    			    				}
	    			    			});
	    			    			
	    			    		}
	    			    	}
	    			    }
	    			}]
	    	    }
	    	    ],
				listeners : {
					beforeshow : function() {
						
					}
				}
	    	});
		}
		win.show();
	},
	parseExcel : function(filePath) {
		Ext.getBody().mask("Processing...");
		var area = Ext.getCmp('area-param').getValue();
		var tool = Ext.getCmp('tool-param').getValue();
    	Ext.Ajax.request({
    	    url: G_PATH + '/analysis/excel/parse.json',
    	    method: 'POST',
    	    jsonData: Ext.encode({filePath:filePath, area:area, tool:tool}),
    	    success: function(response){
    	    	Ext.Msg.alert('Complete', '엑셀 업로드 완료되었습니다.');
    	    	Ext.getBody().unmask();
    	    	Ext.getCmp('upload-info').close();
    	    	var grid = Ext.getCmp('analysis-raw-list');
    	    	var store = grid.getStore(); 
            	var proxy = store.getProxy();
            	proxy.extraParams.area = area;
            	proxy.extraParams.tool = tool;
            	store.load();
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', '엑셀 업로드 중 오류가 발생되었습니다.');
    	    	Ext.getBody().unmask();
    	    	Ext.getCmp('upload-info').close();
    	    }
    	});
	}
}