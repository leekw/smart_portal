Ext.define('Ext.changerequest.view.ChangeRequestGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.changerequestgrid',    
    background: 'none',
    id: 'changerequest-grid',
    layout: 'fit',
    minHeight : 600,
    initComponent: function() {
    	
    	
        this.store = 'ChangeRequest';
        
        this.selModel = {
            selType: 'checkboxmodel'
        };
        
        this.plugins = [
        ];
       
        this.columns = [
		{ 
		    header: '<span class="x-fa fa-check-circle"></span>',
		    align: 'center',
		    dataIndex: 'checkinYn',
		    width: 60,
		    renderer : function(v, meta, rec) {
            	if (v == 'N') {
            		meta.tdCls = 'grid-delay';
            	}
            	
            	return v;
            }
		},
        { 
            header: 'Repository',
            dataIndex: 'repository',
            width: 290
        }, { 
        	header: '전체 경로',
            dataIndex: 'fullpath',
            flex:1
        }, { 
        	header: '파일명',
            width: 250,
            dataIndex: 'filename'
        }, { 
            header: '실행자',
            align:'center',
            dataIndex: 'commitAuthor',
            width: 100
        }, { 
            header: '체크인 일시',
            align:'center',
            dataIndex: 'commitDate',
            width: 150
        }, { 
            header: 'JIRA ID',
            align:'center',
            dataIndex: 'jiraId',
            width: 150,
            renderer: function(value) {
                return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;">' + value + '</span>';
            }
        }
        
        ];
        
        this.bbar = this.paging= Ext.create('Ext.toolbar.Paging',
		{
			store : this.store,
			displayInfo: true
		});
        
        this.tbar = [
			{
				   xtype : 'repositorycombobox',
				   id : 'repository-param',
				   name : 'repository',
				   labelWidth : 70,
				   fieldLabel : 'Repository'
			},
			{
				   xtype : 'textfield',
				   name : 'filename',
				   id : 'filename-param',
				   labelWidth : 50,
				   width: 250,
				   fieldLabel : '파일 명'
			},
           {
        	   xtype : 'checkbox',
        	   id : 'filterUser-param',
        	   name : 'filterUser',
        	   labelWidth : 150,
        	   width:200,
        	   fieldLabel : '내가 체크인 시도 한 파일',
        	   value : true
           },{
        	   text: '조회',
               ui : 'gray',
               handler : function() {
            	    var grid = Ext.getCmp('changerequest-grid');
	               	var store = grid.getStore();
	               	var proxy = store.getProxy();
	               	var repository = Ext.getCmp('repository-param');
	               	var filename = Ext.getCmp('filename-param');
	               	var filterUser = Ext.getCmp('filterUser-param');
	               	if (repository.getValue() != null && repository.getValue() != '') {
	               		proxy.extraParams.repository = repository.getValue();
	               	} else {
	               		proxy.extraParams.repository = null;
	               	}
	               	if (filename.getValue() != null && filename.getValue() != '') {
	               		proxy.extraParams.filename = filename.getValue();
	               	} else {
	               		proxy.extraParams.filename = null;
	               	}
	               	store.currentPage = 1;
	               	proxy.extraParams.filterUser = filterUser.getValue();
	               	store.load();
               }
           }
        ];
        
        this.callParent(arguments);
    },
    tools:[{
        xtype: 'tool',                                    
        cls: 'x-fa fa-wrench dashboard-tools',
        tooltip: 'Program 목록 임시 반영 요청',
        width: 20,
        height: 20,
        handler : function() {
        	var grid = Ext.getCmp('changerequest-grid');
        	var store = grid.getStore();
        	var sm = grid.getSelectionModel();
        	var rec = sm.getSelection();
        	if (rec.length < 1) {
        		Ext.Msg.alert('Info', '임시 등록할 프로그램 목록을 선택하십시오.');
        		return ;
        	}
        	Ext.MessageBox.confirm('Confirm', '선택한 파일을 임시 등록 요청 하시겠습니까?', GridAction._regRequest);
        	
        }
    },{
        xtype: 'tool',                                    
        cls: 'x-fa fa-refresh dashboard-tools',
        tooltip: '새로고침',
        width: 20,
        height: 20,
        handler : function() {
        	var grid = Ext.getCmp('changerequest-grid');
        	var store = grid.getStore();
        	store.load();
        }
    }
    ],
    listeners : {
    	resize : function (self, width, height) {
    		this.setMaxHeight(Ext.getCmp('changerequest-panel').getHeight()-10);
    	},
    	viewready : function(grid) {
	    	var map  = new Ext.KeyMap(grid.getEl(), [
	    	   {
	    	    key: 'c',
	    		ctrl : true,
	    		fn : function(keyCode, e){
	    			var recs = grid.getSelectionModel().getSelection();
	    			if ( recs && recs.length != 0) {
	    				var clipText = grid.getCsvDataFromRecs(recs);
	    				var ta = document.createElement('textarea');
	    				ta.id = 'cliparea';
	    				ta.style.position = 'absolute';
	    				ta.style.left = '-1000px';
	    				ta.style.top = '-1000px';
	    				ta.value = clipText;
	    				
	    				document.body.appendChild(ta);
	    				document.designMode = 'off';
	    				
	    				ta.focus();
	    				ta.select();
	    				
	    				setTimeout(function(){
	    					document.body.removeChild(ta);
	    				}, 100);
	    				
	    			}
	    		}
	    	}]
	    	);
	     }
    },
    getCsvDataFromRecs : function(records) {
    	var clipText = '';
    	var store = Ext.getCmp('changerequest-grid').getStore();
    	var curRow = store.find('repository', records[0].data.repository);
    	for (var i=0;i < records.length;i++) {
    		var index = store.find('repository', records[i].data.repository);
    		var r = index;
    		var rec = records[i];
    		var cv = this.columns;
    		for (var j=0;j < cv.length;j++) {
    			var val = rec.data[cv[j].dataIndex];
    			if (typeof val == "undefined") continue;
    			if (r === curRow) {
    				clipText = clipText.concat(val, "\t");
    			} else {
    				curRow = r;
    				clipText = clipText.concat("\n", val, "\t");
    			}
    		}
    	}
    	return clipText;
    }
});    
var GridAction = {
	_regRequest : function(btn) {
		if (btn == 'yes') {
			var win = Ext.getCmp('proc-info');
			if (win == null) {
				win = Ext.create('Ext.window.Window', {
					id : 'proc-info',
		    	    title: '프로그램 임시 등록 요청',
		    	    resizable : true,
		    	    autoScroll: true,
		    	    maximizable : true,
		    	    closeAction : 'hide',
		    	    layout: 'fit',
		    	    modal: true,
		    	    animateTarget:this,
		    	    padding : 10,
		    	    border:false,
		    	    items : [
		    	        {
		    	        	xtype:'form',
		    	        	border:false,
		    	        	items :[
		    	        	   {
		    	        		   xtype:'changerequestjiracombobox',
		    	        		   labelWidth : 100,
		    	        		   width:550,
		    	        		   id : 'jira-combo',
		    					   fieldLabel : 'WBS-CR JIRA',
		    					   border:false
		    	        	   },{
		    	        		   xtype:'panel',
		    	        		   pdding:10,
		    	        		   border:false,
		    	        		   height: 50,
		    	        		   html: '<center><div><b>PMSS에 프로그램 목록으로 등록되지 않은 파일이라 WBS-CR JIRA를 선택하여 임시 등록요청 해야 합니다.<br>WBS-CR JIRA를 정확히 선택하십시오.(WBS-CR JIRA를 잘못 선택할 경우 소명이 필요합니다.)</b></div></center>'
		    	        	   }
		    	        	],
		    	        	buttons: [
		    	        	    {
							        text:'요청',
							        ui : 'gray',
							        handler : function() {
							        	var jira = Ext.getCmp('jira-combo');
							        	if (jira.getValue() == null || jira.getValue() == '') {
							        		Ext.Msg.alert('Info', 'WBS-CR JIRA를  선택해야 합니다.');
							        		return false;
							        	} else {
							        		if (!jira.getValue().startsWith("PMONBSS-")) {
							        			Ext.Msg.alert('Info', 'WBS-CR JIRA를 Combo Box에서 정확히 선택해야 합니다.');
								        		return false;
							        		} else {
									        	var grid = Ext.getCmp('changerequest-grid');
									        	var store = grid.getStore();
									        	var url = "/int/changerequest/file/modify.json";
									        	var sm = grid.getSelectionModel();
									        	var rec = sm.getSelection();
									        	var params = [];
									        	for (var i=0;i< rec.length;i++) {
									        		var r = rec[i].getData();
									        		params.push({repository:r.repository, fullpath:r.fullpath, jiraId: jira.getValue()});
									        	}
									        	Ext.Ajax.request({
									        	    url: url,
									        	    method: 'POST',
									        	    jsonData: Ext.encode(params),
									        	    success: function(response){
									        	    	win.close();
									        	    	Ext.Msg.alert('Complete', '프로그램 임시 등록요청이 완료되었습니다.<br>해당 파일에 대해서 체크인 가능합니다.');
									        	    	store.load();
									        	    },
									        	    failure: function(){
									        	    	Ext.Msg.alert('Error', '프로그램 임시 등록요청 중 오류가 발생되었습니다.');
									        	    }
									        	});
							        		}
							        	}
							        }
							    },{
							        text:'취소',
							        ui : 'gray',
							        handler : function() {
							        	win.close();
							        }
							    }
		    	        	]
		    	        }
		    	    ]
				});
			}
			win.show();
		}
	}
}