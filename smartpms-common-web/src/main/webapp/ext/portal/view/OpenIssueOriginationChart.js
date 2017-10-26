Ext.define('Ext.portal.view.OpenIssueOriginationChart', {
    extend: 'Ext.Panel',
    xtype: 'openissueoriginationchart',
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
		            id : 'openissue-origination-chart',
		            width: '100%',
		            maxHeight: 250,
		            padding: '15 0 0 0',
		            style: {
		                'background' : '#fff'
		            },
		            animate: true,
		            shadow: false,
		            store: 'OpenIssueOriginationChart',
		            legend: {
		                position: 'left'
		            },
		            axes: [{
		                type: 'Numeric',
		                fields: 'data5',
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
		                title: 'Critical',
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
		                title: 'High',
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
		                title: 'Medium',
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
		            },{
		                type: 'line',
		                axis: 'left',
		                xField: 'day',
		                yField: 'data4',
		                title: 'Low',
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
		                        this.setTitle(storeItem.get('day') + ': ' + Ext.util.Format.number(storeItem.get('data4'),'0,000') + '건');
		                    }
		                }
		            },{
		                type: 'line',
		                axis: 'left',
		                xField: 'day',
		                yField: 'data5',
		                title: '전체',
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
		                        this.setTitle(storeItem.get('day') + ': ' + Ext.util.Format.number(storeItem.get('data5'),'0,000') + '건');
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
    		var chart = Ext.getCmp('openissue-origination-chart').getStore();
    		var isDesktop = Ext.os.is.MacOS || Ext.os.is.Windows || Ext.os.is.Linux;
    	        	    
    	    chart.timer = setInterval(function () {
    	    	chart.load();
    	    }, Ext.isIE || !isDesktop ? 1000 *5*60 : 1000 *5* 60);
        }
    } 
});
