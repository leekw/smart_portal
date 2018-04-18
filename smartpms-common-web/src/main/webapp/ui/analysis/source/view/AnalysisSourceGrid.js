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
        }, {
            header: '서비스',
            dataIndex: 'service'
        },{
            header: '모듈',
            dataIndex: 'module'
        },{
            header: '요청자',
            dataIndex: 'reqUser'
        },
		{
			header: '등록일자',
            width: 150,
			dataIndex: 'uploadDate',
            allowBlank: false
		},
        { 
            header: '소스파일',
            width: 200,
            dataIndex: 'analysisJavaOriName'
        },
        { 
            header: '바이너리파일',
            width: 200,
            dataIndex: 'analysisClassOriName'
        },
		{
			header: '진단여부',
			dataIndex: 'analysisYn'
		},
		{
			header: '진단 일자',
			dataIndex: 'analysisDate'
		},
        {
            header: 'PMD',
            dataIndex: 'pmd'
        },
        {
            header: 'FORTIFY',
            dataIndex: 'fortify'
        },
        {
            header: 'ETC',
            dataIndex: 'etc'
        },
        ];

        this.bbar = this.paging= Ext.create('Ext.toolbar.Paging',
            {
                store : this.store,
                displayInfo: true
            });

        this.tbar = [


            {
                xtype: 'textfield',
                width: '20%',
                id : 'javaFileName',
                fieldLabel: '소스파일'


            },
			{
                xtype: 'textfield',
                width: '20%',
                id : 'classFileName',
                fieldLabel: '바이너리파일'


            },
			{
               text: '조회',
                  ui : 'gray',
                  handler : function() {
               	    var grid = Ext.getCmp('analysis-source-list');
                  		var store = grid.getStore();
                  		var proxy = store.getProxy();
                  		var javaFileName = Ext.getCmp('javaFileName').getValue();
                		var classFileName = Ext.getCmp('classFileName').getValue();
                   		// if (javaFileName == ""  && classFileName == "") {
                		// 	Ext.Msg.alert('Info', '조회 기준을 하나이상 입력해 주세요.');
                		// 	return;
                		// }

                  		proxy.extraParams.analysisJavaOriName = javaFileName;
                  		proxy.extraParams.analysisClassOriName = classFileName;
                   		store.load();
                  }
            },{
                text: '진단파일 등록',
                ui : 'soft-blue',
                handler : function() {
                     FileUpload.openUploadFile();
                }
            },{
                text: 'parser',
                ui : 'soft-blue',
                handler : function() {

                    Ext.Ajax.request({
                        url: G_PATH + '/analysis/result/parse',
                        method : 'GET',
                        headers : {'Content-Type' : 'application/json'},
                         success: function(res, eOtps) {

                        },
                        failure: function(res, eOtps) {
                         }

                    });

                }
            },{
                text: 'run3',
                ui : 'soft-blue',
                handler : function() {


                    var url = G_PATH + '/analysis/file/send/scalpel/send.json';
                    var option = "left=100,top=100,width='100%',height='100%',fullscreen=yes,location=no,titlebar=no,scrollbars=yes";
                     var popup = window.open(url, '분석이', option);
                    popup.focus();

                   /* Ext.Ajax.request({
                        url: G_PATH + '/analysis/run.json',
                        method : 'GET',
                        headers : {'Content-Type' : 'application/json'},
                       // params : (Ext.JSON.encode({analysisFileNo : 26})),
                        success: function(res, eOtps) {

                        },
                        failure: function(res, eOtps) {
                        }

                    });*/

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

    	},

        cellclick :function(grid,td,cellIndex,record,tr,rowIndex,e,eOpts){

    	    var fileNo = record.data.analysisFileNo;
            document.location.href = G_PATH + '/analysis/sourceResultApp/view.do?fileNo='+fileNo;
        }

    }
});






