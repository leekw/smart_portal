var _data;
Ext.define('Ui.analysis.source.view.AnalysisSourceGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.analysissourcegrid',
    title: '진단대상 등록',
    background: 'none',
    layout: 'fit',
    minHeight : 600,
    maxHeight : 700,
    columnLines : true,
    initComponent: function() {
    	
        this.store = 'AnalysisSource';
        
        this.selModel = {
        };
       
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'No',
			width: 60,
			align :'center'
		}),
        { 
            header: '파일 순번',
            dataIndex: 'analysisFileNo'
        },
		{
			header: '등록일자',
            width: 150,
			dataIndex: 'uploadDate'
		},
        { 
            header: '진단파일 Java',
            width: 200,
            dataIndex: 'analysisJavaOriName'
        },
        { 
            header: '진단파일 Class',
            width: 200,
            dataIndex: 'analysisClassOriName'
        },
        { 
            header: '비고',
            dataIndex: 'etc'
        },
		{
			header: '진단여부',
			dataIndex: 'analysisYn'
		},
		{
			header: '진단 일자',
			dataIndex: 'analysisDate'
		}
        
        ];

        this.bbar = this.paging= Ext.create('Ext.toolbar.Paging',
            {
                store : this.store,
                displayInfo: true
            });

        this.tbar = [

		    {
                text: '진단소스 JAVA 등록',
                ui : 'soft-blue',
                handler : function() {
                    FileUpload.callTarget ="java";
                    FileUpload.openUploadFile();
                }
            },
            {
                xtype: 'textfield',
				weight : 300,
                id : 'javaFileName'

            },
			{
                text: '진단소스 CLASS 등록',
                ui : 'soft-blue',
                handler : function() {
                    FileUpload.callTarget ="class";
                    FileUpload.openUploadFile();
                }
            },
			{
                xtype: 'textfield',
                id : 'classFileName'

            },
            {
                xtype: 'textfield',
                id : 'etc',
                fieldLabel: '비고'
            },
			{
                text: '저장',
                ui : 'soft-red',
                handler : function() {
                    SourceHandler.saveSource(Ext.getCmp('javaFileName').getValue(),Ext.getCmp('classFileName').getValue(),Ext.getCmp('etc').getValue());
                }

            },{
               text: '조회',
                  ui : 'gray',
                  handler : function() {
               	    var grid = Ext.getCmp('analysis-source-list');
                  		var store = grid.getStore();
                  		var proxy = store.getProxy();
                  		var javaFileName = Ext.getCmp('javaFileName').getValue();
                		var classFileName = Ext.getCmp('classFileName').getValue();
                		var etc = Ext.getCmp('etc').getValue();
                  		if (javaFileName == null && etc == null && classFileName == null) {
                			Ext.Msg.alert('Info', '조회 기준을 하나이상 입력해 주세요.');
                			return;
                		}

                  		proxy.extraParams.analysisJavaOriName = javaFileName;
                  		proxy.extraParams.analysisClassOriName = classFileName;
                  		proxy.extraParams.etc = etc;
                  		store.load();
                  }
            },
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
         	var grid = Ext.getCmp('analysis-source-list');
       		var store = grid.getStore();
       		var proxy = store.getProxy();

            var javaFileName = Ext.getCmp('javaFileName').getValue();
            var classFileName = Ext.getCmp('classFileName').getValue();

            proxy.extraParams.analysisJavaOriName = javaFileName;
            proxy.extraParams.analysisClassOriName = classFileName;
            proxy.extraParams.etc =  Ext.getCmp('etc').getValue();
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
	callTarget :'',
	openUploadFile : function() {
		var win = Ext.getCmp('upload-info');
		if (win == null) {
			win = Ext.create('Ext.window.Window', {
				id : 'upload-info',
	    	    title: '진단대상 업로드',
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
	    			    				url : G_PATH + '/permit/res/source/file/upload.file',
	    			    				success : function(ft, res) {
	    			    					var jsonResult = Ext.JSON.decode(res.response.responseText);

                                            var fileName = jsonResult.success[0].filePysName;
                                            var oriFileName = jsonResult.success[0].fileName;
                                            var filePath = jsonResult.success[0].filePath;

                                            Ext.Msg.alert('Complete', '업로드 완료되었습니다.');

                                            if(FileUpload.callTarget == "java"){
                                            	Ext.getCmp('javaFileName').setValue(oriFileName);
                                                Ext.getCmp('javaFileName').disable(true);
                                                fileInfo.javaPath = filePath;
                                                fileInfo.javaFileName = fileName;
                                            }
                                            if(FileUpload.callTarget == "class"){
                                                Ext.getCmp('classFileName').setValue(oriFileName);
                                                Ext.getCmp('classFileName').disable(true);
                                                fileInfo.classPath = filePath;
                                                fileInfo.classFileName = fileName;
                                            }

                                             win.close();
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

}


var SourceHandler = {
    saveSource: function (_javaFileName, _classFileName,_etc) {
        var param = {analysisJavaFileName: fileInfo.javaFileName, analysisClassFileName : fileInfo.classFileName,
			         analysisJavaOriName: _javaFileName, analysisClassOriName : _classFileName,
			         analysisJavaFilePath:fileInfo.javaPath,analysisClassFilePath :fileInfo.classPath, etc: _etc};
        var sourceGrid = Ext.getCmp('analysis-source-list');
        var url = G_PATH + '/analysis/source/save.json';
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            jsonData: Ext.encode(param),
            success: function (response) {
                var result = JSON.parse(response.responseText);
                if (result.error != null) {
                    Ext.Msg.alert('Exception', result.error.message);
                } else {
                    Ext.Msg.alert('Compete', '저장 완료되었습니다.');
                    sourceGrid.getStore().load();
                }
            },
            failure: function () {
                Ext.Msg.alert('Error', '저장중 오류가 발생되었습니다.');
            }
        });
    },
}

var fileInfo = {
    javaPath      : '',
    classPath     : '',
	javaFileName  : '',
	classFileName : ''
}

