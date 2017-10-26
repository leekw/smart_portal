Ext.define('Ext.portal.view.ConnUserChart', {
    extend: 'Ext.Panel',
    xtype: 'connuserchart',
    layout: {
    	type: 'vbox',
        pack: 'center'
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
    // </example>

    initComponent: function() {
        var me = this;

//        this.store = 'ConnUserChart';

        me.items = [{
            xtype: 'chart',
            id : 'conn-user-chart',
            width: '100%',
            minHeight: 250,
            padding: '5 0 0 0',
            style: {
                'background' : '#fff'
            },
            animate: true,
            shadow: false,
            store: 'ConnUserChart',
            legend: {
                position: 'bottom'
            },
            axes: [{
                type: 'Numeric',
                fields: 'target',
                position: 'left',
                grid: true,
                minimum: 0,
                label: {
                    renderer: function(v) { return Ext.util.Format.number(v,'0,000') + '명'; }
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
                title: DateUtil._formatDate(Ext.getCmp('search-date').getValue(), 0),
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
                        this.setTitle(storeItem.get('day') + ': ' + Ext.util.Format.number(storeItem.get('data1'),'0,000') + '명');
                    }
                }
            },{
                type: 'line',
                axis: 'left',
                xField: 'day',
                yField: 'data2',
                title: DateUtil._formatDate(Ext.getCmp('search-date').getValue(), -1),
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
                        this.setTitle(storeItem.get('day') + ': ' + Ext.util.Format.number(storeItem.get('data2'),'0,000') + '명');
                    }
                }
            },{
                type: 'line',
                axis: 'left',
                xField: 'day',
                yField: 'target',
                title: '대상수',
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
                        this.setTitle(storeItem.get('day') + ': ' + Ext.util.Format.number(storeItem.get('target'),'0,000') + '명');
                    }
                }
            }]
        }];

        this.callParent();
    }
});
