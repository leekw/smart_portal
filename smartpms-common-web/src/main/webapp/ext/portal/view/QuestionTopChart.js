Ext.define('Ext.portal.view.QuestionTopChart', {
    extend: 'Ext.Panel',
    xtype: 'questiontopchart',
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
		            id : 'question-chart',
		            width: '100%',
		            minHeight: 200,
		            padding: '15 0 0 0',
		            style: {
		                'background' : '#fff'
		            },
		            animate: true,
		            shadow: false,
		            store: 'QuestionChart',
		            legend: {
		                position: 'left'
		            },
		            axes: [{
		                type: 'Numeric',
		                fields: 'que',
		                position: 'left',
		                grid: true,
		                minimum: 0,
		                label: {
		                    renderer: function(v) { return v + '건'; }
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
		                yField: 'que',
		                title: '문의건수',
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
		                        this.setTitle(storeItem.get('day') + ': ' + storeItem.get('que') + '건');
		                    }
		                }
		            },{
		                type: 'line',
		                axis: 'left',
		                xField: 'day',
		                yField: 'helf1',
		                title: '1선-접수건',
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
		                        this.setTitle(storeItem.get('day') + ': ' + storeItem.get('helf1') + '건');
		                    }
		                }
		            },{
		                type: 'line',
		                axis: 'left',
		                xField: 'day',
		                yField: 'helf2',
		                title: '1선-완료건',
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
		                        this.setTitle(storeItem.get('day') + ': ' + storeItem.get('helf2') + '건');
		                    }
		                }
		            },{
		                type: 'line',
		                axis: 'left',
		                xField: 'day',
		                yField: 'helf3',
		                title: '1.5선-이관건',
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
		                        this.setTitle(storeItem.get('day') + ': ' + storeItem.get('helf3') + '건');
		                    }
		                }
		            },{
		                type: 'line',
		                axis: 'left',
		                xField: 'day',
		                yField: 'helf4',
		                title: '1.5선-완료건',
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
		                        this.setTitle(storeItem.get('day') + ': ' + storeItem.get('helf4') + '건');
		                    }
		                }
		            },{
		                type: 'line',
		                axis: 'left',
		                xField: 'day',
		                yField: 'helf5',
		                title: '2선-이관건',
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
		                        this.setTitle(storeItem.get('day') + ': ' + storeItem.get('helf5') + '건');
		                    }
		                }
		            },{
		                type: 'line',
		                axis: 'left',
		                xField: 'day',
		                yField: 'helf6',
		                title: '2선-완료건',
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
		                        this.setTitle(storeItem.get('day') + ': ' + storeItem.get('helf6') + '건');
		                    }
		                }
		            }]
		        }
		    ]
        }
        
        ];

        this.callParent();
    }
});
