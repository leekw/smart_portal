Ext.define('Ext.stabilization.view.ConnUserChart', {
    extend: 'Ext.panel.Panel',
    xtype: 'connuserchart',
    requires: [
		'Ext.chart.CartesianChart',
		'Ext.chart.axis.Category',
		'Ext.chart.axis.Numeric',
		'Ext.chart.series.Line',
		'Ext.chart.series.Bar',
        'Ext.chart.interactions.PanZoom'
   ],
   cls: 'quick-graph-panel shadow-panel',
   height: 300,
   headerPosition: 'bottom',
   ui: 'light', 
   border :false,
   bodyPadding: 15,
    layout: {
    	type: 'vbox',
        align: 'stretch'
    },
    items: [
            {
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                border :false,
                items: [
                    {
                        xtype: 'cartesian',
                        border :false,
                        animation : !Ext.isIE9m && Ext.os.is.Desktop,
                        insetPadding:5,
                        id : 'conn-chart-detail',
                        store: 'ConnUserChart',
                        colors: [
                             'rgba(103, 144, 199, 0.6)',
                             'rgba(238, 146, 156, 0.6)'
                        ],
                        legend : {
                        	border: false,
                        	docked : 'bottom'
                        },
                        axes: [
                            {
                                type: 'category',
                                maximum : 14,
                                fields: [
                                    'day'
                                ],
                                hidden: false,
                                position: 'bottom',
                                label: {
                                    rotate: {
                                        degrees: -45
                                    }
                                }
                            },
                            {
                                type: 'numeric',
                                minimum: 0,
                                fields: [
                                    'target',
                                    'data1',
                                    'data2'
                                ],
                                grid: {
                                    odd: {
                                        fill: '#e8e8e8'
                                    }
                                },
                                label: {
                                    renderer: function(v) { return Ext.util.Format.number(v,'0,000') + '명'; }
                                },
                                hidden: false,
                                position: 'left'
                            }
                        ],
                        series: [
                            {
                                type: 'line',
                                showInLegend: true,
                                title: '오늘',
                                xField: 'day',
                                yField: 'data1',
                                marker: {
                                	type: 'arrow',
                                	fx: {
                                		duration:200,
                                		easing: 'backOut'
                                	}
                                },
                                style: {
                                    'stroke-width': 3
                                },
                                highlightCfg : {
                                	opactity: 1,
                                	strokeStyle: 'black'
                                },
                                tooltip : {
                                	trackMouse: true,
                                	renderer: function(tooltip, record, item) {
                                		
                                		tooltip.setHtml(item.series._title + record.get('day') + ': ' + Ext.util.Format.number(record.get(item.field),'0,000') + '명');
                                    }
                                },
                                useDarkerStrokeColor: false,
                                //,
                                //fill: true
                                smooth: true
                            },
                            {
                                type: 'line',
                                showInLegend: true,
                                title: '어제',
                                xField: 'day',
                                yField: 'data2',
                                marker: {
                                	type: 'arrow',
                                	fx: {
                                		duration:200,
                                		easing: 'backOut'
                                	}
                                },
                                style: {
                                    'stroke-width': 3
                                },
                                highlightCfg : {
                                	opactity: 1,
                                	strokeStyle: 'black'
                                },
                                tooltip : {
                                	trackMouse: true,
                                	renderer: function(tooltip, record, item) {
                                		tooltip.setHtml(item.series._title +  record.get('day') + ': ' + Ext.util.Format.number(record.get(item.field),'0,000') + '명');
                                    }
                                },
                                useDarkerStrokeColor: false,
                                smooth: true
                                //fill: true
                            }
                        ],
                        interactions: [
                            {
                                type: 'panzoom'
                            }
                        ]
                    }
                ]
            }
     ]
});
