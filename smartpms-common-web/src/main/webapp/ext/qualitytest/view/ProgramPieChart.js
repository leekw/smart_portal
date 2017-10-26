Ext.define('Ext.qualitytest.view.ProgramPieChart', {
    extend: 'Ext.panel.Panel',
    xtype: 'programpiechart',
    requires: [
		'Ext.chart.CartesianChart',
		'Ext.chart.axis.Category',
		'Ext.chart.axis.Numeric',
		'Ext.chart.series.Pie',
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
		  	html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;프로그램 유형 현황 </span></div>'
		  		  + '</div>'
		},
		{
		    xtype: 'container',
		    flex: 1,
		    layout: 'fit',
		    border :false,
		    items: [
		        {
		            xtype: 'polar',
		            border :false,
		            animation : !Ext.isIE9m && Ext.os.is.Desktop,
		            insetPadding:20,
		            store: Ext.create('Ext.qualitytest.store.ProgramPieChart'),
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
		            series: [
						{
						    type: 'pie',
						    angleField: 'programRatio',
						    label: {
						        field: 'programType',
						        colloutLine : {
						        	length : 60,
						        	width: 3
						        }
						    },
						    tooltip : {
						    	trackMouse: true,
						    	renderer: function(tooltip, record, item) {
                            		tooltip.setHtml(item.series._title + record.get('programType') + '-' + Ext.util.Format.number(record.get(item.field),'0,000') + '%');
                                }
						    },
						    highlight : true
						}
		            ],
		            interactions: [
		                'rotate', 'itemhighlight'
		            ]
		        }
		    ]
		}
     ]
});
