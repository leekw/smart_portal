Ext.define('Ext.setting.view.SettingPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.settingpanel',
	id : 'setting-panel',
	bodyPadding : 5,
	layout:{
		type : 'fit',
		border: true
	},
	title: '',
	items : [ 
		{
			title : '통합 Dashboard 설정',
			border: false,
			items : [
					{
						xtype : 'form',
						id : 'status-form',
						labelWidth: 180,
						labelAlign: 'right',
					    minHeight: 700,
					    autoscroll : true,
					    border: false,
						defaultType: 'textfield',
						items :[
						    {
						    	xtype : 'panel',
						    	border: false,
						    	layout : {
						    		 type: 'hbox',
							         align: 'stretch'
						    	},
						    	items : [
									{
										xtype : 'fieldset',
										title : '안정화 Dashboard 설정',
										margin: '10 10 10 10',
										bodyPadding: 10,
										width: '50%',
										items:[{
											labelWidth : 180,
											fieldLabel: '상태설정  사용 여부',
										    xtype: 'radiogroup',
										    items:[
									               {boxLabel: '사용', name:'useYn', inputValue:'Y'},
									               {boxLabel: '미사용', name:'useYn', inputValue:'N'}
									           ]
										},{
											labelWidth : 180,
										    fieldLabel: '메인 상태',
										    xtype: 'radiogroup',
										    items:[
									               {boxLabel: 'red', name:'mainLight', inputValue:'red'},
									               {boxLabel: 'orange', name:'mainLight', inputValue:'orange'},
									               {boxLabel: 'green', name:'mainLight', inputValue:'green'}
									           ]
										},{
											labelWidth : 180,
											fieldLabel: '접속자 상태',
										    xtype: 'radiogroup',
										    items:[
									               {boxLabel: 'red', name:'connUserLight', inputValue:'red'},
									               {boxLabel: 'orange', name:'connUserLight', inputValue:'orange'},
									               {boxLabel: 'green', name:'connUserLight', inputValue:'green'}
									           ]
										},{
											labelWidth : 180,
											fieldLabel: '안정화 시작일자',
											xtype: 'datefield',
											padding: '5 5 5 5',
											id : 'defectStartDate',
											name : 'defectStartDate',
											format: 'Y-m-d',
											value : new Date(),
											endDateField : 'defectEndDate'
										},{
											labelWidth : 180,
											fieldLabel: '안정화  종료일자',
											xtype: 'datefield',
											padding: '5 5 5 5',
											id : 'defectEndDate',
											name : 'defectEndDate',
											format: 'Y-m-d',
											value : new Date(),
											startDateField : 'defectStartDate'
										}]
									},{
										xtype : 'fieldset',
										title : '안정화 Dashboard 설정',
										margin: '10 10 10 10',
										bodyPadding: 10,
										width: '50%',
										items:[{
											labelWidth : 180,
											fieldLabel: '업무처리 상태',
										    xtype: 'radiogroup',
										    items:[
									               {boxLabel: 'red', name:'bizLight', inputValue:'red'},
									               {boxLabel: 'orange', name:'bizLight', inputValue:'orange'},
									               {boxLabel: 'green', name:'bizLight', inputValue:'green'}
									           ]
										},{
											labelWidth : 180,
											fieldLabel: 'ISC 상태',
										    xtype: 'radiogroup',
										    items:[
									               {boxLabel: 'red', name:'iscLight', inputValue:'red'},
									               {boxLabel: 'orange', name:'iscLight', inputValue:'orange'},
									               {boxLabel: 'green', name:'iscLight', inputValue:'green'}
									           ]
										},{
											labelWidth : 180,
											fieldLabel: 'Cut-Ovet 연동 시작일자',
											xtype: 'datefield',
											padding: '5 5 5 5',
											id : 'cutoverStartDate',
											name : 'cutoverStartDate',
											format: 'Y-m-d',
											value : new Date(),
											endDateField : 'cutoverEndDate'
										},{
											labelWidth : 180,
											fieldLabel: 'Cut-Ovet 연동 종료일자',
											xtype: 'datefield',
											padding: '5 5 5 5',
											id : 'cutoverEndDate',
											name : 'cutoverEndDate',
											format: 'Y-m-d',
											value : new Date(),
											startDateField : 'cutoverStartDate'
										},{
											labelWidth : 185,
											xtype : 'textfield',
											fieldLabel: '최대 접속자 수',
										    name : 'limitConnectionCount'
										}]
									}
						        ]
						    	
						    },
						    {
						    	 xtype : 'fieldset',
						    	 title : 'Svn 설정',
						    	 margin: '10 10 10 10',
								 bodyPadding: 10,
						    	 width: '50%',
						    	 border: false,
						    	 items : [
						    	    {
										labelWidth : 180,
										fieldLabel: 'SVN 유효성 체크 설정',
									    xtype: 'radiogroup',
									    items:[
								               {boxLabel: 'On', name:'svnCheckYn', inputValue:'Y'},
								               {boxLabel: 'Off', name:'svnCheckYn', inputValue:'N'}
								           ]
									}
						    	 ]
						     },
						     {
						    	 xtype : 'fieldset',
						    	 title : 'SR Excel 다운로드',
						    	 margin: '10 10 10 10',
								 bodyPadding: 10,
						    	 width: '50%',
						    	 border: false,
						    	 items : [
						    	    {
						    	    	xtype : 'button',
						    	    	margin: '10 10 10 10',
						    	    	text : 'SM SR Order13',
						    	    	handler : function() {
						    	    		
						    	        	var project = 'SRNBSS';
						    	        	var issueTypeId = '138';
						    	        	var issueTypeName = 'SM SR Order13';
						    	        	
						    	        	
//						    	        	var iframe = document.getElementById("excel-down-iframe");
						    	    		var downUrl = G_PATH + '/jira/sr/excel/download.do?project=' + project 
						    	    												 + '&issueTypeId=' + issueTypeId
						    	    												 + '&issueTypeName=' + issueTypeName;
						    	        	
						    	        	var iframe = Ext.getBody().createChild({
						    	        		tag : 'iframe',
						    	        		cls : 'x-hidden',
						    	        		src : downUrl,
						    	        		onload : 'Ext.getBody().unmask(); var t = Ext.get(this); t.remove.defer(1000, t);'
						    	        	});
						    	    	}
						    	    },
						    	    {
						    	    	xtype : 'button',
						    	    	margin: '10 10 10 10',
						    	    	text : 'SM SR Order2',
						    	    	handler : function() {
						    	    		
						    	        	var project = 'SRNBSS';
						    	        	var issueTypeId = '139';
						    	        	var issueTypeName = 'SM SR Order2';
						    	        	
						    	        	
//						    	        	var iframe = document.getElementById("excel-down-iframe");
						    	    		var downUrl = G_PATH + '/jira/sr/excel/download.do?project=' + project 
						    	    												 + '&issueTypeId=' + issueTypeId
						    	    												 + '&issueTypeName=' + issueTypeName;
						    	        	
						    	        	var iframe = Ext.getBody().createChild({
						    	        		tag : 'iframe',
						    	        		cls : 'x-hidden',
						    	        		src : downUrl,
						    	        		onload : 'Ext.getBody().unmask(); var t = Ext.get(this); t.remove.defer(1000, t);'
						    	        	});
						    	    	}
						    	    },
						    	    {
						    	    	xtype : 'button',
						    	    	margin: '10 10 10 10',
						    	    	text : 'SM SR Order Int',
						    	    	handler : function() {
						    	    		
						    	        	var project = 'SRNBSS';
						    	        	var issueTypeId = '140';
						    	        	var issueTypeName = 'SM SR Order Int';
						    	        	
						    	        	
//						    	        	var iframe = document.getElementById("excel-down-iframe");
						    	    		var downUrl = G_PATH + '/jira/sr/excel/download.do?project=' + project 
						    	    												 + '&issueTypeId=' + issueTypeId
						    	    												 + '&issueTypeName=' + issueTypeName;
						    	        	
						    	        	var iframe = Ext.getBody().createChild({
						    	        		tag : 'iframe',
						    	        		cls : 'x-hidden',
						    	        		src : downUrl,
						    	        		onload : 'Ext.getBody().unmask(); var t = Ext.get(this); t.remove.defer(1000, t);'
						    	        	});
						    	    	}
						    	    },
						    	    {
						    	    	xtype : 'button',
						    	    	margin: '10 10 10 10',
						    	    	text : 'SM SR Order Comb',
						    	    	handler : function() {
						    	    		
						    	        	var project = 'SRNBSS';
						    	        	var issueTypeId = '141';
						    	        	var issueTypeName = 'SM SR Order Comb';
						    	        	
						    	        	
//						    	        	var iframe = document.getElementById("excel-down-iframe");
						    	    		var downUrl = G_PATH + '/jira/sr/excel/download.do?project=' + project 
						    	    												 + '&issueTypeId=' + issueTypeId
						    	    												 + '&issueTypeName=' + issueTypeName;
						    	        	
						    	        	var iframe = Ext.getBody().createChild({
						    	        		tag : 'iframe',
						    	        		cls : 'x-hidden',
						    	        		src : downUrl,
						    	        		onload : 'Ext.getBody().unmask(); var t = Ext.get(this); t.remove.defer(1000, t);'
						    	        	});
						    	    	}
						    	    },
						    	    {
						    	    	xtype : 'button',
						    	    	margin: '10 10 10 10',
						    	    	text : 'SM SR CDM',
						    	    	handler : function() {
						    	    		
						    	        	var project = 'SRNBSS';
						    	        	var issueTypeId = '142';
						    	        	var issueTypeName = 'SM SR CDM';
						    	        	
						    	        	
//						    	        	var iframe = document.getElementById("excel-down-iframe");
						    	    		var downUrl = G_PATH + '/jira/sr/excel/download.do?project=' + project 
						    	    												 + '&issueTypeId=' + issueTypeId
						    	    												 + '&issueTypeName=' + issueTypeName;
						    	        	
						    	        	var iframe = Ext.getBody().createChild({
						    	        		tag : 'iframe',
						    	        		cls : 'x-hidden',
						    	        		src : downUrl,
						    	        		onload : 'Ext.getBody().unmask(); var t = Ext.get(this); t.remove.defer(1000, t);'
						    	        	});
						    	    	}
						    	    },
						    	    {
						    	    	xtype : 'panel'
						    	    },
						    	    {
						    	    	xtype : 'button',
						    	    	margin: '10 10 10 10',
						    	    	text : 'SM SR Bill',
						    	    	handler : function() {
						    	    		
						    	        	var project = 'SRNBSS';
						    	        	var issueTypeId = '143';
						    	        	var issueTypeName = 'SM SR Bill';
						    	        	
						    	        	
//						    	        	var iframe = document.getElementById("excel-down-iframe");
						    	    		var downUrl = G_PATH + '/jira/sr/excel/download.do?project=' + project 
						    	    												 + '&issueTypeId=' + issueTypeId
						    	    												 + '&issueTypeName=' + issueTypeName;
						    	        	
						    	        	var iframe = Ext.getBody().createChild({
						    	        		tag : 'iframe',
						    	        		cls : 'x-hidden',
						    	        		src : downUrl,
						    	        		onload : 'Ext.getBody().unmask(); var t = Ext.get(this); t.remove.defer(1000, t);'
						    	        	});
						    	    	}
						    	    },
						    	    {
						    	    	xtype : 'button',
						    	    	margin: '10 10 10 10',
						    	    	text : 'SM SR AR',
						    	    	handler : function() {
						    	    		
						    	        	var project = 'SRNBSS';
						    	        	var issueTypeId = '144';
						    	        	var issueTypeName = 'SM SR AR';
						    	        	
						    	        	
//						    	        	var iframe = document.getElementById("excel-down-iframe");
						    	    		var downUrl = G_PATH + '/jira/sr/excel/download.do?project=' + project 
						    	    												 + '&issueTypeId=' + issueTypeId
						    	    												 + '&issueTypeName=' + issueTypeName;
						    	        	
						    	        	var iframe = Ext.getBody().createChild({
						    	        		tag : 'iframe',
						    	        		cls : 'x-hidden',
						    	        		src : downUrl,
						    	        		onload : 'Ext.getBody().unmask(); var t = Ext.get(this); t.remove.defer(1000, t);'
						    	        	});
						    	    	}
						    	    },
						    	    {
						    	    	xtype : 'button',
						    	    	margin: '10 10 10 10',
						    	    	text : 'SM SR OnBill',
						    	    	handler : function() {
						    	    		
						    	        	var project = 'SRNBSS';
						    	        	var issueTypeId = '145';
						    	        	var issueTypeName = 'SM SR OnBill';
						    	        	
						    	        	
//						    	        	var iframe = document.getElementById("excel-down-iframe");
						    	    		var downUrl = G_PATH + '/jira/sr/excel/download.do?project=' + project 
						    	    												 + '&issueTypeId=' + issueTypeId
						    	    												 + '&issueTypeName=' + issueTypeName;
						    	        	
						    	        	var iframe = Ext.getBody().createChild({
						    	        		tag : 'iframe',
						    	        		cls : 'x-hidden',
						    	        		src : downUrl,
						    	        		onload : 'Ext.getBody().unmask(); var t = Ext.get(this); t.remove.defer(1000, t);'
						    	        	});
						    	    	}
						    	    },
						    	    {
						    	    	xtype : 'button',
						    	    	margin: '10 10 10 10',
						    	    	text : 'SM SR MZN',
						    	    	handler : function() {
						    	    		
						    	        	var project = 'SRNBSS';
						    	        	var issueTypeId = '146';
						    	        	var issueTypeName = 'SM SR MZN';
						    	        	
						    	        	
//						    	        	var iframe = document.getElementById("excel-down-iframe");
						    	    		var downUrl = G_PATH + '/jira/sr/excel/download.do?project=' + project 
						    	    												 + '&issueTypeId=' + issueTypeId
						    	    												 + '&issueTypeName=' + issueTypeName;
						    	        	
						    	        	var iframe = Ext.getBody().createChild({
						    	        		tag : 'iframe',
						    	        		cls : 'x-hidden',
						    	        		src : downUrl,
						    	        		onload : 'Ext.getBody().unmask(); var t = Ext.get(this); t.remove.defer(1000, t);'
						    	        	});
						    	    	}
						    	    },
						    	    {
						    	    	xtype : 'button',
						    	    	margin: '10 10 10 10',
						    	    	text : 'SM SR IRIS',
						    	    	handler : function() {
						    	    		
						    	        	var project = 'SRNBSS';
						    	        	var issueTypeId = '147';
						    	        	var issueTypeName = 'SM SR IRIS';
						    	        	
						    	        	
//						    	        	var iframe = document.getElementById("excel-down-iframe");
						    	    		var downUrl = G_PATH + '/jira/sr/excel/download.do?project=' + project 
						    	    												 + '&issueTypeId=' + issueTypeId
						    	    												 + '&issueTypeName=' + issueTypeName;
						    	        	
						    	        	var iframe = Ext.getBody().createChild({
						    	        		tag : 'iframe',
						    	        		cls : 'x-hidden',
						    	        		src : downUrl,
						    	        		onload : 'Ext.getBody().unmask(); var t = Ext.get(this); t.remove.defer(1000, t);'
						    	        	});
						    	    	}
						    	    }
						    	 ]
						     }
						],
						listeners : {
							afterrender : function(p, etc) {
							},
							beforerender( p, eOpts ) {
								Ext.getBody().mask("Loading...");
								ProjectInfo._get();
							}
						},
						bbar: [{
							xtype: 'button',
							text : '적용',
							ui : 'gray',
							handler: function() {
								var form = Ext.getCmp('status-form');
						    	var formData = form.getForm().getValues();
						    	ProjectInfo._apply(formData);
							}
						}]
					}    
			]
		}
	]
});
var ProjectInfo = {
	_get : function() {
		Ext.Ajax.request({
			url: G_PATH + '/project/status/get.json',
			method : 'POST',
			headers : {'Content-Type' : 'application/json'},
			params : (Ext.JSON.encode({})),
			success: function(res, eOtps) {
				var temp = res.responseText;
				var form = Ext.getCmp('status-form');
				var data =  Ext.JSON.decode(temp).status;
				var r = Ext.create('Ext.setting.model.ProjectStatus', {
					mainLight: data.mainLight,
					connUserLight: data.connUserLight,
					bizLight: data.bizLight,
					iscLight: data.iscLight,
					useYn: data.useYn,
					limitConnectionCount : data.limitConnectionCount,
					cutoverStartDate : data.cutoverStartDate,
					cutoverEndDate : data.cutoverEndDate,
					defectStartDate : data.defectStartDate,
					defectEndDate : data.defectEndDate,
					svnCheckYn : data.svnCheckYn
		        });
				form.getForm().loadRecord(r);
				Ext.getBody().unmask();
			},
			failure: function(res, eOtps) {
				Ext.getBody().unmask();
			}
			
		});
	},
	_apply : function(data) {
		var url = G_PATH + '/project/status/modify.json';
		Ext.Ajax.request({
    	    url: url,
    	    method: 'POST',
    	    jsonData: Ext.encode(data),
    	    success: function(response){
    	    	var result = JSON.parse(response.responseText);
    	    	if (result.error != null) {
    				Ext.Msg.alert('Exception', result.error.message);
    			} else {
    				Ext.Msg.alert('Compete', '상태 변경이 완료되었습니다.');
    				ProjectInfo._get();
    			}
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', 'Save Error');
    	    }
    	});
	}
};