var TrafficLight = {
	_getHtml : function() {
		var result = '';
		result +=  '<div style="height:110px;background-color:#8fc33a; padding:10px;">'
			   +  '<center><font color="white" size="3"> Open Dashboard'
			   +  '<br>PA1-1 K-CRM(B2C), K-CDM Open: 16`02.09</font></center>'
			   +  '<p><center><b><font size="3"><span id="countdown"></span></font></b></p></center>'
			   +  '</div>';
		
		return result;
	},
	_getTrafficHtml : function(target) {
		var classRed = target == 'red' ? 'class="active"' :'';
		var classOrange = target == 'orange' ? 'class="active"' :'';
		var classGreen = target == 'green' ? 'class="active"' :'';
		var result = '';
		result = '<div id="light"><span ' + classRed + ' id="red_m" onclick="TrafficLight._changeTrafficLight(this);">'
			+ '</span><span ' + classOrange + ' id="orange_m" onclick="TrafficLight._changeTrafficLight(this);"></span>'
			+ '<span ' + classGreen + ' id="green_m" onclick="TrafficLight._changeTrafficLight(this);"></span>';
		return result;
	},
	_changeTrafficLight : function(obj) {
		if (G_IS_HADNS == "Y") {
			var win = Ext.create("Ext.window.Window",{
				title : '프로젝트 상태 설정',
				height: 300,
				width : 400,
				closable : true,
				autoScroll: true,
				modal : true,
				items : [{
					xtype : 'form',
					id : 'status-form',
					labelWidth: 200,
					labelAlign: 'right',
					margin: '10 10 10 10',
					bodyPadding: 10,
				    minHeight: 200,
					defaultType: 'textfield',
					items :[
					{
					    fieldLabel: '메인 상태',
					    xtype: 'radiogroup',
					    items:[
			                   {boxLabel: 'red', name:'mainLight', inputValue:'red'},
			                   {boxLabel: 'orange', name:'mainLight', inputValue:'orange'},
			                   {boxLabel: 'green', name:'mainLight', inputValue:'green'}
			               ]
					},{
						fieldLabel: '접속자 상태',
					    xtype: 'radiogroup',
					    items:[
			                   {boxLabel: 'red', name:'connUserLight', inputValue:'red'},
			                   {boxLabel: 'orange', name:'connUserLight', inputValue:'orange'},
			                   {boxLabel: 'green', name:'connUserLight', inputValue:'green'}
			               ]
					},{
						fieldLabel: '업무처리 상태',
					    xtype: 'radiogroup',
					    items:[
			                   {boxLabel: 'red', name:'bizLight', inputValue:'red'},
			                   {boxLabel: 'orange', name:'bizLight', inputValue:'orange'},
			                   {boxLabel: 'green', name:'bizLight', inputValue:'green'}
			               ]
					},{
						fieldLabel: 'ISC 상태',
					    xtype: 'radiogroup',
					    items:[
			                   {boxLabel: 'red', name:'iscLight', inputValue:'red'},
			                   {boxLabel: 'orange', name:'iscLight', inputValue:'orange'},
			                   {boxLabel: 'green', name:'iscLight', inputValue:'green'}
			               ]
					},{
						fieldLabel: '사용 여부',
					    xtype: 'radiogroup',
					    items:[
			                   {boxLabel: '사용', name:'useYn', inputValue:'Y'},
			                   {boxLabel: '미사용', name:'useYn', inputValue:'N'}
			               ]
					},{
						fieldLabel: '최대 접속자 수',
					    name : 'limitConnectionCount'
					}]
				}],
				listeners : {
					afterrender : function(p, etc) {
						
						var r = Ext.create('Ext.portal.model.ProjectStatus', {
							mainLight: projectStatus.mainLight,
							connUserLight: projectStatus.connUserLight,
							bizLight: projectStatus.bizLight,
							iscLight: projectStatus.iscLight,
							useYn: projectStatus.useYn,
							limitConnectionCount : projectStatus.limitConnectionCount
				        });
						
						p.items.items[0].loadRecord(r);
					}
				},
				bbar: [{
					xtype: 'button',
					text : '적용',
					handler: function() {
						var form = Ext.getCmp('status-form');
				    	var formData = form.getForm().getValues();
						TrafficLight._applyStatus(formData);
						win.close();
					}
				},{
					xtype: 'button',
					text : '취소',
					handler: function() {
						win.close();
					}
				}]
			});
			win.show();
		}
	},
	_applyStatus : function(data) {
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
    			}
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', 'Save Error');
    	    }
    	});
	}
};


