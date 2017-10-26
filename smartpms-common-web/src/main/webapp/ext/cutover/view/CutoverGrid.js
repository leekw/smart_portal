Ext.define('CommonCode', {
    extend: 'Ext.data.Model',
    fields: [
        'commonCode',
        'commonCodeName'
    ]
});
Ext.define('OxCombo', {
    extend: 'Ext.data.Model',
    fields: [
        'label',
        'value'
    ]
});
var CommonCode = {
    _getCodeStore : function(_type) {
    	return Ext.create('Ext.data.Store', {
			fields : ['commonCode','commonCodeName'],
			model : 'CommonCode',
			autoDestroy: true,
		    proxy: {
		        type: 'ajax',
		        url: G_PATH + '/code/list/get.json',
		        headers: {
		            'Content-Type': 'application/json'
		        },
		        reader: {
		            type: 'json',
		            rootProperty: 'codes'
		        },
		        actionMethods: {
		            create : 'POST',
		            read   : 'POST',
		            update : 'POST',
		            destroy: 'POST'
		        },
		        extraParams : { maxRowSize : 0, commonCodeType : _type}
		    },
		    autoLoad : true
		});
    },
	_getCombo : function(_type, _label, ismult, id) {
		ismult = ismult == null?false : ismult;
		var comboData = CommonCode._getCodeStore(_type);
		
		return Ext.create('Ext.form.ComboBox', {
			id : id,
			store : comboData,
			fieldLabel: _label,
			multiSelect : ismult,
			displayField : 'commonCodeName',
			valueField: 'commonCode'
		});
	},
	_getOXData : function() {
		var comboData = Ext.create('Ext.data.Store', {
			fields : ['label','value'],
			model : 'OxCombo',
			data : [
				{'label':'O', 'value':'O'},
				{'label':'X', 'value':'X'}
			],
			autoLoad : false
		});
		return comboData;
	}
};
var combo1 = CommonCode._getCodeStore('15104');
var combo2 = CommonCode._getCodeStore('15105');
var combo3 = CommonCode._getCodeStore('15106');
var combo4 = CommonCode._getCodeStore('15107');
var combo5 = CommonCode._getCodeStore('15108');
var combo6 = CommonCode._getCodeStore('15110');
var combo7 = CommonCode._getOXData();
Ext.define('Ext.cutover.view.CutoverGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.cutovergrid',
    autoScroll: true,
    multiSelect : true,
    border: false,
    id : 'cutover-grid',
    minHeight : 300,
    viewConfig : {
    	plugins : {
    		ptype : 'gridviewdragdrop',
    		enableDrop : true,
    		enableDrag : true,
    		copy : false
    	},
    	listeners: {
			beforedrop: function(node, data, overModel, dropPosition) {
				var grid = Ext.getCmp('cutover-grid');
				var store = grid.getStore(); 
		    	var proxy = store.getProxy();
		    	if (proxy.extraParams.jobExecutionTeam != null || 
		    			proxy.extraParams.systemType != null) {
		    		Ext.Msg.alert('Info', '정렬기능은 전체 데이터를 조회하여야 사용가능합니다.');
					return false;
		    	}
			},
			drop: function(node, data, overModel, dropPosition) {
				
			}
    	},
    	getRowClass : function(record, rowIndex, rowParams, store){
    		if (record.data.mode != 'R') {
    			return 'rowedit';
    		}
    		if (record.data.mode == 'R' && record.data.duration < 1) {
    			return 'rowerror';
    		}
    		if (record.data.itemStatus !== 'VERIFY') {
    			return 'rowecomfirm';
    		}
    	}
    },
    initComponent: function() {
    	
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            pluginId: 'rowEditing',
            listeners : {
            	beforeedit : function( editor, e, eOpts ) {
            		if (e.record.data.itemStatus != null &&
            				e.record.data.itemStatus != '' && e.record.data.itemStatus != 'VERIFY') {
            			if (G_IS_HADNS != 'Y' && G_IS_CT_HANDS != 'Y' && e.record.data.itemAuthor != G_LOGIN_ID) {
	            			Ext.Msg.alert('Info', 'Task가 확정되어 수정이 불가합니다.');
	            			return;
            			}
            		}
            	},
            	canceledit : function( editor, context, eOpts ) {
            		if (context.record.data.mode == null || context.record.data.mode == 'I') {
	            		var grid = Ext.getCmp('cutover-grid');
	                	var store = grid.getStore();
	                	var sm = grid.getSelectionModel();
	                	grid.getPlugin('rowEditing').cancelEdit();
	                    store.remove(context.record);
            		}
            	},
            	edit : function(editor, e) {
            		if (e.record.data.jobExecutorId == null) {
            			Ext.Msg.alert('Info', '작업실행자를 올바르게 선택해 주십시오.');
            			return;
            		}
            		if (e.record.data.supervisorId == null) {
            			Ext.Msg.alert('Info', '작업확인자를 올바르게 선택해 주십시오.');
            			return;
            		}
            		if (e.record.data.startExpectDate == null) {
            			Ext.Msg.alert('Info', '예정시작일을 올바르게 입력해 주십시오.');
            			return;
            		}
            		if (e.record.data.endExpectDate == null) {
            			Ext.Msg.alert('Info', '예정종료일을 올바르게 입력해 주십시오.');
            			return;
            		}
            		e.record.data.startExpectDate = DateUtil._formatDateNormal(e.record.data.startExpectDate);
            		e.record.data.startExpectTime = DateUtil._formatTime(e.record.data.startExpectTime);
            		e.record.data.endExpectDate = DateUtil._formatDateNormal(e.record.data.endExpectDate);
            		e.record.data.endExpectTime = DateUtil._formatTime(e.record.data.endExpectTime);
            	}
            }
        });

        this.store = 'Cutover';
        
        this.plugins = [rowEditing, 'gridfilters'];
        
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'no',
			width: 60
		}),
        { 
            header: 'JobID',
            dataIndex: 'jobId',
            width: 90
        },{ 
        	text: '<span class="x-fa fa-check-circle"></span>',
            dataIndex: 'firstDetailId',
            width: 40,
            renderer: function(value) {
                return '<span class="x-fa '+ (value ? 'fa-check-circle' : 'fa-minus-circle') +'"></span>';
            }
        },{ 
            header: '시나리오구분',
            dataIndex: 'cutoverTh',
            width: 150,
            editor: {
            	xtype: 'combobox',
            	displayField : 'commonCodeName',
            	valueField : 'commonCode',
            	forceSelection : true,
            	store : combo1,
		        allowBlank: false
		    },
		    renderer : function(value) {
	        	var index = combo1.findExact('commonCode', value);
	        	if ( index != -1) {
	        		var rs = combo1.getAt(index).data;
	        		return rs.commonCodeName;
	        	}
	        },
	        hidden : true
        },
        { 
            header: '전환단계',
            dataIndex: 'jobStep',
            width: 150,
            editor: {
            	xtype: 'combobox',
            	displayField : 'commonCodeName',
            	valueField : 'commonCode',
            	forceSelection : true,
            	store : combo2,
		        allowBlank: false
		    },
		    renderer : function(value) {
	        	var index = combo2.findExact('commonCode', value);
	        	if ( index != -1) {
	        		var rs = combo2.getAt(index).data;
	        		return rs.commonCodeName;
	        	}
	        },
	        hidden : true
        },
        { 
            header: '전환단계상세',
            dataIndex: 'jobType',
            width: 150,
            editor: {
            	xtype: 'combobox',
            	displayField : 'commonCodeName',
            	valueField : 'commonCode',
            	forceSelection : true,
            	store : combo3,
		        allowBlank: false
		    },
		    renderer : function(value) {
	        	var index = combo3.findExact('commonCode', value);
	        	if ( index != -1) {
	        		var rs = combo3.getAt(index).data;
	        		return rs.commonCodeName;
	        	}
	        },
	        hidden : true
        },
		{ 
            header: '작업단계',
            dataIndex: 'yCategory',
            width: 150,
            editor: {
            	xtype: 'combobox',
            	displayField : 'commonCodeName',
            	valueField : 'commonCode',
            	forceSelection : true,
            	store : combo4,
		        allowBlank: false
		    },
		    renderer : function(value) {
	        	var index = combo4.findExact('commonCode', value);
	        	if ( index != -1) {
	        		var rs = combo4.getAt(index).data;
	        		return rs.commonCodeName;
	        	}
	        }
        },{ 
            header: '중분류',
            dataIndex: 'xCategory',
            width: 100,
            editor: {
		        allowBlank: false
		    }
        },{ 
            header: 'Task',
            dataIndex: 'task',
            width: 200,
            editor: {
		        allowBlank: false
		    },
		    filter: {
            	type: 'string'
            }
        },{ 
            header: '주요 Activity',
            dataIndex: 'activity',
            width: 200,
            editor: {
		        allowBlank: false
		    }
        },{ 
            header: '작업실행팀',
            dataIndex: 'jobExecutionTeam',
            width: 180,
            editor: {
            	xtype: 'combobox',
            	displayField : 'commonCodeName',
            	valueField : 'commonCode',
            	forceSelection : true,
            	store : combo6,
		        allowBlank: false
		    },
		    renderer : function(value) {
	        	var index = combo6.findExact('commonCode', value);
	        	if ( index != -1) {
	        		var rs = combo6.getAt(index).data;
	        		return rs.commonCodeName;
	        	}
	        }
        },{ 
            header: '작업실행자',
            dataIndex: 'jobExecutor',
            width: 180,
            filter: {
            	type: 'string'
            },
            editor: {
            	xtype : 'usercombobox',
		        allowBlank: false,
		        listeners : {
		        	change : function(combobox, value, oldValue) {
		        	   var grid = Ext.getCmp('cutover-grid');
		     		   var sm = grid.getSelectionModel();
		     	       var rec = sm.getSelection()[0];
		     	       rec.set("jobExecutorId", value);
		        	}
		        }
		    }
        },{ 
            header: '선행작업 Task',
            dataIndex: 'preJob',
            width: 200,
            editor : {
            	xtype : 'takcombobox'
            }
        },{ 
            header: '예정시작일',
            dataIndex: 'startExpectDate',
            align : 'center',
            width: 100,
            renderer : function(value) {
		    	if (typeof value === 'string') {
		    		return value;
		    	}
            	return value != null ? DateUtil._formatDateNormal(value) : value;
            },
            filter: {
            	type: 'string'
            },
            editor: {
            	xtype : 'datefield',
            	format : 'Y-m-d H:i',
            	value : new Date(),
		        allowBlank: false,
		        editable : false,
		        listeners : {
		            change : function(date, newValue, oldValue, eOpts) {
//		            	var rec = Ext.getCmp('cutover-grid').getSelectionModel().getSelection()[0];
//		            	var end = rec.data.endExpectDate;
//		            	var checkDate = new Date(end.substring(0,4), (end.substring(5,7)-1), end.substring(8));
//		            	if (newValue > checkDate) {
//		            		rec.set('endExpectDate', DateUtil._formatDateNormal(newValue));
//		            	}
		            }
		        }
		    }
        },{ 
            header: '예정시작시각',
            align : 'center',
            dataIndex: 'startExpectTime',
            width: 100,
            editor: {
            	xtype : 'timefield',
            	value : new Date(),
		        allowBlank: false
		    },
		    renderer : function(value) {
		    	if (typeof value === 'string') {
		    		return value;
		    	}
            	return value != null ? DateUtil._formatTime(value) : value;
            }
        },{ 
            header: '예정종료일',
            align : 'center',
            dataIndex: 'endExpectDate',
            width: 100,
            filter: {
            	type: 'string'
            },
            renderer : function(value) {
            	if (typeof value === 'string') {
		    		return value;
		    	}
            	return value != null ? DateUtil._formatDateNormal(value) : value;
            },
            editor: {
            	xtype : 'datefield',
            	format : 'Y-m-d',
		        allowBlank: false,
		        editable : false
		    }
        },{ 
            header: '예정종료시각',
            align : 'center',
            dataIndex: 'endExpectTime',
            width: 100,
            editor: {
            	xtype : 'timefield',
            	value : new Date(),
		        allowBlank: false
		    },
		    renderer : function(value) {
		    	if (typeof value === 'string') {
		    		return value;
		    	}
            	return value != null ? DateUtil._formatTime(value) : value;
            }
        },{ 
            header: '소요시간(분)',
            align : 'center',
            dataIndex: 'duration',
            width: 80
        },{ 
            header: 'Critial Task',
            dataIndex: 'caution',
            align : 'center',
            width: 80,
            editor: {
            	xtype: 'combobox',
            	displayField : 'label',
            	valueField : 'value',
    			queryMode : 'local',
            	store : combo7,
		        allowBlank: true
		    },
		    renderer : function(value) {
	        	var index = combo7.findExact('label', value);
	        	if ( index != -1) {
	        		var rs = combo7.getAt(index).data;
	        		return rs.value;
	        	}
	        	return value;
	        }
        },{ 
            header: '작업확인자',
            dataIndex: 'supervisor',
            width: 120,
            editor: {
            	xtype : 'usercombobox',
		        allowBlank: false,
		        listeners : {
		        	change : function(combobox, value, oldValue) {
		        	   var grid = Ext.getCmp('cutover-grid');
		     		   var sm = grid.getSelectionModel();
		     	       var rec = sm.getSelection()[0];
		     	       rec.set("supervisorId", value);
		        	}
		        }
		    }
        },{ 
            header: '시스템/모듈',
            dataIndex: 'systemType',
            width: 110,
            editor: {
            	xtype: 'combobox',
            	displayField : 'commonCodeName',
            	valueField : 'commonCode',
            	forceSelection : true,
            	store : combo5,
		        allowBlank: false
		    },
		    renderer : function(value) {
	        	var index = combo5.findExact('commonCode', value);
	        	if ( index != -1) {
	        		var rs = combo5.getAt(index).data;
	        		return rs.commonCodeName;
	        	}
	        }
        },{ 
            header: '고려사항',
            dataIndex: 'jobCheckList',
            width: 150,
            editor: {
		        allowBlank: true
		    }
        },{ 
            header: '확정여부',
            align : 'center',
            dataIndex: 'itemStatusName',
            width: 80,
            align:'center',
            hidden : false,
            renderer : function(value) {
            	if (value !== '검증중') {
            		return 'Y';
            	}
            	return 'N';
            }
        },{ 
            header: '최종변경자',
            dataIndex: 'itemAuthorName',
            align : 'center',
            width: 110,
            hidden : false
        },{ 
            header: '최초등록일시',
            dataIndex: 'itemCreateDate',
            align : 'center',
            width: 120,
            hidden : false
        },{ 
            header: '최종변경일시',
            dataIndex: 'itemUpdateDate',
            align : 'center',
            width: 120,
            hidden : false
        },{ 
            header: '상태',
            dataIndex: 'itemStatusName',
            align : 'center',
            width: 110,
            hidden : false
        },{ 
            header: 'Jira ID',
            dataIndex: 'jiraId',
            width: 80,
            hidden : false
        },{ 
            header: '연동 메시지',
            dataIndex: 'jiraSyncMessage',
            width: 80,
            hidden : false
        }];
        
        this.dockedItems = [{
        	xtype : 'toolbar',
        	dock : 'top',
        	items :[{
                name: 'cutoverTh',
                xtype: CommonCode._getCombo('15104', '시나리오 구분', false, 'th-combo'),
                labelWidth: 50,
                width : '10%',
                hidden: true,
                allowBlank: false
            },{
                name: 'jobStep',
                xtype: CommonCode._getCombo('15105', '전환단계', false, 'jobstep-combo'),
                labelWidth: 50,
                width : '10%',
                hidden: true,
                allowBlank: false
            },{
                name: 'jobType',
                xtype: CommonCode._getCombo('15106', '전환단계상세', false, 'jobstepdtl-combo'),
                labelWidth: 50,
                width : '10%',
                hidden: true,
                allowBlank: false
            },{
                name: 'yCategory',
                xtype: CommonCode._getCombo('15107', '작업단계', false, 'jobtype-combo'),
                labelWidth: 50,
                width : '10%',
                hidden: true,
                allowBlank: false
            },{
                text: '엑셀다운로드',
                action:'download-excel',
                ui : 'soft-blue'
            }
        	]
        }];
        
        this.tbar = [{
            name: 'jobExecutionTeam',
            xtype: CommonCode._getCombo('15110', '작업실행팀', true, 'team-combo'),
            labelWidth: 50,
            width : '10%',
            hidden: true,
            allowBlank: false
        },{
            name: 'systemType',
            xtype: CommonCode._getCombo('15108', '시스템/모듈', true, 'sys-combo'),
            labelWidth: 50,
            width : '10%',
            hidden: true,
            allowBlank: false
        },{
            text: '조회',
            action:'reload-grid-record',
            ui : 'gray'
        },{
            text: '추가',
            action:'add-grid-record',
            ui : 'gray'
        },{
            text: '복사',
            action:'copy-grid-record',
            ui : 'gray'
        },{
            text: '삭제',
            action:'remove-grid-record',
            ui : 'soft-red'
        },{
            text: '저장',
            action:'save-grid-record',
            ui : 'soft-green'
        },{
            text: '순서변경',
            action:'sort-grid-record',
            ui : 'soft-green',
            disabled : G_IS_HADNS == 'Y' || G_IS_CT_HANDS == 'Y' ? false : true
        },{
            text: '확정',
            action:'confirm-grid-record',
            ui : 'gray'
        },{
            text: 'Jira 생성 및 반영',
            action:'jira-grid-record',
            disabled : G_IS_HADNS == 'Y' || G_IS_CT_HANDS == 'Y' ? false : true,
            ui : 'soft-blue'
        },{
            text: 'Task 미리보기',
            action:'timeline-view',
            ui : 'soft-blue'
        }
        ];
        
        this.callParent(arguments);
    },
    listeners : {
    	resize : function (self, width, height) {
//    		this.setMaxHeight(Ext.getCmp('main-acc').getHeight() - 130);
    	},
    	viewready : function(grid) {
	    	var map  = new Ext.KeyMap(grid.getEl(), [
	    	   {
	    	    key: 'c',
	    		ctrl : true,
	    		fn : function(keyCode, e){
	    			if (G_IS_HADNS !== "Y") {
	    				Ext.Msg.alert('Info', '지원되지 않는 기능입니다.');
	    				return false;
	    			}
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
	    	},{
	    		key: 'v',
	    		ctrl : true,
	    		fn : function(keyCode, e) {
	    			var ta = document.createElement('textarea');
	    			ta.id = 'cliparea';
	    			ta.style.position = 'absolute',
	    			ta.style.left = '-1000px';
	    			ta.style.toop = '-1000px';
	    			ta.value = '';
	    			
	    			document.body.appendChild(ta);
	    			document.designMode = 'off';
	    			
	    			setTimeout(function() {
	    				Ext.getCmp('cutover-grid').getRecsFromCsv(grid, ta);
	    			}, 100);
	    			//ta.focus();
	    			ta.select();
	    		}
	    	}]
	    	);
	     }
	  },
    getRecsFromCsv : function(grid, ta) {
    	var store = Ext.getCmp('cutover-grid').getStore();
    	document.body.removeChild(ta);
    	var del = '';
    	if (ta.value.indexOf("\r\n")) {
    		del = "\r\n";
    	} else if(ta.value.indexOf("\n")) {
    		del = "\n";
    	}
    	var sel = grid.getSelectionModel().getSelection();
    	if(sel != null){
    		var rw = grid.store.indexOf(sel[0]);
    		grid.gRow = rw;
    	}
    	var rows = ta.value.split("\n");
    	for (var i=0;i < rows.length;i++) {
    		var cols = rows[i].split("\t");
    		
    		var columns = grid.columns;
    		if(cols.length >  columns.length) {
    			cols = cols.slice(0, columns.length);
    		}
    		if (grid.gRow === -1) {
    			Ext.Msg.alert('Info', 'Select a cell before pasting and try again!');
    			return ;
    		}
    		var cfg = {};
    		var tmpRec = store.getAt(grid.gRow);
    		var existing = false;
    		if (tmpRec) {
    			cfg = tmpRec.data;
    			existing = true;
    		}
    		var l = cols.length;
    		if(cols.length > columns.length) {
    			l = columns.length;
    		}
    		for (var j=0;j < l;j++) {
    			if (cols[j] === "") {
    				return ;
    			}
    			cfg[columns[j].dataIndex] = cols[j];
    		}
    		grid.storeInitialCount++;
    		var tmpRow = grid.gRow;;
    		grid.getSelectionModel().clearSelections(true);
    		var tmpRec = Ext.create('Ext.cutover.model.Cutover', cfg);
    		if(existing) {
    			store.removeAt(tmpRow);
    		}
    		tmpRec.dirty = true;
    		store.insert(tmpRow, tmpRec);
    		grid.gRow = ++tmpRow;
    	}
    	if(grid.gRow === store.getCount()) {
    		var RowRec = Ext.create('Ext.cutover.model.Cutover', {});
    		store.add(RowRec);
    	}
    	grid.gRow = 0;
    },
    getCsvDataFromRecs : function(records) {
    	var clipText = '';
    	var store = Ext.getCmp('cutover-grid').getStore();
    	var curRow = store.find('jobId', records[0].data.jobId);
    	for (var i=0;i < records.length;i++) {
    		var index = store.find('jobId', records[i].data.jobId);
    		var r = index;
    		var rec = records[i];
    		var cv = this.columns;
    		for (var j=0;j < cv.length;j++) {
    			var val = rec.data[cv[j].dataIndex];
    			if (typeof val == "undefined") continue;
    			val = Ext.getCmp('cutover-grid').getComboValue(val);
    			if (r === curRow) {
    				clipText = clipText.concat(val, "\t");
    			} else {
    				curRow = r;
    				clipText = clipText.concat("\n", val, "\t");
    			}
    		}
    	}
    	return clipText;
    },
    getComboValue : function(value) {
    	var index = combo1.findExact('commonCode', value);
    	if ( index != -1) {
	    	var rs = combo1.getAt(index).data;
			return rs.commonCodeName;
    	}
    	index = combo2.findExact('commonCode', value);
    	if ( index != -1) {
	    	var rs = combo2.getAt(index).data;
			return rs.commonCodeName;
    	}
    	index = combo3.findExact('commonCode', value);
    	if ( index != -1) {
	    	var rs = combo3.getAt(index).data;
			return rs.commonCodeName;
    	}
    	index = combo4.findExact('commonCode', value);
    	if ( index != -1) {
	    	var rs = combo4.getAt(index).data;
			return rs.commonCodeName;
    	}
    	index = combo5.findExact('commonCode', value);
    	if ( index != -1) {
	    	var rs = combo5.getAt(index).data;
			return rs.commonCodeName;
    	}
    	index = combo6.findExact('commonCode', value);
    	if ( index != -1) {
	    	var rs = combo6.getAt(index).data;
			return rs.commonCodeName;
    	}
    	index = combo7.findExact('commonCode', value);
    	if ( index != -1) {
	    	var rs = combo7.getAt(index).data;
			return rs.commonCodeName;
    	}
    	return value;
    }
});
