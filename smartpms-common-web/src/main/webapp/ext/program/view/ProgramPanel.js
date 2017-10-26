
var ComboAction = {
	_programSmallType : function(parent) {
		var combo = Ext.getCmp('programSmallType');
		var store = combo.getStore();
		var proxy = store.getProxy();
		proxy.extraParams.refValue1 = parent;
		store.load();
	},
	_module : function(parent) {
		var combo = Ext.getCmp('module');
		var store = combo.getStore();
		var proxy = store.getProxy();
		proxy.extraParams.parentOrgId = parent;
		proxy.extraParams.orgDiv = 'MODULE'
		store.load();
	}
};
var ValidAction = {
		_valid : function() {
			var form = Ext.getCmp('program-form');
			form.getForm().getFields().each(function (field) {
				if (!field.validate()) {
					Ext.Msg.alert('Info', field.fieldLabel + ' 값이 비어 있거나 입력된 값이 유효하지 않습니다.');
					field.focus();
					return false;
				}
			});
			ValidAction._vaildByEtc();
			return true;
		},
		_vaildByEtc : function() {
			var form = Ext.getCmp('program-form');
			var formData = form.getForm().getValues();
			var program = formData.programId;
			var programType = Ext.getCmp('programType');
			var programSmallType = Ext.getCmp('programSmallType');
			var startDateStr = formData.startDateStr;
			var dueDateStr = formData.dueDateStr;
			var startArr = startDateStr.split('-');
			var dueArr = dueDateStr.split('-');
			var now = new Date();
			var nowStart = new Date();
			nowStart.setDate(now.getDate() - now.getDay());
			var nowEnd = new Date();
			nowEnd.setDate(now.getDate() + (6 - now.getDay()));
			var startDate = new Date(startArr[0], startArr[1]-1, startArr[2]);
			var dueDate = new Date(dueArr[0], dueArr[1]-1, dueArr[2]);
			var compareDate = new Date(startArr[0], startArr[1]-1, startArr[2]);
			compareDate.setDate(compareDate.getDate() + 14);
			var limitDate = new Date(2017, 3, 1);
			var srFlag = Ext.getCmp('srFlag');
			if ((programType.getValue() == 'CORE_BIZ' 
					|| programType.getValue() == 'CoreBiz')
				&& (programSmallType.getValue() == 'BO'
					|| programSmallType.getValue() == 'BOC'
					|| programSmallType.getValue() == 'SO'
					|| programSmallType.getValue() == 'JO')) {
				if (!program.endsWith(programSmallType.getValue())) {
					Ext.Msg.alert('Info', '프로그램 영문명은 반드시 ' + programSmallType.getValue() + '으로 끝나야 합니다.');
					return false;
				}
			}
			
			if (startDateStr > dueDateStr) {
				Ext.Msg.alert('Info', '시작일자는 완료기한보다 작거나 같아야 합니다.');
				return false;
			}
			
			if (dueDate > compareDate) {
				Ext.Msg.alert('Info', '최대 지정 가능한 일자를 초과하였습니다.(최대-14일)');
				return false;
			}
			if (formData.mode == 'M' && startDate <= nowEnd) {
				Ext.Msg.alert('Info', '시작일자/완료일자는 금주 및 과거일자로 지정이 불가합니다.');
				return false;
			}
			if ((nowStart >= startDate && nowEnd <= startDate)
					|| (nowStart >= dueDate && nowEnd <= dueDate)) {
				Ext.Msg.alert('Info', '시작일자/완료기한은 금주 대상으로 지정할 수 엇습니다.');
				return false;
			}
			
			if (dueDate > limitDate) {
				Ext.Msg.alert('Info', '완료일은 최대 2017.4.1로 입력되어야 합니다.');
				return false;
			}
			
			if (srFlag.getValue() != null 
					&& (srFlag.getValue() == 'SR_Y' && (formData.srNo == null || formData.srNo == ''))) {
				Ext.Msg.alert('Info', 'SR 대상은 SR NO.를 반드시 입력해야 합니다.');
				return false;
			}
		}
	};