var FileUpload = {
    callTarget :'',
    openUploadFile : function() {
        var win = Ext.getCmp('file-upload-info');
        if (win == null) {
            win = Ext.create('Ext.window.Window', {
                id : 'file-upload-info',
                title: '진단대상 업로드',
                autoShow : true,
                maximizable : true,
                 width: 600,
                floating : true,
                layout: 'fit',
                animateTarget:this,
                modal :true,
                items : [{
                    xtype : 'form',
                    maxHeight : 600,
                    bodyPadding: 10,
                    border: false,
                    items :[
                        {
                        xtype:'panel',
                        anchor: '100%',
                        align:'left',
                        border: false,
                        buttonAlign :'right',
                        items :[{
                            xtype:'fieldcontainer',
                            fieldLabel :'요청타입',
                            defaultType:'radiofield',
                            defaults:{flex:1
                            },
                            layout: 'hbox',
                            items: [{
                                boxLabel: '파일등록' ,
                                name: 'saveReq',
                                id:'radio1',
                                inputValue:'FILE',
                                checked :true
                            }, {
                                boxLabel: 'Git' ,
                                name: 'saveReq',
                                id:'radio2',
                                inputValue:'GIT'
                            }, {
                                boxLabel: 'Subversion' ,
                                name: 'saveReq',
                                id:'radio3',
                                inputValue:'SVN'
                            }]
                        }]},
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id : 'reqService' ,
                            fieldLabel: '서비스',
                            value:'Google'
                        },{
                            xtype: 'textfield',
                            anchor: '100%',
                            id : 'reqModule' ,
                            fieldLabel: '모듈',
                            value:'AI-TF'
                        },{
                            xtype: 'datefield',
                            anchor: '100%',
                            id : 'reqDate' ,
                            format:'Y/m/d',
                            fieldLabel: '요청일자',
                            value:new Date()
                        },{
                            xtype: 'textfield',
                            anchor: '100%',
                            id : 'reqUser' ,
                            fieldLabel: '요청자',
                            value:'이경욱'
                        },
                        {

                            xtype : 'filefield',
                            name  : 'fileupload',
                            id : 'java-file-upload',
                            fileInputEl : {
                                multiple: 'multiple'
                            },
                            fieldLabel:'소스파일',
                            anchor: '100%',
                            buttonText : 'search',
                            listeners: {
                                afterrender : function(object) {
                                    object.fileInputEl.set({multiple: 'multiple'});
                                },

                            }
                         },
                        {

                                xtype : 'filefield',
                                name: 'fileupload',
                                id : 'class-file-upload',
                                fileInputEl : {
                                    multiple: 'multiple'
                                },
                                anchor: '100%',
                                fieldLabel:'바이너리파일',
                                buttonText : 'search',
                                listeners: {
                                    afterrender : function(object) {
                                        object.fileInputEl.set({multiple: 'multiple'});
                                    },
                                    change : function(object, value, eOpts) {

                                    }
                                }
                         },
                        {
                            xtype: 'checkboxgroup',
                            anchor: '100%',
                            id :'tool-check-box',
                            fieldLabel :'진단요청툴',
                            vertical: true,
                            items:[
                                {boxLabel:'PMD',    name:'tool',inputValue:'PMD',   checked:true},
                                {boxLabel:'fortify',name:'tool',inputValue:'FORTIFY'},
                                {boxLabel:'etc',    name:'tool',inputValue:'ETC'}
                            ]
                        },{
                            buttonAlign:'right',
                            buttons:[
                                {
                                        xtype:'button',
                                        text:'등록',
                                        handler : function() {
                                            var frm = this.up("form").getForm();
                                            if (frm.isValid()) {
                                                frm.submit({
                                                    url : G_PATH + '/permit/res/source/file/upload.file',

                                                    success : function(ft, res) {
                                                        var jsonResult = Ext.JSON.decode(res.response.responseText);

                                                        var checkBox = Ext.getCmp('tool-check-box');
                                                        var checked = checkBox.getChecked();

                                                        checked.forEach(function(checek,i){
                                                            if(checek.inputValue== 'PMD'){
                                                                fileInfo.pmd ='Y'
                                                            }else if(checek.inputValue== 'FORTIFY'){
                                                                fileInfo.fortify ='Y'
                                                            }else if(checek.inputValue== 'ETC'){
                                                                fileInfo.etc ='Y'
                                                            }
                                                        });


                                                        fileInfo.javaPath = jsonResult.success[0].filePath;
                                                        fileInfo.javaFileName = jsonResult.success[0].filePysName;


                                                        fileInfo.classPath = jsonResult.success[1].filePath;
                                                        fileInfo.classFileName = jsonResult.success[1].filePysName;




                                                        var javaFileName = jsonResult.success[0].fileName;

                                                        var classFileName = jsonResult.success[1].fileName;
                                                         var reqDate = Ext.Date.format(Ext.getCmp('reqDate').getValue(),"Y-m-d H:i:sO");
                                                        var reqService = Ext.getCmp('reqService').getValue();
                                                        var reqModule = Ext.getCmp('reqModule').getValue();
                                                        var reqUser = Ext.getCmp('reqUser').getValue();


                                                        SourceHandler.saveSource(javaFileName,classFileName,reqService,reqModule,reqDate,reqUser);

                                                        Ext.Msg.alert('Complete', '등록 완료되었습니다.');

                                                        var win = Ext.getCmp('file-upload-info');
                                                        win.close();

                                                    },
                                                    failure: function(ft, res){
                                                        Ext.Msg.alert('Exception', result.error.message);
                                                    }
                                                });

                                            }

                                                   }
                                    },{
                                        xtype:'button',
                                        text:'취소',
                                        handler : function() {
                                            var win = Ext.getCmp('file-upload-info');
                                            win.close();
                                        }
                                }
                            ]
                        }
                    ]
                }],
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
    saveSource: function (_javaFileName, _classFileName,_service,_module,_reqDate,_reqUser) {
        var param = {
                     analysisJavaFileName  : fileInfo.javaFileName,
                     analysisClassFileName : fileInfo.classFileName,
                     analysisJavaOriName   : _javaFileName,
                     analysisClassOriName  : _classFileName,
                     analysisJavaFilePath  : fileInfo.javaPath,
                     analysisClassFilePath : fileInfo.classPath,
                     etc: fileInfo.etc,
                     service : _service,
                     module : _module,
                     pmd : fileInfo.pmd,
                     fortify : fileInfo.fortify,
                     reqDate : _reqDate,
                     reqUser : _reqUser
             };
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
	classFileName : '',
    pmd :'N',
    fortify:'N',
    etc:'N',
}