Ext.define('Ext.portal.view.Viewport', {
    extend: 'Ext.container.Viewport',  
    requires: [
   			'Ext.layout.container.Border',
   			'Ext.dashboard.Dashboard',
			'Ext.portal.view.Portal',
			'Ext.portal.view.ConnUserChart',
			'Ext.portal.view.ConnUserGrid',
			'Ext.portal.view.BizProcessChart',
			'Ext.portal.view.BizProcessGrid',
			'Ext.portal.view.QuestionChart',
			'Ext.portal.view.QuestionGrid',
			'Ext.portal.view.IssueGrid',
			'Ext.portal.view.ItsmGrid',
			'Ext.portal.view.WfmGrid',
			'Ext.portal.view.HelfGrid',
			'Ext.portal.view.QuestionTopChart',
			'Ext.portal.view.JiraLevelGrid',
			'Ext.portal.view.JiraChannelGrid',
			'Ext.portal.view.OpenIssueChart',
			'Ext.portal.view.OpenIssueOriginationChart'
			
	   ],
	   overflowY:'auto',
	   autoScroll: true,
   
	   initComponent: function() {

        var me = this;
        
        Ext.apply(me, {
        	items: [
					{
					    xtype: 'panel',
					    padding: '5 5 5 5',
					    minHeight: 100,
					    items:[{
					    	layout: 'column',
					    	items: [{
					    		xtype: 'panel',
					    		layout:'fit',
					    		border : 0,
					    		minHeight:100,
								items :[{
									xtype : 'panel',
									border : 0,
									html : TrafficLight._getHtml()
								}
								],
					    		columnWidth : .20
					    	},{
					    		xtype: 'panel',
					    		layout:'fit',
					    		border : 0,
					    		minHeight:100,
					    		columnWidth : .02,
					    		listeners : {
					    			beforerender( p, eOpts ) {
					    				Ext.getBody().mask("Loading...");
					    				Ext.Ajax.request({
					    					url: G_PATH + '/project/status/get.json',
					    					method : 'POST',
					    					headers : {'Content-Type' : 'application/json'},
					    					params : (Ext.JSON.encode({})),
					    					success: function(res, eOtps) {
					    						var temp = res.responseText;
					    						var data = 'green';
					    						projectStatus =  Ext.JSON.decode(temp).status;
					    						if (projectStatus.useYn == "Y") {
					    							data = projectStatus.mainLight;
					    						} 
					    						var html = TrafficLight._getTrafficHtml(data);
				    							p.update(html);
					    						Ext.getBody().unmask();
					    					},
					    					failure: function(res, eOtps) {
					    						Ext.getBody().unmask();
					    					}
					    					
					    				});
					    			}
					    		}
					    	},{
					    		xtype: 'panel',
					    		title:'접속자(대상/최근)',
					    		titleAlign: 'center',
					    		id: 'conn-top',
					    		border: 0,
					    		minHeight:100,
					    		columnWidth : .13,
					    		layoutConfig: {
					    			pack : 'center',
					    			align: 'middle'
					    		},
					    		html:''
					    	},
					    	{
					    		xtype: 'panel',
					    		title:'업무처리',
					    		titleAlign: 'center',
					    		id: 'biz-top',
					    		border: 0,
					    		minHeight:100,
					    		columnWidth : .13,
					    		html:''
					    	},
					    	{
					    		xtype: 'panel',
					    		title:'문의',
					    		titleAlign: 'center',
					    		border: 0,
					    		minHeight:100,
					    		columnWidth : .10,
					    		id: 'que-top',
					    		html:''
					    	},
					    	{
					    		xtype: 'panel',
					    		title:'대기',
					    		titleAlign: 'center',
					    		border: 0,
					    		minHeight:100,
					    		columnWidth : .10,
					    		id: 'q1-top',
					    		html:''
					    	},
					    	{
					    		xtype: 'panel',
					    		title:'처리중(1선/1.5선/2선)',
					    		titleAlign: 'center',
					    		border: 0,
					    		minHeight:100,
					    		columnWidth : .13,
					    		id: 'q15-top',
					    		html:''
					    	},
					    	{
					    		xtype: 'panel',
					    		title:'조치완료/종료',
					    		titleAlign: 'center',
					    		border: 0,
					    		minHeight:100,
					    		columnWidth : .10,
					    		id: 'q2-top',
					    		html:''
					    	},{
					    		xtype: 'form',
					    		border: 1,
					    		minHeight:100,
					    		title:'옵션',
					    		titleAlign: 'center',
					    		columnWidth : .09,
					    		buttonAlign: 'center',
					    		items:[{
					    			xtype: 'datefield',
					    			padding: '5 5 5 5',
					    			anchor: '100%',
					    			id : 'search-date',
					    			name : 'search-date',
					    			format: 'Y-m-d',
					    			value : new Date()
					    		}
					    		],
					    		buttons:[{
					    			text : '조회',
					    			handler : function() {
					    				var searchDate = Ext.getCmp('search-date').getValue();
					    				var param = DateUtil._formatDateYmd(searchDate, 0);
					    				PortalCore._reloadPortal(param);
					    			}
					    		}
					    		]
					    	}
					    	]
					    }]
					},
        	        {
						xtype: 'panel',
					    minHeight: 100,
					    items:[{
					    	layout: 'column',
					    	items: [{
   			                    title: '접속자 현황',
   			                    titleAlign: 'center',
   			                    padding: '5 5 5 5',
   			                    columnWidth : .22,
   			                    minHeight: 790,
   			                    id: 'conn-pt',
   			                    items :[{
	   			         			xtype : 'connusergrid'
	   			         		}]
					    	},{
   			                    title: '업무처리 현황',
   			                    titleAlign: 'center',
   			                    padding: '5 5 5 5',
			                    columnWidth : .22,
			                    minHeight: 790,
   			                    id: 'biz-pt',
	   			                items :[{
	   			                    	xtype:'bizprocessgrid'
	   			                    }    
			                    ]
   			                },{
   			                    title: 'ISC접수/Defect 현황',
   			                    titleAlign: 'center',
   			                    padding: '5 5 5 5',
			                    columnWidth : .56,
			                    minHeight: 790,
   			                    id: 'isc-pt',
	   			                items :[{
	   			                    layout: 'column',
	   			                    items:[{
	   			                    	  xtype : 'questiongrid',
	   			                    	  columnWidth : .34
			   			                },{
			   			        			xtype : 'wfmgrid',
			   			        			columnWidth : .66
			   			        		}
			   			            ]
   			                	  },{
   			                		layout: 'column',
   			                		items: [{
		   			 		    			xtype : 'itsmgrid',
		   					    			columnWidth : .34
		   					    		},{
		   					    			xtype : 'helfgrid',
		   					    			columnWidth : .66
		   					    		}
   			                		]
   			                	  },{
 			                		layout: 'column',
   			                		items: [{
	   					    			xtype : 'jiralevelgrid',
	   					    			columnWidth : .34
	   					    		},{
		   					    			xtype : 'jirachannelgrid',
		   					    			columnWidth : .66
		   					    		}
   			                		]
   			                	  }
			                    ]
   			                }
					     ]
					    }
					    ]
	                }	
        	        
                ]
        });
                
        me.callParent(arguments);
        
        var target_date = new Date('2016-02-09 10:00:00').getTime();
        var days, hours, minutes, seconds;

        var countdown = document.getElementById("countdown");

        setInterval(function(){
        	var cureent_date = new Date().getTime();
        	var seconds_left = (target_date-cureent_date) / 1000;
        	days = parseInt( seconds_left / 86400 );
        	seconds_left = seconds_left % 86400;
        	
        	hours = parseInt( seconds_left / 3600 );
        	seconds_left = seconds_left % 3600;
        	
        	minutes = parseInt( seconds_left / 60 );
        	seconds = parseInt(seconds_left % 60);
        	
        	if (countdown == null){
        		countdown = document.getElementById("countdown");
        	}
        	countdown.innerHTML = "D" +  ((-1)*days >= 0 ? "+" :"") +  ((-1)*(days)+ 1) + "일차 " + (hours < 0 ? (-1)*hours : hours) + "시간 " + (minutes <0 ? (-1)*minutes : minutes) + "분 " + (seconds <0 ? (-1)*seconds : seconds) + "초";
        }, 1000);
    }
});