var GridAction = {
	_move : function() {
		var grid = Ext.getCmp('source-program-grid');
    	var sm = grid.getSelectionModel();
    	var rec = sm.getSelection();
    	if (rec.length < 1) {
    		Ext.Msg.alert('Info', '요청할 대상을 선택하십시오.');
    		return ;
    	}
    	var grid2 = Ext.getCmp('program-grid');
    	var store = grid2.getStore();
    	store.loadRecords(rec, {addRecords:true});
    	
	},
	_openEditorForm : function() {
		var win = Ext.getCmp('edit-info');
		if (win == null) {
			win = Ext.create('Ext.window.Window', {
				id : 'edit-info',
	    	    title: '프로그램 정보 일괄변경',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
	    	    closeAction : 'hide',
	    	    layout: 'fit',
	    	    modal: true,
	    	    animateTarget:this,
	    	    padding : 10,
	    	    width : 750,
	    	    height : 450,
	    	    border:false,
	    	    items : [
	    	        {
	    	        	xtype : 'programbatchform'
	    	        }
	    	    ]
			});
		}
		win.show();
	},
	_openJiraReg : function() {
		var win = Ext.getCmp('wbscr-info');
		if (win == null) {
			win = Ext.create('Ext.window.Window', {
				id : 'wbscr-info',
	    	    title: 'WBS-CR요청',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
	    	    closeAction : 'hide',
	    	    layout: 'fit',
	    	    modal: true,
	    	    animateTarget:this,
	    	    padding : 10,
	    	    width : 750,
	    	    height : 450,
	    	    border:false,
	    	    items : [
	    	        {
	    	        	xtype : 'wbscrform'
	    	        }
	    	    ]
			});
		}
		win.show();
	}
}
Ext.define('Ext.program.view.ProgramPanel', {
	extend: 'Ext.container.Container',
	alias : 'widget.programpanel',
	id : 'program-panel',
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	border: false,
	items : [
	   {
		   xtype : 'crpanel',
		   title : '원본 프로그램',
		   tools : [
				{
				    xtype: 'tool',                                    
				    cls: 'x-fa fa-forward dashboard-tools',
				    tooltip: '요청 대상선정',
				    width: 20,
				    height: 20,
				    handler : function() {
				    	GridAction._move();
				    }
				}
		   ],
		   responsiveCls: 'big-50 small-100'
	   }, 
	   {
		   xtype : 'panel',
		   border: false,
		   title : 'WBS-CR 대상 프로그램',
		   tools : [
				{
				    xtype: 'tool',                                    
				    cls: 'x-fa fa-pencil-square-o dashboard-tools',
				    tooltip: '일괄변경',
				    width: 20,
				    height: 20,
				    handler : function() {
				    	var grid = Ext.getCmp('program-grid');
				    	var sm = grid.getSelectionModel();
			        	var rec = sm.getSelection();
			        	if (rec.length < 1) {
			        		Ext.Msg.alert('Info', '일괄 변경할 대상을 선택하십시오.');
			        		return ;
			        	}
			        	GridAction._openEditorForm();
				    }
				},{
				    xtype: 'tool',                                    
				    cls: 'x-fa fa-eraser dashboard-tools',
				    tooltip: '요청유형변경-삭제',
				    width: 20,
				    height: 20,
				    handler : function() {
				    	var grid = Ext.getCmp('program-grid');
				    	var sm = grid.getSelectionModel();
			        	var rec = sm.getSelection();
			        	if (rec.length < 1) {
			        		Ext.Msg.alert('Info', '요청유형을 삭제로 변경할 대상을 선택하십시오.');
			        		return ;
			        	}
			        	for (var i=0; i< rec.length;i++) {
			        		var r = rec[i];
			        		r.set('mode', 'D');
			        	}
				    }
				},{
				    xtype: 'tool',                                    
				    cls: 'x-fa fa-plus dashboard-tools',
				    tooltip: '요청대상 신규',
				    width: 20,
				    height: 20,
				    handler : function() {
			        	var pgGrid = Ext.getCmp('program-grid');
			        	var store = pgGrid.getStore();

			            var r = Ext.create('Ext.program.model.ProgramListJira', {
			            	mode : 'I'
			            });

			            store.insert(0, r);			        	
				    }
				},{
				    xtype: 'tool',                                    
				    cls: 'x-fa fa-trash dashboard-tools',
				    tooltip: '요청대상 취소',
				    width: 20,
				    height: 20,
				    handler : function() {
				    	var grid = Ext.getCmp('program-grid');
				    	var store = grid.getStore();
				    	var sm = grid.getSelectionModel();
			        	var rec = sm.getSelection();
			        	if (rec.length < 1) {
			        		Ext.Msg.alert('Info', '일괄 변경할 대상을 선택하십시오.');
			        		return ;
			        	}
			        	Ext.MessageBox.confirm('Confirm', '선택된 항목을 WBS-CR 대상에서 취소 하시겠습니까?', function(btn) {
			        		if (btn == 'yes') {
					        	store.remove(rec);
					            if (store.getCount() > 0) {
					                sm.select(0);
					            }
			        		}
			        	});	
				    	
				    }
				},
				{
				    xtype: 'tool',                                    
				    cls: 'x-fa fa-wrench dashboard-tools',
				    tooltip: 'WBS-CR 등록요청',
				    width: 20,
				    height: 20,
				    handler : function() {
				    	var grid = Ext.getCmp('program-grid');
			        	var store = grid.getStore();
			        	var records = store.getRange();
			        	var vaild = true;
			        	if (records.length < 1) {
			        		Ext.Msg.alert('Info', 'WBS-CR 대상 프로그램이 없습니다.');
			        		return ;
			        	}
			        	for (var i=0;i < records.length; i++) {
			        		var rec = records[i];
			    			if (rec.data.mode == 'M' && rec.dirty != true) {
			    				vaild = false;
			    				break;
			    			}
			        	}
			        	if (!vaild) {
			        		Ext.Msg.alert('Info', '변경요청 프로그램 중 변경된 값이 없는 데이터가 있습니다.<br>변경 후 재 요청 하시기 바랍니다.');
			        		return ;
			        	}
			        	GridAction._openJiraReg();
				    }
				}
		   ],
		   items : [
		      {
		    	  xtype : 'programgrid'
		      },
		      {
		    	  xtype : 'form',
		    	  border: false,
		    	  id : 'program-form',
		    	  margin : 5,
		    	  items : [
					{
						  xtype : 'fieldset',
						  title : '대상 프로그램 정보',
						  margin : 1,
						  layout : {
							  type: 'vbox',
						      align: 'stretch'
						  },
						  defaults : {
							labelWidth : 120,
							labelAlign : 'right'
						  },
						  items : [
						     {
						    	xtype : 'textfield',
						    	name : 'mode',
						    	hidden : true
						     },
						     {
						    	xtype : 'textfield',
						    	fieldLabel : '* Task',
						    	name : 'task',
						    	allowBlank : false,
						    	width : '48%'
						     },
						     {
						    	xtype : 'textfield',
						    	fieldLabel : '* 업무명',
						    	name : 'taskDetail',
						    	allowBlank : false,
						    	width : '48%'
						     },
						     {
						    	xtype : 'textfield',
						    	fieldLabel : '* Program 명(영문)',
						    	name : 'programId',
						    	allowBlank : false,
						    	width : '48%'
						     },
						     {
						    	xtype : 'textfield',
						    	fieldLabel : '* Program 명(한글)',
						    	name : 'programName',
						    	allowBlank : false,
						    	width : '48%'
						     },
						     {	
						    	layout : {
									type: 'hbox',
								    align: 'stretch'
								}, 
								defaults : {
									labelWidth : 120,
									labelAlign : 'right'
								},
								bodyStyle : {
									'background-color' : '#f6f6f6'
								},
								border: false,
								items :[
									CommonCode._getCombo('PG_TYPE', '* 대분류', false, 'programType', {labelWidth:120, labelAlign : 'right', width: '30%', allowBlank : false}, ComboAction._programSmallType),
									CommonCode._getCombo('PG_SM_TYPE', '* 소분류', false, 'programSmallType', {labelWidth:120, labelAlign : 'right', width: '30%', allowBlank : false}),
									{
										xtype : 'textfield',
										name : 'developer',
										fieldLabel : '* 개발자',
										allowBlank : false,
										maxLengthText : '최대입력값을 초과하였습니다.(max-4)',
										enforceMaxLength : true,
										maxLength: 4,
										width : '39.5%'
									 }
								]
						     },
						     {
						    	layout : {
									type: 'hbox',
								    align: 'stretch'
								}, 
								defaults : {
									labelWidth : 120,
									labelAlign : 'right'
								},
								bodyStyle : {
									'background-color' : '#f6f6f6'
								},
								border: false,
								items :[
									{
								    	xtype : 'datefield',
								    	name : 'startDateStr',
								    	allowBlank : false,
								    	fieldLabel : '* 시작일자',
								    	format : 'Y-m-d',
								    	width : '30%'
								     },{
								    	xtype : 'datefield',
								    	name : 'dueDateStr',
								    	allowBlank : false,
								    	fieldLabel : '* 완료기한',
								    	format : 'Y-m-d',
								    	width : '30%'
								     },
								     {
								    	xtype : 'textfield',
								    	name : 'interfaceId',
								    	fieldLabel : '인터페이스 ID',
								    	width : '39.5%'
								     }
								]
						     },
						     {
						    	layout : {
									type: 'hbox',
								    align: 'stretch'
								},
								bodyStyle : {
									'background-color' : '#f6f6f6'
								},
								defaults : {
									labelWidth : 120,
									labelAlign : 'right'
								},
								border: false,
								items :[
									 CommonCode._getCombo('SR_FLAG', 'SR 여부', false, 'srFlag', {labelWidth:120, labelAlign : 'right', width: '30%'}),
									 CommonCode._getCombo('PA_TYPE', '* Phase', false, 'phase', {labelWidth:120, labelAlign : 'right', width: '30%',allowBlank : false}),
									 CommonCode._getCombo('ITER', '* Iteration', false, 'iteration', {labelWidth:120, labelAlign : 'right', width: '39.5%',allowBlank : false})
								]
						     },
						     {
						    	layout : {
									type: 'hbox',
								    align: 'stretch'
								}, 
								defaults : {
									labelWidth : 120,
									labelAlign : 'right'
								},
								bodyStyle : {
									'background-color' : '#f6f6f6'
								},
								border: false,
								items :[
									Org._getOrgCombo('TEAM', '* 팀', false, 'team', {labelWidth:120, labelAlign : 'right', width: '30%',allowBlank : false}, ComboAction._module),
									Org._getOrgCombo('MODULE', '* 모듈', false, 'module', {labelWidth:120, labelAlign : 'right', width: '30%', allowBlank : false}),
									{
								    	xtype : 'textfield',
								    	name : 'subModule',
								    	fieldLabel : '* 서브모듈',
								    	allowBlank : false,
								    	width : '39.5%'
								     }
								]
						     },
						     {
							    	layout : {
										type: 'hbox',
									    align: 'stretch'
									}, 
									defaults : {
										labelWidth : 120,
										labelAlign : 'right'
									},
									bodyStyle : {
										'background-color' : '#f6f6f6'
									},
									border: false,
									items :[
										{
									    	xtype : 'textfield',
									    	name : 'srNo',
									    	fieldLabel : 'SR NO.',
									    	width : '30%'
									     },
									     {
									    	xtype : 'textfield',
									    	name : 'crReason',
									    	fieldLabel : '* 요청 사유',
									    	allowBlank : false,
									    	width : '69.5%'
									     }
									]
							     }
						  ]
						  
					  }
		    	  ],
		    	  buttons : [
		    	     {
		    	    	 text : '적용',
		    	    	 ui :'gray',
		    	    	 handler : function() {
		    	    		 
		    	    		 var grid = Ext.getCmp('program-grid');
		    	    		 var sm = grid.getSelectionModel();
		    	    	     var rec = sm.getSelection()[0];
		    	    	     if (rec != null) {
		    	    	    	 ValidAction._valid();
		    	    	    	 var form = Ext.getCmp('program-form');
			    	    		 var r = form.getForm().getValues();
			    	    		 rec.set("programId", r.programId);
			    	    		 rec.set("programName", r.programName);
			    	    		 rec.set("module", Ext.getCmp('module').getValue());
			    	    		 rec.set("developer", r.developer);
			    	    		 rec.set("programType", Ext.getCmp('programType').getValue());
			    	    		 rec.set("programSmallType", Ext.getCmp('programSmallType').getValue());
			    	    		 rec.set("startDateStr", r.startDateStr);
			    	    		 rec.set("dueDateStr", r.dueDateStr);
			    	    		 rec.set("interfaceId", r.interfaceId);
			    	    		 rec.set("task", r.task);
			    	    		 rec.set("phase", Ext.getCmp('phase').getValue());
			    	    		 rec.set("iteration", Ext.getCmp('iteration').getValue());
			    	    		 rec.set("srFlag", Ext.getCmp('srFlag').getValue());
			    	    		 rec.set("taskDetail", r.taskDetail);
			    	    		 rec.set("crReason", r.crReason);
			    	    		 rec.set("srNo", r.srNo);
		    	    	     } else {
		    	    	    	 Ext.Msg.alert('Info', '적용할 프로그램 정보를 Grid에서 선택하십시오.');
					        	 return ;
		    	    	     }

		    	    	 }
		    	     }
		    	  ]
		    		  
		      }
		   ],
		   responsiveCls: 'big-50 small-100'
	   }
	]
});
