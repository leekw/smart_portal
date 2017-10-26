var _chartCircle;
Ext.define('Ext.ncutoverm.view.CutoverPieChart', {
    extend: 'Ext.Panel',
    xtype: 'cutoverpiechart',

    requires: [
        'Ext.chart.series.Pie',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.interactions.Rotate'
    ],
    
    cls: 'service-type shadow-panel',
    minHeight: 320,
    bodyPadding: 15,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyStyle: {
        background: 'none'
    },
    border : false,
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
		            height: 7,
		            minHeight: 7,
		            value: 0
		        }
		    ]
		},
      {
		xtype: 'container',
	    layout: {
	        type: 'vbox',
	        align: 'stretch'
	    },
	    height: 50,
	    padding : '12px 0 0 0px',
	    items: [
	        {
	            xtype:'component',
	            id : 'status-1',
	            data: {
	                name: '01.사전작업',
	                value: '0%'
	            },
	            padding : '0 0 2px 0',
	            tpl: '<div class="statistic-tag2 status-1" style="font-size:12px;font-weight:800">01.사전작업</div><div class="right-aligned-div" style="font-size:13px;font-weight:800;">{value}</div>'
	        },
	        {
	            xtype: 'progressbar',
	            id : 'status-1-pg',
	            cls: 'bottom-indent service-status-1',
	            height: 7,
	            minHeight: 7,
	            value: 0
	        }
	    ]
	  },{
		xtype: 'container',
	    layout: {
	        type: 'vbox',
	        align: 'stretch'
	    },
	    height: 50,
	    padding : '12px 0 0 0px',
	    items: [
	        {
	            xtype:'component',
	            id : 'status-2',
	            data: {
	                name: '02.전환점검',
	                value: '0%'
	            },
	            padding : '0 0 2px 0',
	            tpl: '<div class="statistic-tag2 status-2" style="font-size:12px;font-weight:800">02.전환점검</div><div class="right-aligned-div" style="font-size:13px;font-weight:800;">{value}</div>'
	        },
	        {
	            xtype: 'progressbar',
	            id : 'status-2-pg',
	            cls: 'bottom-indent service-status-2',
	            height: 7,
	            minHeight: 7,
	            value: 0
	        }
	    ]
	  },{
		xtype: 'container',
	    layout: {
	        type: 'vbox',
	        align: 'stretch'
	    },
	    height: 50,
	    padding : '12px 0 0 0px',
	    items: [
	        {
	            xtype:'component',
	            id : 'status-3',
	            data: {
	                name: '03.데이터 본이행',
	                value: '0%'
	            },
	            padding : '0 0 2px 0',
	            tpl: '<div class="statistic-tag2 status-3" style="font-size:12px;font-weight:800">03.데이터 본이행</div><div class="right-aligned-div" style="font-size:13px;font-weight:800;">{value}</div>'
	        },
	        {
	            xtype: 'progressbar',
	            id : 'status-3-pg',
	            cls: 'bottom-indent service-status-3',
	            height: 7,
	            minHeight: 7,
	            value: 0
	        }
	    ]
	  },{
		xtype: 'container',
	    layout: {
	        type: 'vbox',
	        align: 'stretch'
	    },
	    height: 50,
	    padding : '12px 0 0 0px',
	    items: [
	        {
	            xtype:'component',
	            id : 'status-4',
	            data: {
	                name: '04.가동점검(IT)',
	                value: '0%'
	            },
	            padding : '0 0 2px 0',
	            tpl: '<div class="statistic-tag2 status-4" style="font-size:12px;font-weight:800">04.가동점검(IT)</div><div class="right-aligned-div" style="font-size:13px;font-weight:800;">{value}</div>'
	        },
	        {
	            xtype: 'progressbar',
	            id : 'status-4-pg',
	            cls: 'bottom-indent service-status-4',
	            height: 7,
	            minHeight: 7,
	            value: 0
	        }
	    ]
	  },{
		xtype: 'container',
	    layout: {
	        type: 'vbox',
	        align: 'stretch'
	    },
	    height: 50,
	    padding : '12px 0 0 0px',
	    items: [
	        {
	            xtype:'component',
	            id : 'status-5',
	            data: {
	                name: '05.사용자최종점검',
	                value: '0%'
	            },
	            padding : '0 0 2px 0',
	            tpl: '<div class="statistic-tag2 status-5" style="font-size:12px;font-weight:800">05.사용자최종점검</div><div class="right-aligned-div" style="font-size:13px;font-weight:800;">{value}</div>'
	        },
	        {
	            xtype: 'progressbar',
	            id : 'status-5-pg',
	            cls: 'bottom-indent service-status-5',
	            height: 7,
	            minHeight: 7,
	            value: 0
	        }
	    ]
	  },{
		xtype: 'container',
	    layout: {
	        type: 'vbox',
	        align: 'stretch'
	    },
	    height: 50,
	    padding : '12px 0 0 0px',
	    items: [
	        {
	            xtype:'component',
	            id : 'status-6',
	            data: {
	                name: '06.시스템오픈',
	                value: '0%'
	            },
	            padding : '0 0 2px 0',
	            tpl: '<div class="statistic-tag2 status-6" style="font-size:12px;font-weight:800">06.시스템오픈</div><div class="right-aligned-div" style="font-size:13px;font-weight:800;">{value}</div>'
	        },
	        {
	            xtype: 'progressbar',
	            id : 'status-6-pg',
	            cls: 'bottom-indent service-status-6',
	            height: 7,
	            minHeight: 7,
	            value: 0
	        }
	    ]
	  }
    ],
    listeners : {
    	afterrender : function(panel) {
//    		var header = panel.header;
//    		header.setStyle('background-color', '#673ab7');
//    		header.setStyle('border-color', '#673ab7');
    	}
    }
});
var ChartView = {
	_initBar : function(comp_id, code) {
		Ext.Ajax.request({
    	    url: G_PATH + '/cutover/dashboard/chart/get.json',
    	    method: 'POST',
    	    jsonData: Ext.encode({yCategory : code}),
    	    success: function(response){
    	    	var datas = JSON.parse(response.responseText);
    	    	if (datas != null && datas.info != null && datas.info.length > 0) {
	    	    	var data = datas.info[0];
	    			var comp = Ext.getCmp(comp_id);
	    			var pgComp = Ext.getCmp(comp_id + '-pg');
	    	    	comp.setData({
	    	            name: data.name,
	    	            value: (data.data1).toFixed(2) + '% (' + data.cnt + '/' + data.totalCount + ')'
	    	        });
	    	    	pgComp.setValue(data.data1);
    	    	}
    	    },
    	    failure: function(){
    	    	
    	    }
    	});
	},
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
