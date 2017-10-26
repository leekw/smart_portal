Ext.define('Ext.qualityhist.view.CoverageChart', {
    extend: 'Ext.panel.Panel',
    xtype: 'coveragechart',
    requires: [
		'Ext.chart.CartesianChart',
		'Ext.chart.axis.Category',
		'Ext.chart.axis.Numeric',
		'Ext.chart.series.Line',
		'Ext.chart.series.Bar',
		'Ext.chart.series.Radar',
        'Ext.chart.interactions.PanZoom'
   ],
   cls: 'quick-graph-panel shadow-panel',
   height: 350,
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
	          	xtype : 'label',
	          	width : '100%',
	          	hieght : 10,
	          	html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;UT 커버리지 추이 </span></div>'
	          		  + '</div>'
	        },
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
                        id : 'coverage-chart',
                        store: 'CoverageChart',
                        colors: [
                             'rgba(103, 144, 199, 0.6)',
                             'rgba(238, 146, 156, 0.6)',
                             'rgba(051, 051, 051, 0.6)',
                             'rgba(138, 246, 156, 0.6)',
                             'rgba(208, 106, 256, 0.6)',
                             'rgba(100, 100, 100, 0.6)',
                             'rgba(238, 146, 250, 0.6)'
                        ],
                        legend : {
                        	border: false,
                        	docked : 'bottom'
                        },
                        axes: [
                            {
                                type: 'category',
                                maximum : 8,
                                fields: [
                                    'statDate'
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
                                maximum : 110,
                                fields: [
                                    'data1',
                                    'data2',
                                    'data3',
                                    'data4',
                                    'data5',
                                    'data6',
                                    'data7'
                                ],
                                grid: {
                                    odd: {
                                        fill: '#e8e8e8'
                                    }
                                },
                                label: {
                                    renderer: function(v) { return Ext.util.Format.number(v,'0,000'); }
                                },
                                hidden: false,
                                position: 'left',
                                limits: [{
                                    value: 65,
                                    line: {
                                        strokeStyle: 'red',
                                        lineDash: [6, 3],
                                        title: {
                                            text: 'UT 커버러지 목표 - 65%',
                                            fontSize: 10
                                        }
                                    }
                                }]
                            }
                        ],
                        series: [
                           
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
