Ext.define('Ui.analysis.result.controller.AnalysisResult', {
    extend: 'Ext.app.Controller',
    stores: ['AnalysisResult'],
    models: ['AnalysisResult'],

    views: ['AnalysisResultGrid','AnalysisResultPanel'],

    refs: [{
        ref: 'analysisResultGrid',
        selector: 'analysisresultgrid'
    }],
    
    init: function() {

        this.control({
            'analysisresultgrid': {
            	cellclick : this.openAttchFile
            }
        });
        
    },
    openAttchFile : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var grid = this.getAnalysisResultGrid();
    	if (grid.columns[cellIndex].dataIndex == 'attachFileUrl') {
    		if (record.data.targetYn == 'Y') {
    			var gridData = record.data;
    			var win = Ext.getCmp('upload-info');
				if (win == null) {
					win = Ext.create('Ext.window.Window', {
						id : 'upload-info',
			    	    title: '파일 첨부',
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
			    			    buttonText : '찾아보기',
			    			    listeners: {
			    			    	afterrender : function(object) {
			    			    		object.fileInputEl.set({multiple: 'multiple'});
			    			    	},
			    			    	change : function(object, value, eOpts) {
			    			    		var frm = object.up("form").getForm();
			    			    		if (frm.isValid()) {
			    			    			frm.submit({
			    			    				url : G_PATH + '/permit/res/file/upload.file',
			    			    				success : function(ft, res) {
			    			    					var jsonResult = Ext.JSON.decode(res.response.responseText);
			    			    					var path = jsonResult.success[0].filePath;
			    			    					var fileName = jsonResult.success[0].fileName;
			    			    					AnalysisResult.updateAttachFile(gridData, path, fileName);
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
    		}
    	} else if (grid.columns[cellIndex].dataIndex == 'attachFileName') {
    		var iframe = document.getElementById("file-down-iframe");
        	iframe.src = G_PATH + '/permit/res/file/download.do?fileName=' + encodeURIComponent(record.data.attachFileName) + '&filePath=' + encodeURIComponent(record.data.attachFileUrl);
    	}
    }
});
var AnalysisResult = {
	updateAttachFile : function(gridData, filePath, fileName) {
		Ext.getBody().mask("Processing...");
		var param = {
			analysisResultId : gridData.analysisResultId,
			targetYn : gridData.targetYn,
			status : gridData.status,
			remark : gridData.remark,
			refKey : gridData.refKey,
			attachFileUrl : filePath,
			attachFileName : fileName
		};
    	Ext.Ajax.request({
    	    url: G_PATH + '/analysis/result/save.json',
    	    method: 'POST',
    	    jsonData: Ext.encode(param),
    	    success: function(response){
    	    	Ext.Msg.alert('Complete', '첨부파일 저장이 완료되었습니다.');
    	    	Ext.getBody().unmask();
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
    	    	Ext.getCmp('upload-info').close();
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', '첨부파일 저장 중 오류가 발생되었습니다.');
    	    	Ext.getBody().unmask();
    	    	Ext.getCmp('upload-info').close();
    	    }
    	});
	}
}