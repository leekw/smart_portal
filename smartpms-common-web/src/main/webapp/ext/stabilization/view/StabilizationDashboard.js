Ext.define('Ext.stabilization.view.StabilizationDashboard', {
    extend: 'Ext.container.Container',
    xtype: 'stabliizationdashboard',
    itemId: 'stabliizationdashboard',
    border : false,
    requires: [
		
    ],
    
    layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
    items: [

		{
		    xtype: 'widget-top',
		    border : false,
		    style : {
		    	'background-color' : '#673ab7'
		    },
		    containerColor: 'blue',
		    id : 'conn-top',
		    responsiveCls: 'big-10 small-50',
		    data: {
		        amount: 0,
		        type: '접속수(대상/최근)',
		        icon: 'users',
		        color : 'blue',
		        background :'#673ab7'
		    }
		},
		{
		    xtype: 'widget-top',
		    border : false,
		    style : {
		    	'background-color' : '#c0c0c0'
		    },
		    id : 'biz-top',
		    containerColor: 'gray',
		    responsiveCls: 'big-10 small-50',
		    data: {
		        amount: 0,
		        type: '업무처리',
		        icon: 'tasks',
		        color : 'gray',
		        background :'#c0c0c0'
		    }
		},
		{
		    xtype: 'widget-top',
		    border : false,
		    style : {
		    	'background-color' : '#ffc107'
		    },
		    containerColor: 'orange',
		    id : 'que-top',
		    responsiveCls: 'big-10 small-50',
		    data: {
		        amount: 0,
		        type: '문의',
		        icon: 'question-circle',
		        color : 'orange',
		        background :'#ffc107'
		    }
		},
		{
		    xtype: 'widget-top',
		    border : false,
		    style : {
		    	'background-color' : '#4caf50'
		    },
		    containerColor: 'green',
		    id : 'wait-top',
		    responsiveCls: 'big-10 small-50',
		    data: {
		        amount: 0,
		        type: '대기',
		        icon: 'pause',
		        color : 'green',
		        background :'#4caf50'
		    }
		},
		{
		    xtype: 'widget-top',
		    border : false,
		    style : {
		    	'background-color' : '#e91e63'
		    },
		    containerColor: 'pink',
		    id : 'proc-top',
		    responsiveCls: 'big-10 small-50',
		    data: {
		        amount: 0,
		        type: '처리중(1/1.5/2)',
		        icon: 'gears',
		        color : 'pink',
		        background :'#e91e63'
		    }
		},
		{
		    xtype: 'widget-top',
		    border : false,
		    style : {
		    	'background-color' : '#458fd2'
		    },
		    containerColor: 'cornflower-blue',
		    id : 'comp-top',
		    responsiveCls: 'big-10 small-50',
		    data: {
		        amount: 0,
		        type: '조치완료/종료',
		        icon: 'check',
		        color : 'cornflower-blue',
		        background :'#458fd2'
		    }
		},
		{
		    xtype: 'panel',
		    border : false,
		    height: 90,
		    id: 'header-top',
		    bodyStyle: {
		        background: 'none'
		    },
		    html : '<div style="width:100%;text-align:-webkit-center;float:center;font-size:18px;font-weight:800;vertical-align:middle;">PA2 Billing Open : <span style="color:#e91e63">2016.09.12 08:00</span>&nbsp;&nbsp;&nbsp;<span style="cursor:pointer;cursor:hand;" onclick="ViewInfo._openCalendar()"><i class="x-fa fa-calendar fa-1x"></i></span><span id="search-day" style="font-size:10px;">&nbsp;(2016-02-17)</span></div>'
		    	   + '<div style="width:100%;text-align:center;" id="clock"><div class="clock" style="display:inline-block;width:auto;"></div></div>',
		    listeners : {
		    	afterrender : function() {
		    		var clock, clock2, _time;
		    		var isUpClock = false;
		    		
		    		$(document).ready(function() {
		    			var clock;

		    			clock = $('.clock').FlipClock({
		    		        clockFace: 'DailyCounter',
		    		        autoStart: false,
		    		        callbacks: {
		    		        	stop: function() {
		    		        		clock2 = $('.clock').FlipClock({
					    		        clockFace: 'DailyCounter',
					    		        autoStart: false
					    		    });
									clock2.start();
		    		        	},
		    		        	interval: function() {
		    		        		_time = clock.getTime();
		    		        		if (_time == 0) {
		    		        			_time = 0;
		    		        			clock.setTime(0);
		    		        			clock.stop();
		    		        		}
		    		        	}
		    		        }
		    		    });
		    			
		    			var now = new Date();
		    			var checkDate = new Date(2016, 8, 12, 08, 00, 0);
		    			var times =  (checkDate.getTime() - now.getTime())/1000;
		    			if (times > 0) {
			    		    clock.setTime(times);
			    		    clock.setCountdown(true);
		    			} else {
		    				times =  (now.getTime() - checkDate.getTime())/1000;
		    				clock.setTime(times);
		    			}
		    		    clock.start();

		    		});
		    	},
		    	resize : function (panel, width, height) {
//		    		var width = panel.getWidth();
//		    		var div = Ext.get('clock');
//		    		var html;
//		    		if (width > 500) {
//		    			div.dom.childNodes[0].style = "width:100%;float:left;left:17.5%;";
//		    		} else {
//		    			div.dom.childNodes[0].style = "width:100%;float:left;left:7.5%;";
//		    		}
		    	}
		    },
		    responsiveCls: 'big-40 small-50'
		},
		{
		    xtype: 'panel',
		    title : '접속자 추이',
		    id : 'chart-hist-title',
		    iconCls: 'x-fa fa-line-chart',
		    items : [ {
		    	xtype : 'panel',
		    	border :false,
		    	items : [
		    	   {
		    		   xtype : 'connuserchart',
		    		   id : 'conn-chart',
		    		   border :false
		    	   },
		    	   {
		    		   xtype : 'bizprocesschart',
		    		   id : 'biz-chart',
		    		   border :false,
		    		   hidden : true
		    	   },
		    	   {
		    		   xtype : 'jirachart',
		    		   id : 'jira-chart',
		    		   border :false,
		    		   hidden : true
		    	   }
		    	]
		    },{
		       xtype : 'panel',
		       layout: {
		           type: 'hbox',
		           align: 'stretch'
		       },
		       border : false,
		       items :[
					{
					    xtype: 'connusergrid',
					    height: 350,
					    padding : 5,
					    border:false,
					    width: '33.5%',
					    id: 'conn-grid'
					},
					{
					    xtype: 'bizprocessgrid',
					    height: 350,
					    padding : 5,
					    border:false,
					    width: '33.5%',
					    id: 'biz-grid'
					},
					{
					    xtype: 'stabilizationpiechart',
					    height: 350,
					    padding : 5,
					    border:false,
					    width: '33.5%'
					}
		       ]
		    }
		    ],
		    tools: [
				{
					xtype: 'tool', 
					cls: 'x-fa fa-refresh dashboard-tools2',
				    tooltip: '새로고침',
				    width: 20,
				    height: 20,
				    handler : function() {
				    	var chart1 = Ext.getCmp('conn-chart-detail');
				    	var chart2 = Ext.getCmp('biz-chart-detail');
				    	var chart5 = Ext.getCmp('jira-chart-detail');
				    	var grid1 = Ext.getCmp('conn-grid');
				    	var grid2 = Ext.getCmp('biz-grid');
				    	var proxy = chart1.getStore().getProxy();
				    	var date = new Date();
				    	var paramDay = DateUtil._formatDateYmd(date, 0);
				    	chart1.getStore().load();
				    	chart1.redraw();
				    	chart2.getStore().load();
				    	chart2.redraw();
				    	chart5.getStore().load();
				    	chart5.redraw();
				    	grid1.getStore().getProxy().extraParams.day = paramDay;
				    	grid1.getStore().load();
				    	grid2.getStore().getProxy().extraParams.day = paramDay;
				    	grid2.getStore().load();
				    	_connUserHours = null;
				    	_bizTypeHours = null;
				    	
				    	var label = Ext.getCmp('conn-grid-label');
						var html =  '<div><div style="float:left;"><span style="cursor:pointer;cursor:hand;" onclick="ViewInfo._changeChart(1)"><i class="x-fa fa-circle" style="color:#4caf50"></i><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;접속자 현황-' + DateTemp._getHours() + '시 </span></span></div>'
						          + (G_IS_HADNS == 'Y' ? '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="ViewInfo._openTime(1)"><i class="x-fa fa-clock-o" style="padding-right:5px;"></i></span><span style="cursor:pointer;cursor:hand;" onclick="GridAction._add(\'conn-grid\')"><i class="x-fa fa-plus" style="padding-right:5px;"></i></span>'
				        		  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._remove(\'conn-grid\')"><i class="x-fa fa-trash" style="padding-right:5px;"></i></span>'
				        		  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._saveGrid(\'conn-grid\')"><i class="x-fa fa-save" style="padding-right:5px;"></i></span></div>'
				        		  : '')
				        		  + '</div>';
						label.setHtml(html);
						
						var label2 = Ext.getCmp('biz-grid-label');
						var html2 =  '<span style="cursor:pointer;cursor:hand;" onclick="ViewInfo._changeChart(2)"><div><div style="float:left;"><i class="x-fa fa-circle" style="color:#4caf50"></i><span sytle="font-size:14px;font-weight:800 !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;업무처리 현황-' + DateTemp._getHours() + '시</span></div></span>'
						          + (G_IS_HADNS == 'Y' ? '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="ViewInfo._openTime(2)"><i class="x-fa fa-clock-o" style="padding-right:5px;"></span></i><span style="cursor:pointer;cursor:hand;" onclick="GridAction._add(\'biz-grid\')"><i class="x-fa fa-plus" style="padding-right:5px;"></i></span>'
								  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._remove(\'biz-grid\')"><i class="x-fa fa-trash" style="padding-right:5px;"></i></span>'
								  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._saveGrid(\'biz-grid\')"><i class="x-fa fa-save" style="padding-right:5px;"></i></span></div>'
								  : '')
								  + '</div>';
						label2.setHtml(html2);
						
				    	var pieChartPanel = Ext.getCmp('pie-chart-label');
				    	pieChartPanel.setHtml('<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800 !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;전일 동시간대 비교 - ' + DateTemp._getHours() + '시 기준</div></div>');
				    }
				}
		    ],        
    	    listeners : {
    	    	afterrender : function(panel) {
    	    		var header = panel.header;
    	    		header.setStyle('background-color', '#fafafa');
    	    		header.setStyle('border-color', '#d0d0d0');
    	    	}
    	    },
		    responsiveCls: 'big-60 small-100'
		},
		{
		    xtype: 'panel',
		    title : 'WFM 기준 현황 / 문의유형 TOP5',
		    iconCls: 'x-fa fa-list-alt',
		    height: 350,
		    items : [
				{
					xtype : 'panel',
					layout: {
					    type: 'hbox',
					    align: 'stretch'
					},
					items :[
							{
							    xtype: 'wfmgrid',
							    height: 350,
							    padding : 5,
							    border:false,
							    width: '59.5%',
							    id: 'wfm-grid'
							},
							{
							    xtype: 'questiongrid',
							    height: 350,
							    padding : 5,
							    border:false,
							    width: '39.5%',
							    id: 'que-grid'
							}
					]
				}
		    ], 
		    tools: [
				{
					xtype: 'tool', 
					cls: 'x-fa fa-refresh dashboard-tools2',
				    tooltip: '새로고침',
				    width: 20,
				    height: 20,
				    handler : function() {
				    	var grid1 = Ext.getCmp('wfm-grid');
				    	var grid2 = Ext.getCmp('que-grid');
				    	grid1.getStore().load();
				    	grid2.getStore().load();
				    }
				}
		    ],
		    listeners : {
    	    	afterrender : function(panel) {
    	    		var header = panel.header;
    	    		header.setStyle('background-color', '#fafafa');
    	    		header.setStyle('border-color', '#d0d0d0');
    	    	}
    	    },
		    responsiveCls: 'big-40 small-100'
		},
		{
		    xtype: 'panel',
		    title : 'ITSM/Help Desk 현황',
		    iconCls: 'x-fa fa-list-alt',
		    id : 'issue-panel',
		    height: 327,
		    items : [
				{
					xtype : 'panel',
					layout: {
					    type: 'vbox',
					    align: 'stretch'
					},
					items :[
							{
							    xtype: 'itsmgrid',
							    height: 150,
							    padding : 5,
							    border:false,
							    id: 'itsm-grid'
							},
							{
							    xtype: 'helfgrid',
							    height: 160,
							    padding : 5,
							    border:false,
							    id: 'helf-grid'
							},
							{
							    xtype: 'jiralevelgrid',
							    height: 300,
							    padding : 5,
							    border:false,
							    hidden : true,
							    id: 'jiralevel-grid'
							}
					]
				}
		    ], 
		    tools: [
				{
					xtype: 'tool', 
					cls: 'x-fa fa-share-alt dashboard-tools2',
				    tooltip: 'ITSM 현황 조회',
				    width: 20,
				    height: 20,
				    handler : function() {
				    	var grid1 = Ext.getCmp('itsm-grid');
				    	var grid2 = Ext.getCmp('helf-grid');
				    	grid1.setHidden(false);
				    	grid2.setHidden(false);
				    	var grid3 = Ext.getCmp('jiralevel-grid');
				    	grid3.setHidden(true);
				    	var panel = Ext.getCmp('issue-panel');
				    	panel.setTitle('ITSM/Help Desk 현황');
				    }
				},
				{
					xtype: 'tool', 
					cls: 'x-fa fa-tags dashboard-tools2',
				    tooltip: 'JIRA Defect 조회',
				    width: 20,
				    height: 20,
				    handler : function() {
				    	var grid1 = Ext.getCmp('itsm-grid');
				    	var grid2 = Ext.getCmp('helf-grid');
				    	grid1.setHidden(true);
				    	grid2.setHidden(true);
				    	var grid3 = Ext.getCmp('jiralevel-grid');
				    	grid3.setHidden(false);
				    	var panel = Ext.getCmp('issue-panel');
				    	panel.setTitle('JIRA Defect 현황');
				    }
				},
				{
					xtype: 'tool', 
					cls: 'x-fa fa-refresh dashboard-tools2',
				    tooltip: '새로고침',
				    width: 20,
				    height: 20,
				    handler : function() {
				    	var grid1 = Ext.getCmp('itsm-grid');
				    	var grid2 = Ext.getCmp('helf-grid');
				    	var grid3 = Ext.getCmp('jiralevel-grid');
				    	grid1.getStore().load();
				    	grid2.getStore().load();
				    	grid3.getStore().load();
				    }
				}
		    ],
		    listeners : {
    	    	afterrender : function(panel) {
    	    		var header = panel.header;
    	    		header.setStyle('background-color', '#fafafa');
    	    		header.setStyle('border-color', '#d0d0d0');
    	    	}
    	    },
		    responsiveCls: 'big-40'
		}
		
    ],
    listeners : {
    	afterrender : function() {
    		Ext.TaskManager.start({
    			run: ViewInfo._reload,
    			interval: 60000
    		});
    	}
    }
});

var G_SEARCH_DATE = null;
var G_SEARCH_DATE_VIEW = null;
var G_GRID_INDEX = 1;
var ViewInfo = {
	_reload : function() {
		var date =  new Date();
		var paramDay = (G_SEARCH_DATE == null ? DateUtil._formatDateYmd(date, 0) : G_SEARCH_DATE);
		Ext.get('search-day').dom.innerHTML = '&nbsp;(' + (G_SEARCH_DATE_VIEW == null ? DateUtil._formatDateNormal(date) : G_SEARCH_DATE_VIEW) + ')';
		var chart1 = Ext.getCmp('conn-chart-detail');
    	var chart2 = Ext.getCmp('biz-chart-detail');
    	var chart5 = Ext.getCmp('jira-chart-detail');
    	var grid1 = Ext.getCmp('conn-grid');
    	var grid2 = Ext.getCmp('biz-grid');
    	chart1.getStore().getProxy().extraParams.day = paramDay;
    	chart1.getStore().load();
    	chart1.redraw();
    	chart2.getStore().getProxy().extraParams.day = paramDay;
    	chart2.getStore().load();
    	chart2.redraw();
    	chart5.getStore().getProxy().extraParams.day = paramDay;
    	chart5.getStore().load();
    	chart5.redraw();
    	grid1.getStore().getProxy().extraParams.day = paramDay;
    	grid1.getStore().load();
    	grid2.getStore().getProxy().extraParams.day = paramDay;
    	grid2.getStore().load();
    	
    	grid3 = Ext.getCmp('wfm-grid');
    	grid4 = Ext.getCmp('que-grid');
    	grid3.getStore().getProxy().extraParams.day = paramDay;
    	grid3.getStore().load();
    	grid4.getStore().getProxy().extraParams.day = paramDay;
    	grid4.getStore().load();
    	
    	grid5 = Ext.getCmp('itsm-grid');
    	grid6 = Ext.getCmp('helf-grid');
    	grid5.getStore().getProxy().extraParams.day = paramDay;
    	grid5.getStore().load();
    	grid6.getStore().getProxy().extraParams.day = paramDay;
    	grid6.getStore().load();
    	var gridJira = Ext.getCmp('jiralevel-grid');
    	gridJira.getStore().load();
    	
    	var chart3 = Ext.getCmp('conn-pie-chart');
    	var chart4 = Ext.getCmp('biz-pie-chart');
    	ChangePieChart._loadChart(chart3, 'conn', paramDay);
    	ChangePieChart._loadChart(chart4, 'biz', paramDay);
    	
    	_connUserHours = null;
    	_bizTypeHours = null;
    	var label = Ext.getCmp('conn-grid-label');
		var html =  '<div><div style="float:left;"><span style="cursor:pointer;cursor:hand;" onclick="ViewInfo._changeChart(1)"><i class="x-fa fa-circle" style="color:#4caf50"></i><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;접속자 현황-' + DateTemp._getHours() + '시 </span></span></div>'
		          + (G_IS_HADNS == 'Y' ? '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="ViewInfo._openTime(1)"><i class="x-fa fa-clock-o" style="padding-right:5px;"></i></span><span style="cursor:pointer;cursor:hand;" onclick="GridAction._add(\'conn-grid\')"><i class="x-fa fa-plus" style="padding-right:5px;"></i></span>'
        		  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._remove(\'conn-grid\')"><i class="x-fa fa-trash" style="padding-right:5px;"></i></span>'
        		  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._saveGrid(\'conn-grid\')"><i class="x-fa fa-save" style="padding-right:5px;"></i></span></div>'
        		  : '')
        		  + '</div>';
		label.setHtml(html);
		
		var label2 = Ext.getCmp('biz-grid-label');
		var html2 =  '<span style="cursor:pointer;cursor:hand;" onclick="ViewInfo._changeChart(2)"><div><div style="float:left;"><i class="x-fa fa-circle" style="color:#4caf50"></i><span sytle="font-size:14px;font-weight:800 !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;업무처리 현황-' + DateTemp._getHours() + '시</span></div></span>'
		          + (G_IS_HADNS == 'Y' ? '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="ViewInfo._openTime(2)"><i class="x-fa fa-clock-o" style="padding-right:5px;"></span></i><span style="cursor:pointer;cursor:hand;" onclick="GridAction._add(\'biz-grid\')"><i class="x-fa fa-plus" style="padding-right:5px;"></i></span>'
				  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._remove(\'biz-grid\')"><i class="x-fa fa-trash" style="padding-right:5px;"></i></span>'
				  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._saveGrid(\'biz-grid\')"><i class="x-fa fa-save" style="padding-right:5px;"></i></span></div>'
				  : '')
				  + '</div>';
		label2.setHtml(html2);
    	
    	var pieChartPanel = Ext.getCmp('pie-chart-label');
    	pieChartPanel.setHtml('<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800 !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;전일 동시간대 비교 - ' + DateTemp._getHours() + '시 기준</div></div>');
	},
	_changeChart : function(index) {
		var chart1 = Ext.getCmp('conn-chart');
		var chart2 = Ext.getCmp('biz-chart');
		var chart3 = Ext.getCmp('jira-chart');
		var histHeader = Ext.getCmp('chart-hist-title');
		if (index == 1) {
			chart1.setHidden(false);
			chart2.setHidden(true);
			chart3.setHidden(true);
			histHeader.setTitle('접속자 추이');
		} else if (index == 2) {
			chart2.setHidden(false);
			chart1.setHidden(true);
			chart3.setHidden(true);
			histHeader.setTitle('업무처리 추이');
		} else {
			chart2.setHidden(true);
			chart1.setHidden(true);
			chart3.setHidden(false);
			histHeader.setTitle('JIRA Defect 발생 추이');
		}
	},
	_openTime : function(index) {
		G_GRID_INDEX = index;
		var win = Ext.getCmp('search-time');
		if (win == null) {  
			win = Ext.create('Ext.window.Window', {
				id : 'search-time',
	    	    title: '기준 시각',
	    	    resizable : false,
	    	    autoScroll: false,
	    	    maximizable : false,
	    	    closeAction: 'hide',
	    	    modal: true,
	    	    animateTarget:this,
	    	    items:[{
	    			xtype : 'timefield',
	    			increment: 60,
	    			format: 'H:i',
	    			value : new Date(),
	    			listeners : {
	    				change : function(time, newValue, oldValue, oOpts) {
	    					var date = new Date();
	    					var paramDay = DateUtil._formatDateYmd(date, 0);
	    					var hh = newValue.getHours().toString();
	    					var hhChars = hh.split('');
	    					var paramHours = (hhChars[1]?hh:"0"+hhChars[0]);
	    					paramDay = paramDay + paramHours;
	    					
	    					var grid1 = Ext.getCmp('conn-grid');
	    			    	var grid2 = Ext.getCmp('biz-grid');
	    			    	if (G_GRID_INDEX == 1) {
	    			    		_connUserHours = paramHours;
	    			    		var label = Ext.getCmp('conn-grid-label');
	    			    		var html =  '<div><div style="float:left;"><span style="cursor:pointer;cursor:hand;" onclick="ViewInfo._changeChart(1)"><i class="x-fa fa-circle" style="color:#4caf50"></i><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;접속자 현황-' + paramHours + '시 </span></span></div>'
	    	            		          + (G_IS_HADNS == 'Y' ? '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="ViewInfo._openTime(1)"><i class="x-fa fa-clock-o" style="padding-right:5px;"></i></span><span style="cursor:pointer;cursor:hand;" onclick="GridAction._add(\'conn-grid\')"><i class="x-fa fa-plus" style="padding-right:5px;"></i></span>'
	    	                    		  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._remove(\'conn-grid\')"><i class="x-fa fa-trash" style="padding-right:5px;"></i></span>'
	    	                    		  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._saveGrid(\'conn-grid\')"><i class="x-fa fa-save" style="padding-right:5px;"></i></span></div>'
	    	                    		  : '')
	    	                    		  + '</div>';
	    			    		label.setHtml(html);
		    			    	grid1.getStore().getProxy().extraParams.day = paramDay;
		    			    	grid1.getStore().load();
	    			    	} else {
	    			    		_bizTypeHours = paramHours;
	    			    		var label = Ext.getCmp('biz-grid-label');
	    			    		var html =  '<span style="cursor:pointer;cursor:hand;" onclick="ViewInfo._changeChart(2)"><div><div style="float:left;"><i class="x-fa fa-circle" style="color:#4caf50"></i><span sytle="font-size:14px;font-weight:800 !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;업무처리 현황-' + paramHours + '시</span></div></span>'
	    						          + (G_IS_HADNS == 'Y' ? '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="ViewInfo._openTime(2)"><i class="x-fa fa-clock-o" style="padding-right:5px;"></span></i><span style="cursor:pointer;cursor:hand;" onclick="GridAction._add(\'biz-grid\')"><i class="x-fa fa-plus" style="padding-right:5px;"></i></span>'
	    								  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._remove(\'biz-grid\')"><i class="x-fa fa-trash" style="padding-right:5px;"></i></span>'
	    								  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._saveGrid(\'biz-grid\')"><i class="x-fa fa-save" style="padding-right:5px;"></i></span></div>'
	    								  : '')
	    								  + '</div>';
	    			    		label.setHtml(html);
		    			    	grid2.getStore().getProxy().extraParams.day = paramDay;
		    			    	grid2.getStore().load();
	    			    	}
	    					
	    					win.close();
	    				}
	    			}
	    	    }]
			});
		}
		win.show();
	},
	_openCalendar : function() {
		var win = Ext.getCmp('search-cal');
		if (win != null) win.close();
		var win = Ext.create('Ext.window.Window', {
			id : 'search-cal',
    	    title: '대상기준일자',
    	    resizable : false,
    	    autoScroll: false,
    	    maximizable : false,
    	    modal: true,
    	    animateTarget:this,
    	    items:[{
    			xtype :	'datepicker',
    			handler : function(picker, date) {
    				
    				var paramDay = DateUtil._formatDateYmd(date, 0);
    				G_SEARCH_DATE_VIEW = DateUtil._formatDateNormal(date);
    				Ext.get('search-day').dom.innerHTML = '&nbsp;(' + DateUtil._formatDateNormal(date) + ')';
    				var chart1 = Ext.getCmp('conn-chart-detail');
			    	var chart2 = Ext.getCmp('biz-chart-detail');
			    	var chart5 = Ext.getCmp('jira-chart-detail');
			    	var grid1 = Ext.getCmp('conn-grid');
			    	var grid2 = Ext.getCmp('biz-grid');
			    	chart1.getStore().getProxy().extraParams.day = paramDay;
			    	chart1.getStore().load();
			    	chart1.redraw();
			    	chart2.getStore().getProxy().extraParams.day = paramDay;
			    	chart2.getStore().load();
			    	chart2.redraw();
			    	chart5.getStore().getProxy().extraParams.day = paramDay;
			    	chart5.getStore().load();
			    	chart5.redraw();
			    	grid1.getStore().getProxy().extraParams.day = paramDay;
			    	grid1.getStore().load();
			    	grid2.getStore().getProxy().extraParams.day = paramDay;
			    	grid2.getStore().load();
			    	
			    	grid3 = Ext.getCmp('wfm-grid');
			    	grid4 = Ext.getCmp('que-grid');
			    	grid3.getStore().getProxy().extraParams.day = paramDay;
			    	grid3.getStore().load();
			    	grid4.getStore().getProxy().extraParams.day = paramDay;
			    	grid4.getStore().load();
			    	
			    	grid5 = Ext.getCmp('itsm-grid');
			    	grid6 = Ext.getCmp('helf-grid');
			    	grid5.getStore().getProxy().extraParams.day = paramDay;
			    	grid5.getStore().load();
			    	grid6.getStore().getProxy().extraParams.day = paramDay;
			    	grid6.getStore().load();
			    	
			    	var gridJira = Ext.getCmp('jiralevel-grid');
			    	gridJira.getStore().load();
			    	
			    	var chart3 = Ext.getCmp('conn-pie-chart');
			    	var chart4 = Ext.getCmp('biz-pie-chart');
			    	ChangePieChart._loadChart(chart3, 'conn', paramDay);
			    	ChangePieChart._loadChart(chart4, 'biz', paramDay);
			    	G_SEARCH_DATE = paramDay;
			    	
    				win.close();
    			}
    	    }
    	    ]
    	  });
		win.show();
	}
};
var DateTemp = {
	_getHours : function() {
		var date = new Date();
		return date.getHours().toString();
	}	
};
var _connUserHours = null;
var _bizTypeHours = null;
var isException = false;
var GridAction = {
	_add : function(gridId) {
		var grid = Ext.getCmp(gridId);
		var rowEditing = grid.getPlugin('rowEditing');
    	var store = grid.getStore();
    	rowEditing.cancelEdit();

        var r = Ext.create('Ext.stabilization.model.Statistic', {
        	channel: '',
        	target: 0,
        	data1: 0,
        	mode: '',
        	day:''
        });

        store.insert(0, r);
        rowEditing.startEdit(0, 0);
	},
	_remove : function(gridId) {
		var grid = Ext.getCmp(gridId);
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	grid.getPlugin('rowEditing').cancelEdit();
        store.remove(sm.getSelection());
        if (store.getCount() > 0) {
            sm.select(0);
        }
	},
	_saveGrid : function(gridId) {
		var grid;
		var store;
		var url;
		var chartId;
		grid = Ext.getCmp(gridId);
    	store = grid.getStore();
    	var targetHours = null;
		if (gridId == 'conn-grid') {
	    	chartId = 'conn-chart-detail';
	    	url = "/int/connuser/save.json";
	    	targetHours = _connUserHours;
		} else if (gridId == 'biz-grid') {
			chartId = 'biz-chart-detail';
	    	url = "/int/bizprocess/save.json";
	    	targetHours = _bizTypeHours;
		} else if (gridId == 'wfm-grid') {
			chartId = null;
	    	url = "/int/wfm/save.json";
		} else if (gridId == 'que-grid') {
			chartId = null;
	    	url = "/int/question/save.json";
		} else if (gridId == 'helf-grid') {
			chartId = null;
	    	url = "/int/helf/save.json";
		} else if (gridId == 'itsm-grid') {
			chartId = null;
	    	url = "/int/itsm/save.json";
		}
    	
    	GridAction._save(store, url, chartId, targetHours);
	},
	_getData : function(rs, mode, targetHours) {
		var data = [];
    	for (var i = 0, ln = rs.length; i < ln; i++) {
    	   if(rs[i].getData().channel == '') continue;
    	   rs[i].set("mode", mode);
    	   if (targetHours != null) {
    		   rs[i].set("targetHours", targetHours);
    	   }
     	   data.push(rs[i].getData());
     	}
    	return data;
	},
	_callback : function(store, chartId) {
		if (!isException)
			Ext.Msg.alert('Complete', '저장완료!');
		store.load();
		if (chartId != null) {
			var chart = Ext.getCmp(chartId);
			if (chart != null) {
				chart.getStore().load();
				chart.redraw();
			}
		}
	},
	_exceptionMsg : function(result) {
		if (result.error != null) {
			isException = true;
			Ext.Msg.alert('Exception', result.error.message);
		}
	},
	_getSameData : function(store, targetHours) {
		var data = [];
		var recs = store.getRange();
		for (var i=0;i< recs.length;i++) {
			var rec = recs[i];
			if (rec.getData().mode == '') {
				rec.set("mode", "I");
				if (targetHours != null) {
					rs[i].set("targetHours", targetHours);
	    	    }
				data.push(rec.getData());
			}
		}
		return data;
	},
	_save : function(store, url, chartId, targetHours) {
		var mods = this._getData(store.getModifiedRecords(), 'M', targetHours);
		var dels = this._getData(store.getRemovedRecords(), 'D', targetHours);
		var ints = this._getSameData(store, targetHours);
		var params = null;
		if (mods.length > 0 && dels.length > 0) {
			params = ints.concat(mods, dels);
		} else if (mods.length == 0 && dels.length > 0) {
			params = ints.concat(dels);
		} else if (mods.length > 0 && dels.length == 0) {
			params = ints.concat(mods);
		} else {
			params = ints.concat([]);
		}
		if (params.length > 0) {
	    	Ext.Ajax.request({
	    	    url: url,
	    	    method: 'POST',
	    	    jsonData: Ext.encode(params),
	    	    success: function(response){
	    	    	GridAction._exceptionMsg(JSON.parse(response.responseText));
	    	    	GridAction._callback(store, chartId);
	    	    },
	    	    failure: function(){
	    	    	Ext.Msg.alert('Error', '저장 처리 중 오류가 발생되었습니다.');
	    	    }
	    	});
		} else {
			Ext.Msg.alert('Info', '저장할 내용이 없습니다.');
		}
	}
};