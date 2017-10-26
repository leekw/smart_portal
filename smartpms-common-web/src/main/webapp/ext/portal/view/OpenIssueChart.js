Ext.define('Ext.portal.view.OpenIssueChart', {
    extend: 'Ext.Panel',
    xtype: 'openissuechart',
    layout: {
        type: 'fit'
    },
    themes: {
        classic: {
            percentChangeColumn: {
                width: 75
            }
        },
        neptune: {
            percentChangeColumn: {
                width: 100
            }
        }
    },
    initComponent: function() {
        var me = this;


        me.items = [{
        	xtype : 'panel',
        	layout: {
                type: 'vbox'
            },
        	items :[{
		            xtype: 'chart',
		            id : 'openissue-chart',
		            width: '100%',
		            height: 250,
		            padding: '15 0 0 0',
		            style: {
		                'background' : '#fff'
		            },
		            animate: true,
		            shadow: false,
		            store: 'OpenIssueChart',
		            legend: {
		                position: 'left'
		            },
		            axes: [{
		                type: 'Numeric',
		                fields: 'data3',
		                position: 'left',
		                grid: true,
		                minimum: 0,
		                label: {
		                    renderer: function(v) { return Ext.util.Format.number(v,'0,000') + '건'; }
		                }
		            }, {
		                type: 'Category',
		                fields: 'day',
		                position: 'bottom',
		                grid: true,
		                label: {
		                    rotate: {
		                        degrees: -45
		                    }
		                }
		            }],
		            series: [{
		                type: 'line',
		                axis: 'left',
		                xField: 'day',
		                yField: 'data1',
		                title: '처리중',
		                showInLegend: true,
		                style: {
		                    'stroke-width': 4
		                },
		                markerConfig: {
		                    radius: 4
		                },
		                highlight: {
		                    fill: '#000',
		                    radius: 5,
		                    'stroke-width': 2,
		                    stroke: '#fff'
		                },
		                tips: {
		                    trackMouse: true,
		                    style: 'background: #FFF',
		                    height: 20,
		                    showDelay: 0,
		                    dismissDelay: 0,
		                    hideDelay: 0,
		                    renderer: function(storeItem, item) {
		                        this.setTitle(storeItem.get('day') + ': ' + Ext.util.Format.number(storeItem.get('data1'),'0,000') + '건');
		                    }
		                }
		            },{
		                type: 'line',
		                axis: 'left',
		                xField: 'day',
		                yField: 'data2',
		                title: '처리완료',
		                showInLegend: true,
		                style: {
		                    'stroke-width': 4
		                },
		                markerConfig: {
		                    radius: 4
		                },
		                highlight: {
		                    fill: '#000',
		                    radius: 5,
		                    'stroke-width': 2,
		                    stroke: '#fff'
		                },
		                tips: {
		                    trackMouse: true,
		                    style: 'background: #FFF',
		                    height: 20,
		                    showDelay: 0,
		                    dismissDelay: 0,
		                    hideDelay: 0,
		                    renderer: function(storeItem, item) {
		                        this.setTitle(storeItem.get('day') + ': ' + Ext.util.Format.number(storeItem.get('data2'),'0,000') + '건');
		                    }
		                }
		            },{
		                type: 'line',
		                axis: 'left',
		                xField: 'day',
		                yField: 'data3',
		                title: 'Defect전체',
		                showInLegend: true,
		                style: {
		                    'stroke-width': 4
		                },
		                markerConfig: {
		                    radius: 4
		                },
		                highlight: {
		                    fill: '#000',
		                    radius: 5,
		                    'stroke-width': 2,
		                    stroke: '#fff'
		                },
		                tips: {
		                    trackMouse: true,
		                    style: 'background: #FFF',
		                    height: 20,
		                    showDelay: 0,
		                    dismissDelay: 0,
		                    hideDelay: 0,
		                    renderer: function(storeItem, item) {
		                        this.setTitle(storeItem.get('day') + ': ' + Ext.util.Format.number(storeItem.get('data3'),'0,000') + '건');
		                    }
		                }
		            }]
		        }
		    ]
        }
        
        ];

        this.callParent();
    },
    listeners : {
    	afterrender : function(g, etc) {
    		var chart = Ext.getCmp('openissue-chart').getStore();
    		var isDesktop = Ext.os.is.MacOS || Ext.os.is.Windows || Ext.os.is.Linux;
    	        	    
    	    chart.timer = setInterval(function () {
    	    	chart.load();
    	    }, Ext.isIE || !isDesktop ? 1000 *5*60 : 1000 *5* 60);
        }
    } 
});
