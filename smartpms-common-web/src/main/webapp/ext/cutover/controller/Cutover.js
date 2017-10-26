Ext.Loader.loadScript({url:G_PATH + '/ext/cutover/controller/CutoverCore.js'});
Ext.define('Ext.cutover.controller.Cutover', {
    extend: 'Ext.app.Controller',
    stores: ['Cutover','UserCombo','TaskCombo'],
    models: ['Cutover', 'User','Task'],

    views: ['CutoverGrid','UserComboBox', 'TaskComboBox'],

    refs: [{
	    ref: 'cutoverGrid',
	    selector: 'cutovergrid'
	}],
    
    init: function() {

        this.control({
        	'cutovergrid' : {
        		cellclick : this.openCutoverDetail
        	},
        	'button[action=add-grid-record]' : {
        		click : this.addGridRecord
	        },
	        'button[action=remove-grid-record]' : {
        		click : this.removeGridRecord
	        },
	        'button[action=save-grid-record]' : {
        		click : this.saveGridRecord
	        },
	        'button[action=reload-grid-record]' : {
	        	click : this.reloadGridRecord
	        },
	        'button[action=copy-grid-record]' : {
	        	click : this.copyGridRecord
	        },
            'button[action=jira-grid-record]' : {
            	click : this.jiraGridRecord
            },
            'button[action=sort-grid-record]' : {
            	click : this.sortGridRecord
            },
            'button[action=timeline-view]' : {
            	click : this.viewTimeline
            },
            'button[action=download-excel]' : {
            	click : this.downloadExcel
            },
            'button[action=confirm-grid-record]' : {
            	click : this.confirmGrid
            }
        });
        
    },
    changeTaskStatus : function(btn) {
    	if (btn == "yes") {
    		var grid = Ext.getCmp('cutover-grid');
        	var store = grid.getStore();
        	var url = "/int/cutover/status/modify.json";
        	var sm = grid.getSelectionModel();
        	var rec = sm.getSelection();
        	if (rec.length < 1) {
        		Ext.Msg.alert('Info', '확정 대상 시나리오를 선택해 주십시오.');
        		return ;
        	}
        	var params = [];
        	for (var i=0;i< rec.length;i++) {
        		var r = rec[i];
        		if (r.getData().itemStatus == 'VERIFY') {
        			params.push({jobId : r.getData().jobId, itemStatus : 'CONFIRM'});
        		}
        	}
        	Ext.Ajax.request({
        	    url: url,
        	    method: 'POST',
        	    jsonData: Ext.encode(params),
        	    success: function(response){
        	    	Ext.Msg.alert('Complete', '확정처리 완료되엇습니다.');
        	    	store.load();
        	    },
        	    failure: function(){
        	    	Ext.Msg.alert('Error', '확정처리 중 오유가 발생되엇습니다.');
        	    }
        	});
    	}
    },
    confirmGrid : function() {
    	Ext.MessageBox.confirm('Confirm', '선택한 CutOver 시나리오를 확정 하시겠습니까(수정/삭제불가)?', this.changeTaskStatus);
    },
    downloadExcel : function() {
    	var th = Ext.getCmp('th-combo');
    	var step = Ext.getCmp('jobstep-combo');
    	if (th.getValue() ==null || th.getValue() == '') {
    		Ext.Msg.alert('Info', '시나리오 구분은 필수로 선택해야 합니다.');
    		return ;
    	}
    	if (step.getValue() ==null || step.getValue() == '') {
    		Ext.Msg.alert('Info', '전환단계는 필수로 선택해야 합니다.');
    		return ;
    	}
    	//Ext.getBody().mask("Processing...", 'x-mask-loading');
    	var th = Ext.getCmp('th-combo');
    	var step = Ext.getCmp('jobstep-combo');
    	var dtl = Ext.getCmp('jobstepdtl-combo');
    	var team = Ext.getCmp('team-combo');
    	var sys = Ext.getCmp('sys-combo');
    	var type = Ext.getCmp('jobtype-combo');
    	var cutoverTh = th.getValue();
    	var jobStep = step.getValue();
    	var jobType = dtl.getValue();
    	var jobExecutionTeam = team.getValue();
    	var systemType = sys.getValue();
    	var yCategory = type.getValue();
    	
//    	var iframe = document.getElementById("excel-down-iframe");
		var downUrl = G_PATH + '/cutover/excel/download.do?cutoverTh=' + cutoverTh 
												 + '&jobStep=' + jobStep
												 + '&jobType=' + jobType
												 + '&jobExecutionTeam=' + jobExecutionTeam
												 + '&systemType=' + systemType
												 + '&yCategory=' + yCategory;
    	
    	var iframe = Ext.getBody().createChild({
    		tag : 'iframe',
    		cls : 'x-hidden',
    		src : downUrl,
    		onload : 'Ext.getBody().unmask(); var t = Ext.get(this); t.remove.defer(1000, t);'
    	});
		//Ext.getBody().unmask();
    },
    viewTimeline : function() {
    	var th = Ext.getCmp('th-combo');
    	var step = Ext.getCmp('jobstep-combo');
    	var dtl = Ext.getCmp('jobstepdtl-combo');
    	if (th.getValue() ==null || th.getValue() == '') {
    		Ext.Msg.alert('Info', '시나리오 구분은 필수로 선택해야 합니다.');
    		return ;
    	}
    	if (step.getValue() ==null || step.getValue() == '') {
    		Ext.Msg.alert('Info', '전환단계는 필수로 선택해야 합니다.');
    		return ;
    	}
    	if (dtl.getValue() ==null || dtl.getValue() == '') {
    		Ext.Msg.alert('Info', '전환단계상세는 필수로 선택해야 합니다.');
    		return ;
    	}
    	var url = G_PATH + '/etc/gantt.html';
	    var option = "left=100,top=100,width='100%',height='100%',fullscreen=yes,location=no,titlebar=no,scrollbars=yes";
	    var temp = new Date();
    	var popup = window.open(url, 'Task' + temp, option);
        popup.focus();
    },
    sortTask : function(btn) {
    	if (btn == "yes") {
    		var grid = Ext.getCmp('cutover-grid');
        	var store = grid.getStore();
        	var url = "/int/cutover/sort/modify.json";
        	CutoverCore._modifySort(store, url);
    	}
    },
    sortGridRecord : function() {
    	Ext.MessageBox.confirm('Confirm', 'Task의 순서를 변경하시겠습니까?', this.sortTask);
    },
    jiraGridRecord : function() {
    	var grid = this.getCutoverGrid();
    	var store = grid.getStore();
    	var url = "/int/cutover/jira/sync.json";
    	var sm = grid.getSelectionModel();
    	var rec = sm.getSelection();
    	if (rec.length < 1) {
    		Ext.Msg.alert('Info', 'Jira 연동할 대상을 선택해 주십시오.');
    		return ;
    	}
    	var params = [];
    	for (var i=0;i< rec.length;i++) {
    		var r = rec[i];
    		params.push(r.getData());
    	}
    	Ext.Ajax.request({
    	    url: url,
    	    method: 'POST',
    	    jsonData: Ext.encode(params),
    	    success: function(response){
    	    	Ext.Msg.alert('Complete', 'Jira 연동 처리가 완료되었습니다.');
    	    	store.load();
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', 'Jira 연동처리 중 오류가 발생되었습니다.');
    	    }
    	});
    },
    copyGridRecord : function() {
    	var grid = this.getCutoverGrid();
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	var rec = sm.getSelection();
    	if (rec.length < 1) {
    		Ext.Msg.alert('Info', '복사할 대상을 선택해 주십시오.');
    		return ;
    	}
    	var data = [];
    	for (var i=0;i< rec.length;i++) {
    		var r = rec[i];
    		var neRec = Ext.create('Ext.cutover.model.Cutover', {
    			startExpectDate : r.data.startExpectDate,
    			startExpectTime : r.data.startExpectTime,
    			endExpectDate : r.data.endExpectDate,
    			endExpectTime : r.data.endExpectTime,
    			systemType : r.data.systemType,
    			jobStep : r.data.jobStep,
    			jobType : r.data.jobType,
    			xCategory : r.data.xCategory,
    			yCategory : r.data.yCategory,
    			task : r.data.task,
    			activity : r.data.activity,
    			jobExecutionTeam : r.data.jobExecutionTeam,
    			jobExecutor : r.data.jobExecutor,
    			cutoverTh : r.data.cutoverTh,
    			preJob : r.data.preJob,
    			supervisor : r.data.supervisor,
    			mode : 'I',
    			duration : r.data.duration,
    			jobCheckList : r.data.jobCheckList,
    			caution : r.data.caution,
    			jobExecutorId : r.data.jobExecutorId,
    			supervisorId : r.data.supervisorId
            });
    		store.insert((i), neRec);
    	}

    },
    reloadGridRecord : function() {
    	var grid = this.getCutoverGrid();
    	var store = grid.getStore(); 
    	var proxy = store.getProxy();
    	var th = Ext.getCmp('th-combo');
    	var step = Ext.getCmp('jobstep-combo');
    	var dtl = Ext.getCmp('jobstepdtl-combo');
    	var team = Ext.getCmp('team-combo');
    	var sys = Ext.getCmp('sys-combo');
    	var type = Ext.getCmp('jobtype-combo');
    	proxy.extraParams.cutoverTh = th.getValue();
    	proxy.extraParams.jobStep = step.getValue();
    	proxy.extraParams.jobType = dtl.getValue();
    	proxy.extraParams.teams = team.getValue();
    	proxy.extraParams.systems = sys.getValue();
    	// proxy.extraParams.jobExecutionTeam = team.getValue();
    	//	proxy.extraParams.systemType = sys.getValue();
    	proxy.extraParams.yCategory = type.getValue();
    	
    	if (th.getValue() ==null || th.getValue() == '') {
    		Ext.Msg.alert('Info', '시나리오 구분은 필수로 선택해야 합니다.');
    		return ;
    	}
    	if (step.getValue() ==null || step.getValue() == '') {
    		Ext.Msg.alert('Info', '전환단계는 필수로 선택해야 합니다.');
    		return ;
    	}
    	
    	store.load();
    },
    addGridRecord : function(){
    	var th = Ext.getCmp('th-combo');
    	var step = Ext.getCmp('jobstep-combo');
    	if (th.getValue() ==null || th.getValue() == '') {
    		Ext.Msg.alert('Info', '시나리오 구분은 필수로 선택해야 합니다.');
    		return ;
    	}
    	if (step.getValue() ==null || step.getValue() == '') {
    		Ext.Msg.alert('Info', '전환단계는 필수로 선택해야 합니다.');
    		return ;
    	}
    	var grid = this.getCutoverGrid();
    	var rowEditing = this.getCutoverGrid().getPlugin('rowEditing');
    	var store = this.getCutoverGrid().getStore();
    	rowEditing.cancelEdit();

        var r = Ext.create('Ext.cutover.model.Cutover', {
        	cutoverTh : th.getValue(),
        	jobStep : step.getValue(),
        	jobType : step.getValue() == "17331" ? "17332" : "17018"
        });

        store.insert(0, r);
        rowEditing.startEdit(0, 0);
    },
    removeGridRecord : function() {
    	var grid = this.getCutoverGrid();
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	grid.getPlugin('rowEditing').cancelEdit();
    	var selrec = sm.getSelection();
    	var isValid = true;
    	for (var i=0;i < selrec.length;i++) {
    		var r = selrec[i];
    		if (r.getData().itemStatus != 'VERIFY') {
    			isValid = false;
    			break;
    		}
    	}
    	if (!isValid) {
    		Ext.Msg.alert('Info', '선택한 시나리오 중 확정된 시나리오가 존재합니다.(확정된 시나리오는 삭제 불가)');
    		return ;
    	}
        store.remove(sm.getSelection());
        if (store.getCount() > 0) {
            sm.select(0);
        }
    },
    saveGridRecord : function() {
    	var grid = this.getCutoverGrid();
    	var store = grid.getStore();
    	var url = "/int/cutover/save.json";
    	CutoverCore._save(store, url);
    },
    openCutoverDetail : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var grid = this.getCutoverGrid();
    	_jobId = record.data.jobId;
    	if (grid.columns[cellIndex].dataIndex == 'firstDetailId') {
			var win = Ext.getCmp('task-win'); 
			if (win == null) { 
				var model = Ext.getCmp('task-model');
				if (model != null) Ext.destroy( model );
	    		model = Ext.define('cutoverDetail', {
	    			id : 'task-model',
	    		    extend: 'Ext.data.Model',
	    		    fields: ['detailId', 'detailType', 'jobId', 'detailSummary', 'worker', 'regDateStr']
	    		});
	    		var store = Ext.getCmp('task-store');
				if (store != null) Ext.destroy( store );
				store = Ext.create('Ext.data.Store', {
				    id:'task-store',
				    model : model,
				    autoDestroy: true,
				    proxy: {
				        type: 'ajax',
				        url: G_PATH + '/cutover/detail/list/get.json',
				        headers: {
				            'Content-Type': 'application/json'
				        },
				        reader: {
				            type: 'json',
				            rootProperty: 'tasks'
				        },
				        actionMethods: {
				            create : 'POST',
				            read   : 'POST',
				            update : 'POST',
				            destroy: 'POST'
				        },
				        extraParams : { maxRowSize : 0}
				    },
				    autoLoad : false
				});
				var rowEditing = Ext.getCmp('task-edit');
				if (rowEditing != null) Ext.destroy( rowEditing );
				rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
					id : 'task-edit',
		            clicksToMoveEditor: 1,
		            autoCancel: true,
		            pluginId: 'rowEditing',
		            listeners : {
		            	beforeedit : function( editor, e, eOpts ) {
		            		
		            	},
		            	edit : function(editor, e) {
		            		
		            	}
		            }
		        });
				var grid = Ext.getCmp('task-grid');
				if (grid != null) Ext.destroy( grid );
				grid = Ext.create('Ext.grid.Panel', {
					id : 'task-grid',
				    store: store,
				    minHeight : 250,
				    columns: [
						new Ext.grid.RowNumberer({
							text : 'no',
							width: 40
						}),
				        { text: '체크내용',  dataIndex: 'detailSummary', flex : 1, editor: {
					        allowBlank: false} },
				        { text: '수행자',  dataIndex: 'worker', width: 150,
				        	editor: {
				            	xtype : 'usercombobox',
						        allowBlank: false,
						        listeners : {
						        	change : function(combobox, value, oldValue) {
						        	   
						        	}
						        }
						    }
					     },
				        { text: '등록일시',  dataIndex: 'regDateStr', width: 100 }
				    ],
				    width: 250,
				    plugins : [rowEditing],
				    tbar :[{
				    	text: '추가',
			            handler : function() {
			            	var grid = Ext.getCmp('task-grid');
			            	var rowEditing = grid.getPlugin('rowEditing');
			            	var store = grid.getStore();
			            	rowEditing.cancelEdit();

			                var r = Ext.create('cutoverDetail', {
			                });

			                store.insert(0, r);
			                rowEditing.startEdit(0, 0);
			            }
			            
				    },{
				    	text: '삭제',
			            handler : function() {
			            	var grid = Ext.getCmp('task-grid');
			            	var store = grid.getStore();
			            	var sm = grid.getSelectionModel();
			            	grid.getPlugin('rowEditing').cancelEdit();
			                store.remove(sm.getSelection());
			                if (store.getCount() > 0) {
			                    sm.select(0);
			                }
			            }
				    }
				    ],
				    listeners : {
				    	selectionchange : function(model, records) {
				    		
				    	}
				    }
				});
				win = Ext.create('Ext.window.Window', {
					id : 'task-win',
		    	    title: '작업내역/체크리스트 등록',
		    	    resizable : true,
		    	    autoScroll: true,
		    	    maximizable : true,
		    	    height: '95%',
		    	    width: 830,
		    	    animateTarget:this,
		    	    closeAction : 'hide',
		    	    items : [
		    	       {
		    	    	   xtype : 'fieldset',
		    	    	   title : '작업내역',
		    	    	   defaultType : 'textfield',
		    	    	   defaults : {
		    	    		   anchor : '100%'
		    	    	   },
		    	       	   items: [{
		    	       		   allowBlank : false,
		    	       		   FieldLabel : '',
		    	       		   name : 'detailSummary',
		    	       		   id : 'detailSummary',
		    	       		   xtype:'htmleditor',
			    	       	   listeners : {
			 		            	'initialize' : function(editor) {
			 		            		editor.getEditorBody().onpaste = function(event) {
			 		            			var items = (event.clipboardData || event.originalEvent.clipboardData).items;
			 		            			for (index in items) {
			 		            				var item = items[index];
			 		            				if (item.kind == 'file') {
			 		            					var blob = item.getAsFile();
			 		            					var reader = new FileReader();
			 		            					if (blob) {
			 		            						reader.readAsDataURL(blob);
			 		            					}
			 		            					reader.addEventListener("load", function() {
			 		            						var image = '<img src="' + reader.result + '">';
			 		            				    	obj.setValue(_summary + image);
			 		            					}, false);
			 		            					
			 		            				}
			 		            			}
			 		            		}
			 		            	},
			 		            	resize : function (self, width, height) {
					            		this.setHeight(Ext.getCmp('task-win').getHeight() - 480);
					            	}
			 		            }
		    	       	   }
		    	       	   ]
		    	       },
		    	       {
	    	       		   xtype : 'fieldset',
		    	    	   title : '체크리스트',
		    	    	   defaultType : 'textfield',
		    	    	   defaults : {
		    	    		   anchor : '100%'
		    	    	   },
		    	    	   items : [grid]
	    	       	   }
		    	    ],
		    	    bbar: [{
						xtype: 'button',
						text : '저장',
						ui : 'gray',
						handler: function() {
							var param = new Array();
							var summary = Ext.getCmp('detailSummary').getValue();
							param.push({detailType : 'Work', jobId : _jobId, detailSummary : summary, worker : 'DEFAULT'});
							var store = Ext.getCmp('task-grid').getStore();
							var recs = store.getRange();
							for (var i=0;i< recs.length;i++) {
								var rec = recs[i];
								param.push({detailType : 'CheckList', jobId : _jobId, detailSummary : rec.data.detailSummary, worker : rec.data.worker});
							}
							var url = G_PATH + '/cutover/detail/save.json';
							Ext.Ajax.request({
					    	    url: url,
					    	    method: 'POST',
					    	    jsonData: Ext.encode(param),
					    	    success: function(response){
					    	    	CutoverDetail._loadData();
					    	    },
					    	    failure: function(){
					    	    	
					    	    }
					    	});
						}
					},{
						xtype: 'button',
						text : '취소',
						ui : 'gray',
						handler: function() {
							win.close();
						}
					}],
		    	    renderTo : Ext.getBody()
				});
				win.on("beforeshow", function() {
					CutoverDetail._loadData();
				}, this);
			}
			
			win.show();
    	}
    }
});
var _jobId;
var _summary;
var CutoverDetail = {
		_loadData : function() {
			var summaryObj = Ext.getCmp('detailSummary');
			_summary = summaryObj.getValue();
			var grid = Ext.getCmp('task-grid');
    		var store = grid.getStore(); 
        	var proxy = store.getProxy();
        	proxy.extraParams.jobId = _jobId;
        	proxy.extraParams.detailType = 'CheckList';
        	store.load();
			var url = G_PATH + '/cutover/detail/list/get.json';
			Ext.Ajax.request({
	    	    url: url,
	    	    method: 'POST',
	    	    jsonData: Ext.encode({jobId : _jobId , detailType : 'Work'}),
	    	    success: function(response){
	    	    	var result = JSON.parse(response.responseText);
	    	    	var temp = Ext.getCmp('detailSummary');
	    	    	if (result != null && result.tasks.length > 0) {
	    	    		temp.setValue(result.tasks[0].detailSummary);
	    	    	} else {
	    	    		temp.setValue('');
	    	    	}
	    	    },
	    	    failure: function(){
	    	    	
	    	    }
	    	});
		}
}