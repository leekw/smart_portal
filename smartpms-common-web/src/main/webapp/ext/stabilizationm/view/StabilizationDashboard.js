Ext.define('Ext.stabilizationm.view.StabilizationDashboard', {
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
		    xtype: 'panel',
		    border : false,
		    height: 70,
		    id: 'header-top',
		    bodyStyle: {
		        background: 'none'
		    },
		    html : '<div style="width:100%;text-align:-webkit-center;float:center;font-size:13px;font-weight:800;vertical-align:middle;">PA2 Billing Open : <span style="color:#e91e63">2016.09.12 08:00</span>&nbsp;&nbsp;&nbsp;<span style="cursor:pointer;cursor:hand;" onclick="ViewInfo._openCalendar()"><i class="x-fa fa-calendar fa-1x"></i></span><span id="search-day" style="font-size:8px;">&nbsp;(2016-02-17)</span></div>'
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
//		    		        showSeconds : false,
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
		    		return ;
		    	},
		    	resize : function (panel, width, height) {
//		    		var width = panel.getWidth();
//		    		var div = Ext.get('clock');
//		    		var html;
//		    		div.dom.childNodes[0].style = "display:inline-block;width:auto;";
		    	}
		    },
		    responsiveCls: 'big-40 small-100'
		},
		{
		    xtype: 'widget-top',
		    border : false,
		    style : {
		    	'background-color' : '#673ab7'
		    },
		    margin : '0 10px 20px 10px',
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
		    margin : '0 10px 20px 10px',
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
		    margin : '0 10px 20px 10px',
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
		    margin : '0 10px 20px 10px',
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
		    margin : '0 10px 20px 10px',
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
		    margin : '0 10px 20px 10px',
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
	_summaryConn : function(paramDay) {
		Ext.getBody().mask("Processing...");
		Ext.Ajax.request({
    	    url: G_PATH + '/connuser/list/get.json',
    	    method: 'POST',
    	    jsonData: Ext.encode({day : paramDay}),
    	    success: function(response){
    	    	var res = JSON.parse(response.responseText);
	    		var datas = res.datas;
	    		var data = 0;
	    		var target = 0;
	    		var syncDate = "";
	    		for (var i=0;i < datas.length;i++) {
	    			target += parseInt(datas[i].target);
	    			data += parseInt(datas[i].data1);
	    			if (syncDate == "") {
	    				syncDate = datas[i].strDay;
	    			}
	    		}
	    		var total = Ext.getCmp('conn-top');
	    		total.setData({
	    			amount: Ext.util.Format.number(data,'0,000'),
			        type: '접속자 수',
			        icon: 'users',
			        color : 'blue',
			        background :'#673ab7'
	    	    });
    	    	Ext.getBody().unmask();
    	    },
    	    failure: function(){
    	    	Ext.getBody().unmask();
    	    }
    	});
	},
	_summaryBiz : function(paramDay) {
		Ext.getBody().mask("Processing...");
		Ext.Ajax.request({
    	    url: G_PATH + '/bizprocess/list/get.json',
    	    method: 'POST',
    	    jsonData: Ext.encode({day : paramDay}),
    	    success: function(response){
    	    	var res = JSON.parse(response.responseText);
	    		var datas = res.datas;
	    		var data = 0;
	    		var target = 0;
	    		var syncDate = "";
	    		for (var i=0;i < datas.length;i++) {
	    			target += parseInt(datas[i].target);
	    			data += parseInt(datas[i].data1);
	    			if (syncDate == "") {
	    				syncDate = datas[i].strDay;
	    			}
	    		}
	    		var total = Ext.getCmp('biz-top');
	    		total.setData({
	    			amount: Ext.util.Format.number(data,'0,000'),
			        type: '업무처리',
			        icon: 'tasks',
			        color : 'gray',
			        background :'#c0c0c0'
	    	    });
    	    	Ext.getBody().unmask();
    	    },
    	    failure: function(){
    	    	Ext.getBody().unmask();
    	    }
    	});
	},
	_summaryHelp : function(paramDay) {
		Ext.getBody().mask("Processing...");
		Ext.Ajax.request({
    	    url: G_PATH + '/helf/list/get.json',
    	    method: 'POST',
    	    jsonData: Ext.encode({day : paramDay}),
    	    success: function(response){
    	    	var res = JSON.parse(response.responseText);
	    		var datas = res.datas;
	    		var data1 = 0;
	    		var data2 = 0;
	    		var data3 = 0;
	    		var data4 = 0;
	    		var data5 = 0;
	    		var data6 = 0;
	    		var total = 0;
	    		var syncDate = "";
	    		for (var i=0;i < datas.length;i++) {
	    			data1 += parseInt(datas[i].data1);
	    			data2 += parseInt(datas[i].data2);
	    			data3 += parseInt(datas[i].data3);
	    			data4 += parseInt(datas[i].data4);
	    			data5 += parseInt(datas[i].data5);
	    			data6 += parseInt(datas[i].data6);
	    			if (syncDate == "") {
	    				syncDate = datas[0].strDay;
	    			}
	    		}
	    		total = data1 + data2 + data3 + data4 + data5 + data6;
	    		var total1 = Ext.getCmp('que-top');
	    		total1.setData({
	    			amount: Ext.util.Format.number(total,'0,000'),
	    			type: '문의',
			        icon: 'question-circle',
			        color : 'orange',
			        background :'#ffc107'
	    	    });
	    		var total2 = Ext.getCmp('wait-top');
	    		total2.setData({
	    			amount: Ext.util.Format.number(data1,'0,000'),
	    			type: '대기',
			        icon: 'pause',
			        color : 'green',
			        background :'#4caf50'
	    	    });
	    		var total3 = Ext.getCmp('proc-top');
	    		total3.setData({
	    			amount: Ext.util.Format.number(data2,'0,000') + '/' + Ext.util.Format.number(data3,'0,000') + '/' + Ext.util.Format.number(data4,'0,000'),
	    			type: '처리중(1/1.5/2)',
			        icon: 'gears',
			        color : 'pink',
			        background :'#e91e63'
	    	    });
	    		var total4 = Ext.getCmp('comp-top');
	    		total4.setData({
	    			amount: Ext.util.Format.number(data5,'0,000') + '/' + Ext.util.Format.number(data6,'0,000'),
	    			type: '조치완료/종료',
			        icon: 'check',
			        color : 'cornflower-blue',
			        background :'#458fd2'
	    	    });
    	    	Ext.getBody().unmask();
    	    },
    	    failure: function(){
    	    	Ext.getBody().unmask();
    	    }
    	});
	},
	_reload : function() {
		var date =  new Date();
		var paramDay = (G_SEARCH_DATE == null ? DateUtil._formatDateYmd(date, 0) : G_SEARCH_DATE);
		Ext.get('search-day').dom.innerHTML = '&nbsp;(' + (G_SEARCH_DATE_VIEW == null ? DateUtil._formatDateNormal(date) : G_SEARCH_DATE_VIEW) + ')';
		var chart1 = Ext.getCmp('conn-chart-detail');
    	var chart2 = Ext.getCmp('biz-chart-detail');
    	var chart5 = Ext.getCmp('jira-chart-detail');
//    	var store = Ext.getCmp('conn-user-store');
    	chart1.getStore().getProxy().extraParams.day = paramDay;
    	chart1.getStore().load();
    	chart1.redraw();
    	chart2.getStore().getProxy().extraParams.day = paramDay;
    	chart2.getStore().load();
    	chart2.redraw();
    	chart5.getStore().getProxy().extraParams.day = paramDay;
    	chart5.getStore().load();
    	chart5.redraw();
    	ViewInfo._summaryConn(paramDay);
    	ViewInfo._summaryBiz(paramDay);
    	ViewInfo._summaryHelp(paramDay);
//    	store.getProxy().extraParams.day = paramDay;
//    	store.load();
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
			    	chart1.getStore().getProxy().extraParams.day = paramDay;
			    	chart1.getStore().load();
			    	chart1.redraw();
			    	chart2.getStore().getProxy().extraParams.day = paramDay;
			    	chart2.getStore().load();
			    	chart2.redraw();
			    	chart5.getStore().getProxy().extraParams.day = paramDay;
			    	chart5.getStore().load();
			    	chart5.redraw();
			    	
			    	ViewInfo._summaryConn(paramDay);
			    	ViewInfo._summaryBiz(paramDay);
			    	ViewInfo._summaryHelp(paramDay);
			    	
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
