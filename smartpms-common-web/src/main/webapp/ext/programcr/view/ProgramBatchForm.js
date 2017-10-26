var ValidActionBatch = {
	_validBatch : function() {
		var form = Ext.getCmp('program-batch-form');
		ValidActionBatch._vaildBatchByEtc();
		return true;
	},
	_vaildBatchByEtc : function() {
		var form = Ext.getCmp('program-batch-form');
		var formData = form.getForm().getValues();
		var program = formData.programIdBatch;
		var programType = Ext.getCmp('programTypeBatch');
		var programSmallType = Ext.getCmp('programSmallTypeBatch');
		var startDateStr = formData.startDateStrBatch;
		var dueDateStr = formData.dueDateStrBatch;
		var startArr = startDateStrBatch.split('-');
		var dueArr = dueDateStrBatch.split('-');
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
		var srFlag = Ext.getCmp('srFlagBatch');
		
		if (startDateStr != null && startDateStr != ''
			&& dueDateStr != null && dueDateStr != '') {
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
		}
		
		if (srFlag.getValue() != null 
				&& (srFlag.getValue() == 'SR_Y' && (formData.srNoBatch == null || formData.srNoBatch == ''))) {
			Ext.Msg.alert('Info', 'SR 대상은 SR NO.를 반드시 입력해야 합니다.');
			return false;
		}
	}
};
Ext.define('Ext.programcr.view.ProgramBatchForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.programbatchform',
    bodyPadding: 10,
    id : 'program-batch-form',
    defaults: {
        labelWidth: 120
    },
    border: false,
    defaultType: 'textfield',
    items: [
      {
	  xtype : 'fieldset',
	  title : '프로그램 정보',
	  margin : 1,
	  layout : {
		  type: 'vbox',
	      align: 'stretch'
	  },
	  defaults : {
		labelWidth : 70,
		labelAlign : 'right'
	  },
	  items : [
		 {
        	xtype: 'radiogroup',
            fieldLabel: '요청 유형',
            id : 'modeBatch',
            anchor: '50%',
            items:[
                {boxLabel: '변경', name:'mode', inputValue:'M', checked : true},
                {boxLabel: '삭제', name:'mode', inputValue:'D'}
            ],
            listeners : {
            	change : function(obj, newValue, oldValue, eOpts) {
            		var form = Ext.getCmp('program-batch-form');
            		if (newValue.mode == 'D') {
            			form.getForm().getFields().each(function (field) {
            				field.setReadOnly (true);
            			});
            		} else {
            			form.getForm().getFields().each(function (field) {
            				field.setReadOnly (false);
            			});
            		}
            	}
            }
         },
	     {
	    	xtype : 'textfield',
	    	fieldLabel : 'Task',
	    	name : 'taskBatch',
	    	width : '48%'
	     },
	     {
	    	xtype : 'textfield',
	    	fieldLabel : '업무명',
	    	name : 'taskDetailBatch',
	    	width : '48%'
	     },
	     {	
	    	layout : {
				type: 'hbox',
			    align: 'stretch'
			}, 
			defaults : {
				labelWidth : 70,
				labelAlign : 'right'
			},
			bodyStyle : {
				'background-color' : '#f6f6f6'
			},
			border: false,
			items :[
				{
					xtype : CommonCode._getCombo('PG_TYPE', '대분류', false, 'programTypeBatch', {labelWidth:70, labelAlign : 'right', width: '30%'}, ComboAction._programSmallType),
					name : 'programTypeBatch',
					width : '30%'
				 },{
					xtype : CommonCode._getCombo('PG_SM_TYPE', '소분류', false, 'programSmallTypeBatch', {labelWidth:70, labelAlign : 'right', width: '30%'}),
					name : 'programSmallTypeBatch',
					width : '30%'
				 },{
					xtype : 'textfield',
					name : 'developerBatch',
					fieldLabel : '개발자',
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
				labelWidth : 70,
				labelAlign : 'right'
			},
			bodyStyle : {
				'background-color' : '#f6f6f6'
			},
			border: false,
			items :[
				{
			    	xtype : 'datefield',
			    	name : 'startDateStrBatch',
			    	fieldLabel : '시작일자',
			    	format : 'Y-m-d',
			    	width : '30%'
			     },{
			    	xtype : 'datefield',
			    	name : 'dueDateStrBatch',
			    	fieldLabel : '완료기한',
			    	format : 'Y-m-d',
			    	width : '30%'
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
				labelWidth : 70,
				labelAlign : 'right'
			},
			border: false,
			items :[
				 {
			    	xtype : CommonCode._getCombo('SR_FLAG', 'SR 여부', false, 'srFlagBatch', {labelWidth:70, labelAlign : 'right', width: '30%'}),
			    	name : 'srFlagBatch',
			    	width : '30%'
			     },{
			    	xtype : CommonCode._getCombo('PA_TYPE', 'Phase', false, 'phaseBatch', {labelWidth:70, labelAlign : 'right', width: '30%'}),
			    	name : 'phaseBatch',
			    	width : '30%'
			     },{
			    	xtype : CommonCode._getCombo('ITER', 'Iteration', false, 'iterationBatch', {labelWidth:70, labelAlign : 'right', width: '39.5%'}),
			    	name : 'iterationBatch',
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
				labelWidth : 70,
				labelAlign : 'right'
			},
			bodyStyle : {
				'background-color' : '#f6f6f6'
			},
			border: false,
			items :[
				{
			    	xtype : 'textfield',
			    	name : 'srNoBatch',
			    	fieldLabel : 'SR 번호',
			    	width : '30%'
			     },
			     {
			    	xtype : 'textfield',
			    	name : 'crReasonBatch',
			    	fieldLabel : '요청 사유',
			    	width : '69.5%'
			     }
			]
	     },
	     {
	    	layout : {
				type: 'hbox',
			    align: 'stretch'
			}, 
			defaults : {
				labelWidth : 70,
				labelAlign : 'right'
			},
			bodyStyle : {
				'background-color' : '#f6f6f6'
			},
			border: false,
			items :[
				{
			    	xtype : Org._getOrgCombo('TEAM', '팀', false, 'teamBatch', {labelWidth:70, labelAlign : 'right', width: '30%'}, ComboAction._module),
			    	name : 'teamBatch',
			    	readOnly : true,
			    	width : '30%'
			     },{
			    	xtype : Org._getOrgCombo('MODULE', '모듈', false, 'moduleBatch', {labelWidth:70, labelAlign : 'right', width: '30%'}),
			    	name : 'moduleBatch',
			    	width : '30%'
			     },{
			    	xtype : 'textfield',
			    	name : 'subModuleBatch',
			    	fieldLabel : '서브모듈',
			    	width : '39.5%'
			     }
			]
	     }
	     
	    ]
      }
    ],
    buttons: [
       {
	        text:'일괄적용',
	        ui : 'gray',
	        handler : function() {
	        	Ext.MessageBox.confirm('Confirm', '입력된 정보로 일괄변경 하시겠습니까?', function(btn) {
	        		if (btn == 'yes') {
	        			 var grid = Ext.getCmp('program-grid');
		   	    		 var sm = grid.getSelectionModel();
		   	    	     var recs = sm.getSelection();
		   	    	     var form = Ext.getCmp('program-batch-form');
		      	    		 var r = form.getForm().getValues();
		   	    	     for(var i=0;i < recs.length;i++) {
		   	    	    	 var rec = recs[i];
		   		    	     if (rec != null) {
		   		    	    	 ValidActionBatch._validBatch();
		   		    	    	
		   		    	    	 if (rec.data.mode != 'I')  {
		   		    	    		 rec.set("mode", Ext.getCmp('modeBatch').getValue().mode);
		   		    	    	 }
		   		    	    	 
		   		    	    	 if (rec.data.mode != 'D') {
			   		   	    		 if (r.programIdBatch != null && r.programIdBatch != '') 
			   		   	    			 rec.set("programId", r.programIdBatch);
			   		   	    		 if (r.programNameBatch != null && r.programNameBatch != '')
			   		   	    			rec.set("programName", r.programNameBatch);
			   		   	    		 if (Ext.getCmp('moduleBatch').getValue() != null && Ext.getCmp('moduleBatch').getValue() != '') 
			   		   	    			rec.set("module", Ext.getCmp('moduleBatch').getValue());
			   		   	    		 if (r.subModuleBatch != null && r.subModuleBatch != '')
			   		   	    			rec.set("subModule", r.subModuleBatch);
			   		   	    		 if (r.developerBatch != null && r.developerBatch != '')
			   		   	    			 rec.set("developer", r.developerBatch);
			   		   	    		 if (Ext.getCmp('programTypeBatch').getValue() != null && Ext.getCmp('programTypeBatch').getValue() != '')
			   		   	    			rec.set("programType", Ext.getCmp('programTypeBatch').getValue());
			   		   	    		 if (Ext.getCmp('programSmallTypeBatch').getValue() != null && Ext.getCmp('programSmallTypeBatch').getValue() != '')
			   		   	    			 rec.set("programSmallType", Ext.getCmp('programSmallTypeBatch').getValue());
			   		   	    		 if (r.startDateStrBatch != null && r.startDateStrBatch != '')
			   		   	    			 rec.set("startDateStr", r.startDateStrBatch);
			   		   	    		 if (r.dueDateStrBatch != null && r.dueDateStrBatch != '')
			   		   	    			 rec.set("dueDateStr", r.dueDateStrBatch);
			   		   	    		 if (r.interfaceIdBatch != null && r.interfaceIdBatch != '')
			   		   	    			 rec.set("interfaceId", r.interfaceIdBatch);
			   		   	    		 if (r.taskBatch != null && r.taskBatch != '')
			   		   	    			 rec.set("task", r.taskBatch);
			   		   	    		 if (Ext.getCmp('phaseBatch').getValue() != null && Ext.getCmp('phaseBatch').getValue() != '')
			   		   	    			 rec.set("phase", Ext.getCmp('phaseBatch').getValue());
			   		   	    		 if (Ext.getCmp('iterationBatch').getValue() != null && Ext.getCmp('iterationBatch').getValue() != '')
			   		   	    			 rec.set("iteration", Ext.getCmp('iterationBatch').getValue());
			   		   	    		 if (Ext.getCmp('srFlagBatch').getValue() != null && Ext.getCmp('srFlagBatch').getValue() != '')
			   		   	    			 rec.set("srFlag", Ext.getCmp('srFlagBatch').getValue());
			   		   	    		 if (r.taskDetailBatch != null && r.taskDetailBatch != '')
			   		   	    			 rec.set("taskDetail", r.taskDetailBatch);
			   		   	    		 if (r.crReasonBatch != null && r.crReasonBatch != '')
			   		   	    			 rec.set("crReason", r.crReasonBatch);
			   		   	    		 if (r.srNoBatch != null&& r.srNoBatch != '')
			   		   	    			 rec.set("srNo", r.srNoBatch);
		   		    	    	 }
		   		    	     }
		   	    	     }
		   	    	     var win = Ext.getCmp('edit-info');
		   	    	     if (win != null)
		   	    	    	 win.close();
	        		}
	        		
	        	});
	        	 
	        }
	    },
	    {
	        text:'취소',
	        ui : 'gray',
	        handler : function() {
	        	var win = Ext.getCmp('edit-info');
	    	     if (win != null)
	    	    	 win.close();
	        }
	    }
    ],
    listeners : {
    }
});
