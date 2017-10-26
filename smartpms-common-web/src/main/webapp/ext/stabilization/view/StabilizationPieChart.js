
Ext.define('Ext.stabilization.view.StabilizationPieChart', {
    extend: 'Ext.panel.Panel',
    xtype: 'stabilizationpiechart',
    requires: [
		'Ext.chart.CartesianChart',
		'Ext.chart.axis.Category',
		'Ext.chart.axis.Numeric',
		'Ext.chart.series.Pie',
		'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.interactions.Rotate',
        'Ext.chart.interactions.PanZoom'
   ],
   cls: 'quick-graph-panel shadow-panel',
   height: 350,
   headerPosition: 'bottom',
   ui: 'light',

   bodyPadding: 15,
    layout: {
    	type: 'vbox',
        align: 'stretch'
    },
    items: [
            {
                xtype: 'container',
                height : 130,
                layout: 'fit',
                items: [
                   {
                	   xtype : 'panel',
                	   border :false,
                	   layout : {
                		   type : 'hbox',
                		   align : 'stretch'
                	   },
                	   items : [
            	            {
                                xtype: 'polar',
                                border :false,
                                donut: true,
                                width: '75%',
                                id : 'conn-pie-chart',
                                animation : !Ext.isIE9m && Ext.os.is.Desktop,
                                insetPadding:10,
                                store: Ext.create('Ext.stabilization.store.CompareChart'),
                                colors: [
        							'rgba(103, 144, 199, 0.6)',
        							'rgba(238, 146, 156, 0.6)'
                                ],
                                interactions: [{ type : 'rotate'}],
                                series: [
                                    {
                                    	type: 'pie',
            			                xField: 'dataRatio',
            			                label : {
            			                	field : 'label',
            			                	display : 'outside'
            			                },
            			                highlight : true,
            			                tooltip : {
            			                	trackMouse: true,
                                        	renderer: function(tooltip, record, item) {
                                        		tooltip.setHtml( record.get('label') + ': ' + Ext.util.Format.number(record.get('data1'),'0,000') + '건');
                                            }
            			                },
            			                colors: ['rgba(103, 144, 199, 0.6)',
            		                             'rgba(238, 146, 156, 0.6)'],
            			                donut: 75
                                    }
                                ],
                                listeners : {
                                	afterrender : function(chart, eOpts) {
                                		ChangePieChart._loadChart(chart, 'conn');
                                	}
                                }
                            },{
                            	xtype : 'panel',
                            	width :'25%',
                            	id : 'conn-updown',
                            	border :false
                            }
                	   ]
                   }
                ]
            },
            {
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [
                    {
                    	xtype :'panel',
                    	border :false,
                    	layout : {
                    		type : 'hbox',
                    		align : 'stretch'
                    	},
                    	items : [
							{
							    xtype: 'polar',
							    border :false,
							    donut: true,
							    id : 'biz-pie-chart',
							    width: '75%',
							    animation : !Ext.isIE9m && Ext.os.is.Desktop,
							    insetPadding:20,
							    store: Ext.create('Ext.stabilization.store.CompareChart'),
							    colors: [
							         'rgba(103, 144, 199, 0.6)',
							         'rgba(238, 146, 156, 0.6)'
							    ],
							    interactions: [{ type : 'rotate'}],
							    series: [
							        {
							        	type: 'pie',
							            xField: 'dataRatio',
							            label : {
							            	field : 'label',
							            	display : 'outside'
							            },
							            highlight : true,
							            tooltip : {
							            	trackMouse: true,
							            	renderer: function(tooltip, record, item) {
							            		tooltip.setHtml( record.get('label') + ': ' + Ext.util.Format.number(record.get('data1'),'0,000') + '건');
							                }
							            },
							            colors: ['rgba(103, 144, 199, 0.6)',
							                     'rgba(238, 146, 156, 0.6)'],
							            donut: 75
							        }
							    ],
							    listeners : {
							    	afterrender : function(chart, eOpts) {
							    		ChangePieChart._loadChart(chart, 'biz');
							    				
							    	}
							    }
							},{
                            	xtype : 'panel',
                            	width :'25%',
                            	id : 'biz-updown',
                            	border :false
                            }
                    	]
                    }
                ]
            }
     ],
	 tbar : [
				{
					xtype : 'label',
					width : '100%',
					id : 'pie-chart-label',
					html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800 !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;전일 동시간대 비교 - ' + DateTemp._getHours() + '시 기준</div></div>'
						  
				 }
	     ]
});
var ChangePieChart = {
	_loadChart : function(chart, type, day) {
		var store = chart.getStore();
		var proxy = store.getProxy();
		proxy.extraParams.type = type;
		if (day != null) {
			proxy.extraParams.day = day;
		}
		store.load({
			scope: this,
		    callback: function(records, operation, success) {
		    	if (records.length > 1) {
		    		var data = records[0].data.dataRatio;
		    		var data2 = records[1].data.dataRatio;
		    		var updown = data - data2;
		    		chart.setSprites([{
		                type: 'text',
		                x: 0,
		                y: 15,
		                text: type == 'conn' ? '접속자 비교' : '업무처리 비교',
		                font: '12px 300 Proxima Nova, Helvetica Neue, Helvetica, Arial, sans-serif',
		                fillStyle: '#69708a'
		            },{
		                type: 'text',
		                x: 80,
		                y: type == 'conn' ? 75 : (75+10),
		                text: data.toFixed(2) + '%',
		                font: '20px 600 Proxima Nova, Helvetica Neue, Helvetica, Arial, sans-serif',
		                fillStyle: '#69708a'
		            }]);
		    		chart.redraw();
		    		var temp = data > 50 ? 'arrow-up' : data == 50 || updown == 0 ? 'minus' : 'arrow-down';
		    		var color = data > 50 ? '#458fd2' : data == 50 || updown == 0 ? '#c0c0c0' : '#e91e63';
		    		var textStr = updown == 0 ? '' : updown > 0 ? '+' + updown.toFixed(2) + '%' : updown.toFixed(2) + '%';
		    		Ext.getCmp(type + '-updown').setHtml('<div style="vertical-align:middle;padding-top:50px;padding-lefg:20px;font-size:13px;font-weight:600"><i class="x-fa fa-' + temp + ' fa-3x" style="color:'+ color + '"></i><br><span>' + textStr + '</span></div>');
		    	}
		    }
		});
	}
}