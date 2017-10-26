var _chartCircle;
Ext.define('Ext.ncutover.view.CutoverPieChart', {
    extend: 'Ext.Panel',
    xtype: 'cutoverpiechart',

    requires: [
        'Ext.chart.series.Pie',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.interactions.Rotate'
    ],
    
    cls: 'service-type shadow-panel',
    height: 740,
    bodyPadding: 15,
    title: '작업단계별 현황',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    tools:[{
        type:'refresh',
        tooltip: '새로고침',
        width: 20,
        height: 20,
        // hidden:true,
        handler: function(event, toolEl, panelHeader) {
        	DashboardBind._reload();
        }
    },{
        xtype: 'tool',                                    
        cls: 'x-fa fa-tasks dashboard-tools',
        tooltip: 'Task Gantt Chart',
        width: 20,
        height: 20,
        handler : function() {
        	var url = G_PATH + '/etc/gantt.html';
    	    var option = "left=100,top=100,width='100%',height='100%',fullscreen=yes,location=no,titlebar=no,scrollbars=yes";
    	    var temp = new Date();
        	var popup = window.open(url, 'Task' + temp, option);
            popup.focus();
        }
    }
    ],
    items: [
		{
			xtype: 'container',
		    layout: {
		        type: 'vbox',
		        align: 'stretch'
		    },
		    height: 60,
		    items: [
		        {
		            xtype:'component',
		            id : 'total-working-view',
		            data: {
		                name: '전체 작업 진행률',
		                value: '80%'
		            },
		            tpl: '<div class="statistic-tag_total"><h3>전체 작업 진행률</h3></div><div class="right-aligned-div"><h3>{value}</h3></div>'
		        },
		        {
		            xtype: 'progressbar',
		            cls: 'bottom-indent service-total',
		            id : 'total-working-ratio',
		            height: 8,
		            minHeight: 8,
		            value: 0
		        }
		    ]
		},
      {
    	  xtype : 'container',
    	  layout: {
		      type: 'hbox',
		      align: 'stretch'
		  },
		  items : [
			{
			    xtype: 'container',
			    width: '16.2%',
			    defaults: {
			        height:150
			    },
			    items: [
			        {
			            xtype: 'polar',
			            flex: 1,
			            border:false,
			            animation: true,
			            id : 'pie-chart-1',
			            padding: '15px 0 0px 10px',
			            donut: true,
			            interactions: [{ type : 'rotate'}],
			            colors: ['rgba(103, 144, 199, 0.6)', '#ececec'],
			            
			            store: Ext.create('Ext.ncutover.store.CutoverChart'),
			
			            sprites: [{
			                type: 'text',
			                x: 60,
			                y: 71,
			                text: '0%',
			                font: '25px 900 Proxima Nova, Helvetica Neue, Helvetica, Arial, sans-serif',
			                fillStyle: '#69708a'
			            }],
			
			            series: [{
			                type: 'pie',
			                xField: 'data1',
			                colors: ['rgba(103, 144, 199, 0.6)', '#ececec'],
			                donut: 75
			            }],
			            listeners : {
			            	afterrender : function(chart, eOpts) {
			            		ChartView._init(chart, '17146');
			            	},
			            	render : function(panel) {
			            		panel.body.on('click', function() {
			            			ChartView._currentChart('pie-chart-1');
			            			var name = panel.getSprites()[1].text;
			            			
			            			_PieChartIndex = 1;
			            			_PieGridReload = true;
			            			Ext.Ajax.request({
			            	    	    url: G_PATH + '/cutover/dashboard/status/get.json',
			            	    	    method: 'POST',
			            	    	    jsonData: Ext.encode({yCategory : '17146'}),
			            	    	    success: function(response){
			            	    	    	var data = JSON.parse(response.responseText);
			            	    	    	DashboardBind._bindStatusInfo(data);
			            	    	    	ChartView._changeGrid(name, '17146', data.info.totalCount);
			            	    	    },
			            	    	    failure: function(){
			            	    	    	
			            	    	    }
			            	    	});
			            		});
			            	}
			            }
			        }
			    ]
			},{
			    xtype: 'container',
			    width: '16.2%',
			    defaults: {
			        height:150
			    },
			    items: [
			        {
			            xtype: 'polar',
			            flex: 1,
			            border:false,
			            animation: true,
			            id : 'pie-chart-2',
			            padding: '15px 0 0px 10px',
			            donut: true,
			            interactions: ['rotate'],
			            colors: ['rgba(103, 144, 199, 0.6)', '#ececec'],
			
			            store:  Ext.create('Ext.ncutover.store.CutoverChart'),
			
			            sprites: [{
			                type: 'text',
			                x: 60,
			                y: 71,
			                text: '25%',
			                font: '20px 300 Proxima Nova, Helvetica Neue, Helvetica, Arial, sans-serif',
			                fillStyle: '#69708a'
			            }],
			
			            series: [{
			                type: 'pie',
			                xField: 'data1',
			                colors: ['rgba(103, 144, 199, 0.6)', '#ececec'],
			                donut: 75
			            }],
			            listeners : {
			            	beforerender : function(chart, eOpts) {
			            		ChartView._init(chart, '17151');
			            	},
			            	render : function(panel) {
			            		panel.body.on('click', function() {
			            			ChartView._currentChart('pie-chart-2');
			            			var name = panel.getSprites()[1].text;
			            			_PieChartIndex = 2;
			            			_PieGridReload = true;
			            			Ext.Ajax.request({
			            	    	    url: G_PATH + '/cutover/dashboard/status/get.json',
			            	    	    method: 'POST',
			            	    	    jsonData: Ext.encode({yCategory : '17151'}),
			            	    	    success: function(response){
			            	    	    	var data = JSON.parse(response.responseText);
			            	    	    	DashboardBind._bindStatusInfo(data);
			            	    	    	ChartView._changeGrid(name, '17151', data.info.totalCount);
			            	    	    },
			            	    	    failure: function(){
			            	    	    	
			            	    	    }
			            	    	});
			            		});
			            	}
			            }
			        }
			    ]
			},{
			    xtype: 'container',
			    width: '16.2%',
			    defaults: {
			        height:150
			    },
			    items: [
			        {
			            xtype: 'polar',
			            flex: 1,
			            border:false,
			            animation: true,
			            padding: '15px 0 0px 10px',
			            donut: true,
			            id : 'pie-chart-3',
			            interactions: ['rotate'],
			            colors: ['rgba(103, 144, 199, 0.6)', '#ececec'],
			
			            store:  Ext.create('Ext.ncutover.store.CutoverChart'),
			
			            sprites: [{
			                type: 'text',
			                x: 60,
			                y: 71,
			                text: '25%',
			                font: '20px 300 Proxima Nova, Helvetica Neue, Helvetica, Arial, sans-serif',
			                fillStyle: '#69708a'
			            }],
			
			            series: [{
			                type: 'pie',
			                xField: 'data1',
			                colors: ['rgba(103, 144, 199, 0.6)', '#ececec'],
			                donut: 75
			            }],
			            listeners : {
			            	beforerender : function(chart, eOpts) {
			            		ChartView._init(chart, '17149');
			            	},
			            	render : function(panel) {
			            		panel.body.on('click', function() {
			            			ChartView._currentChart('pie-chart-3');
			            			var name = panel.getSprites()[1].text;
			            			_PieChartIndex = 3;
			            			_PieGridReload = true;
			            			Ext.Ajax.request({
			            	    	    url: G_PATH + '/cutover/dashboard/status/get.json',
			            	    	    method: 'POST',
			            	    	    jsonData: Ext.encode({yCategory : '17149'}),
			            	    	    success: function(response){
			            	    	    	var data = JSON.parse(response.responseText);
			            	    	    	DashboardBind._bindStatusInfo(data);
			            	    	    	ChartView._changeGrid(name, '17149', data.info.totalCount);
			            	    	    },
			            	    	    failure: function(){
			            	    	    	
			            	    	    }
			            	    	});
			            		});
			            	}
			            }
			        }
			    ]
			},{
			    xtype: 'container',
			    width: '16.2%',
			    defaults: {
			        height:150
			    },
			    items: [
			        {
			            xtype: 'polar',
			            flex: 1,
			            border:false,
			            animation: true,
			            id : 'pie-chart-4',
			            padding: '15px 0 0px 10px',
			            donut: true,
			            interactions: ['rotate'],
			            colors: ['rgba(103, 144, 199, 0.6)', '#ececec'],
			
			            store:  Ext.create('Ext.ncutover.store.CutoverChart'),
			
			            sprites: [{
			                type: 'text',
			                x: 60,
			                y: 71,
			                text: '25%',
			                font: '20px 300 Proxima Nova, Helvetica Neue, Helvetica, Arial, sans-serif',
			                fillStyle: '#69708a'
			            }],
			
			            series: [{
			                type: 'pie',
			                xField: 'data1',
			                colors: ['rgba(103, 144, 199, 0.6)', '#ececec'],
			                donut: 75
			            }],
			            listeners : {
			            	beforerender : function(chart, eOpts) {
			            		ChartView._init(chart, '17152');
			            	},
			            	render : function(panel) {
			            		panel.body.on('click', function() {
			            			ChartView._currentChart('pie-chart-4');
			            			var name = panel.getSprites()[1].text;
			            			_PieChartIndex = 4;
			            			_PieGridReload = true;
			            			Ext.Ajax.request({
			            	    	    url: G_PATH + '/cutover/dashboard/status/get.json',
			            	    	    method: 'POST',
			            	    	    jsonData: Ext.encode({yCategory : '17152'}),
			            	    	    success: function(response){
			            	    	    	var data = JSON.parse(response.responseText);
			            	    	    	DashboardBind._bindStatusInfo(data);
			            	    	    	ChartView._changeGrid(name, '17152', data.info.totalCount);
			            	    	    },
			            	    	    failure: function(){
			            	    	    	
			            	    	    }
			            	    	});
			            		});
			            	}
			            }
			        }
			    ]
			},{
			    xtype: 'container',
			    width: '16.2%',
			    defaults: {
			        height:150
			    },
			    items: [
			        {
			            xtype: 'polar',
			            flex: 1,
			            border:false,
			            animation: true,
			            id : 'pie-chart-5',
			            padding: '15px 0 0px 10px',
			            donut: true,
			            interactions: ['rotate'],
			            colors: ['rgba(103, 144, 199, 0.6)', '#ececec'],
			
			            store:  Ext.create('Ext.ncutover.store.CutoverChart'),
			
			            sprites: [{
			                type: 'text',
			                x: 60,
			                y: 71,
			                text: '25%',
			                font: '20px 300 Proxima Nova, Helvetica Neue, Helvetica, Arial, sans-serif',
			                fillStyle: '#69708a'
			            }],
			
			            series: [{
			                type: 'pie',
			                xField: 'data1',
			                colors: ['rgba(103, 144, 199, 0.6)', '#ececec'],
			                donut: 75
			            }],
			            listeners : {
			            	beforerender : function(chart, eOpts) {
			            		ChartView._init(chart, '17158');
			            	},
			            	render : function(panel) {
			            		panel.body.on('click', function() {
			            			ChartView._currentChart('pie-chart-5');
			            			var name = panel.getSprites()[1].text;
			            			_PieChartIndex = 5;
			            			_PieGridReload = true;
			            			Ext.Ajax.request({
			            	    	    url: G_PATH + '/cutover/dashboard/status/get.json',
			            	    	    method: 'POST',
			            	    	    jsonData: Ext.encode({yCategory : '17158'}),
			            	    	    success: function(response){
			            	    	    	var data = JSON.parse(response.responseText);
			            	    	    	DashboardBind._bindStatusInfo(data);
			            	    	    	ChartView._changeGrid(name, '17158', data.info.totalCount);
			            	    	    },
			            	    	    failure: function(){
			            	    	    	
			            	    	    }
			            	    	});
			            		});
			            	}
			            }
			        }
			    ]
			},{
			    xtype: 'container',
			    width: '16.2%',
			    defaults: {
			        height:150
			    },
			    items: [
			        {
			            xtype: 'polar',
			            flex: 1,
			            border:false,
			            animation: true,
			            id : 'pie-chart-6',
			            padding: '15px 0 0px 10px',
			            donut: true,
			            interactions: ['rotate'],
			            colors: ['rgba(103, 144, 199, 0.6)', '#ececec'],
			
			            store: Ext.create('Ext.ncutover.store.CutoverChart'),
			
			            sprites: [{
			                type: 'text',
			                x: 60,
			                y: 71,
			                text: '25%',
			                font: '20px 300 Proxima Nova, Helvetica Neue, Helvetica, Arial, sans-serif',
			                fillStyle: '#69708a'
			            }],
			
			            series: [{
			                type: 'pie',
			                xField: 'data1',
			                colors: ['rgba(103, 144, 199, 0.6)', '#ececec'],
			                donut: 75
			            }],
			            listeners : {
			            	beforerender : function(chart, eOpts) {
			            		ChartView._init(chart, '17352');
			            	},
			            	render : function(panel) {
			            		panel.body.on('click', function() {
			            			ChartView._currentChart('pie-chart-6');
			            			var name = panel.getSprites()[1].text;
			            			_PieChartIndex = 6;
			            			_PieGridReload = true;
			            			Ext.Ajax.request({
			            	    	    url: G_PATH + '/cutover/dashboard/status/get.json',
			            	    	    method: 'POST',
			            	    	    jsonData: Ext.encode({yCategory : '17352'}),
			            	    	    success: function(response){
			            	    	    	var data = JSON.parse(response.responseText);
			            	    	    	DashboardBind._bindStatusInfo(data);
			            	    	    	ChartView._changeGrid(name, '17352', data.info.totalCount);
			            	    	    },
			            	    	    failure: function(){
			            	    	    	
			            	    	    }
			            	    	});
			            		});
			            	}
			            }
			        }
			    ]
			}    
		  ]
      },
      {
    	  xtype : 'container',
    	  layout: {
		      type: 'hbox',
		      align: 'stretch'
		  },
		  items : [
			{
			    xtype: 'panel',
			    flex: 1,
			    border : false,
			    height: 20
			}
		   ]
      },
      {
		xtype: 'container',
	    layout: {
	        type: 'vbox',
	        align: 'stretch'
	    },
	    height: 70,
	    padding : '10px 30px 0 30px',
	    items: [
	        {
	            xtype:'component',
	            id : 'assignready-status',
	            data: {
	                name: '할당대기',
	                value: '20%'
	            },
	            tpl: '<div class="statistic-tag assignready"><h3>할당대기</h3></div><div class="right-aligned-div"><h3>{value}</h3></div>'
	        },
	        {
	            xtype: 'progressbar',
	            id : 'assignready-status-pg',
	            cls: 'bottom-indent service-assignready',
	            height: 8,
	            minHeight: 8,
	            value: 0.2
	        }
	    ]
	  },{
		xtype: 'container',
	    layout: {
	        type: 'vbox',
	        align: 'stretch'
	    },
	    height: 70,
	    padding : '10px 30px 0 30px',
	    items: [
	        {
	            xtype:'component',
	            id : 'workready-status',
	            data: {
	                name: '작업대기',
	                value: '20%'
	            },
	            tpl: '<div class="statistic-tag workready"><h3>작업대기</h3></div><div class="right-aligned-div"><h3>{value}</h3></div>'
	        },
	        {
	            xtype: 'progressbar',
	            id : 'workready-status-pg',
	            cls: 'bottom-indent service-workready',
	            height: 8,
	            minHeight: 8,
	            value: 0.2
	        }
	    ]
	  },{
		xtype: 'container',
	    layout: {
	        type: 'vbox',
	        align: 'stretch'
	    },
	    height: 70,
	    padding : '10px 30px 0 30px',
	    items: [
	        {
	            xtype:'component',
	            id : 'working-status',
	            data: {
	                name: '작업진행중',
	                value: '20%'
	            },
	            tpl: '<div class="statistic-tag working"><h3>작업진행중</h3></div><div class="right-aligned-div"><h3>{value}</h3></div>'
	        },
	        {
	            xtype: 'progressbar',
	            id : 'working-status-pg',
	            cls: 'bottom-indent service-working',
	            height: 8,
	            minHeight: 8,
	            value: 0.2
	        }
	    ]
	  },{
		xtype: 'container',
	    layout: {
	        type: 'vbox',
	        align: 'stretch'
	    },
	    height: 70,
	    padding : '10px 30px 0 30px',
	    items: [
	        {
	            xtype:'component',
	            id : 'startdelay-status',
	            data: {
	                name: '시작지연',
	                value: '20%'
	            },
	            tpl: '<div class="statistic-tag startdelay"><h3>시작지연</h3></div><div class="right-aligned-div"><h3>{value}</h3></div>'
	        },
	        {
	            xtype: 'progressbar',
	            id : 'startdelay-status-pg',
	            cls: 'bottom-indent service-startdelay',
	            height: 8,
	            minHeight: 8,
	            value: 0.2
	        }
	    ]
	  },{
		xtype: 'container',
	    layout: {
	        type: 'vbox',
	        align: 'stretch'
	    },
	    height: 70,
	    padding : '10px 30px 0 30px',
	    items: [
	        {
	            xtype:'component',
	            id : 'enddelay-status',
	            data: {
	                name: '종료지연',
	                value: '20%'
	            },
	            tpl: '<div class="statistic-tag enddelay"><h3>종료지연</h3></div><div class="right-aligned-div"><h3>{value}</h3></div>'
	        },
	        {
	            xtype: 'progressbar',
	            id : 'enddelay-status-pg',
	            cls: 'bottom-indent service-enddelay',
	            height: 8,
	            minHeight: 8,
	            value: 0.2
	        }
	    ]
	  },{
		xtype: 'container',
	    layout: {
	        type: 'vbox',
	        align: 'stretch'
	    },
	    height: 70,
	    padding : '10px 30px 0 30px',
	    items: [
	        {
	            xtype:'component',
	            id : 'complete-status',
	            data: {
	                name: '작업완료',
	                value: '20%'
	            },
	            tpl: '<div class="statistic-tag successcomplete"><h3>작업완료</h3></div><div class="right-aligned-div"><h3>{value}</h3></div>'
	        },
	        {
	            xtype: 'progressbar',
	            id : 'complete-status-pg',
	            cls: 'bottom-indent service-successcomplete',
	            height: 8,
	            minHeight: 8,
	            value: 0.2
	        }
	    ]
	  }
    ],
    listeners : {
    	afterrender : function(panel) {
    		var header = panel.header;
    		header.setStyle('background-color', '#673ab7');
    		header.setStyle('border-color', '#673ab7');
    	}
    }
});
var ChartView = {
	_init : function(chart, code) {
		//Ext.getBody().mask("Processing...");
		var store = chart.getStore();
		var proxy = store.getProxy();
		proxy.extraParams.yCategory = code;
		store.load({
		    scope: this,
		    callback: function(records, operation, success) {
	    		var data = records[0].data.data1;
	    		var name = records[0].data.name;
	    		var temp = records[0].data.cnt + '/' + records[0].data.totalCount;
	    		var _width = Ext.getCmp('cutover-pie-chart').getWidth();
	    		var _x1, _y1, _x2, _y2, _ds, _ns;
	    		if (_width < 700) {
	    			_x1 = 32;
	    			_y1 = 75;
	    			_x2 = 0;
	    			_y2 = 15;
	    			_ds = 13;
	    			_ns = 9;
	    		} else if (_width >= 700 && _width < 800 ) {
	    			_x1 = 40;
	    			_y1 = 75;
	    			_x2 = 0;
	    			_y2 = 9;
	    			_ds = 15;
	    			_ns = 11;
	    		} else {
	    			_x1 = 50;
	    			_y1 = 75;
	    			_x2 = 0;
	    			_y2 = 9;
	    			_ds = 18;
	    			_ns = 12;
	    		}
	    		chart.setSprites([{
	                type: 'text',
	                x: _x1,
	                y: _y1,
	                text: data + '%',
	                font: _ds + 'px 900 Proxima Nova, Helvetica Neue, Helvetica, Arial, sans-serif',
	                fillStyle: '#69708a'
	            },{
	                type: 'text',
	                x: _x2,
	                y: _y2,
	                text: name,
	                font: _ns + 'px 700 Proxima Nova, Helvetica Neue, Helvetica, Arial, sans-serif',
	                qtip : name,
	                fillStyle: '#69708a'
	            }]);
	    		chart.redraw();
	    		//Ext.getBody().unmask();
		    }
		});
	},
	_currentChart : function(current) {
		for (var i=1;i <= 6;i++) {
			var temp = Ext.getCmp('circle-pie-chart-' + i);
			if (_chartCircle != null) {
				Ext.getCmp('pie-chart-' + i).getSurface('main').remove(_chartCircle);
				Ext.getCmp('pie-chart-' + i).redraw();
			}
		}
		var _width = Ext.getCmp('cutover-pie-chart').getWidth();
		var _x1, _y1;
		if (_width < 700) {
			_x1 = 32;
			_y1 = 77;
		} else if (_width >= 700 && _width < 800 ) {
			_x1 = 40;
			_y1 = 77;
		} else {
			_x1 = 50;
			_y1 = 77;
		}
		var chart = Ext.getCmp(current);
		_chartCircle = chart.getSurface('main').add({
			id: 'circle-' + current,
			type : 'circle',
			radius: 5,
	        fill: '#4caf50',
	        x: _x1,
	        y: _y1
		}).show(true);
		chart.redraw();
	},
	_changeGrid : function(type, code, total) {
		var panel = Ext.getCmp('cutover-grid-panel');
		panel.setTitle(type + " Task - (" + total + ")");
		var header = panel.header;
		if (header.getTools() != null) {
			header.getTools()[0].setHidden(true);
			header.getTools()[1].setHidden(true);
			header.getTools()[2].setHidden(true);
		}
		header.setStyle('background-color', '#673ab7');
		header.setStyle('border-color', '#673ab7');
		var grid = Ext.getCmp('cutover-dashboard-grid');
		var store = grid.getStore();
		var proxy = store.getProxy();
		proxy.extraParams.mode = '작업대상';
		proxy.extraParams.yCategory = code;
		store.load();
	}
}
