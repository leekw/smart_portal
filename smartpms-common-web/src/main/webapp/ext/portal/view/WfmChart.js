Ext.define('Ext.portal.view.WfmChart', {
    extend: 'Ext.Panel',
    xtype: 'wfmchart',
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

    initComponent: function() {
        var me = this;

        this.myDataStore = Ext.create('Ext.data.JsonStore', {
            fields: ['day', 'data0', 'data1', 'data2', 'data3' ],
            data: [
                { day: '20일 15시', data0: 430, data1: 430, data2: 99, data3: 92},
                { day: '19일 15시', data0: 427, data1: 421, data2: 99, data3: 86}
            ]
        });
        
        this.myDataStore2 = Ext.create('Ext.data.JsonStore', {
            fields: ['day', 'data0', 'data1', 'data2', 'data3' ],
            data: [
                { day: '19일 15시', data0: 46, data1: 46, data2: 100, data3: 100},
                { day: '19일 17시', data0: 250, data1: 250, data2: 100, data3: 100},
                { day: '19일 19시', data0: 430, data1: 430, data2: 99, data3: 92},
                { day: '19일 21시', data0: 450, data1: 450, data2: 99, data3: 92},
                { day: '20일 10시', data0: 10, data1: 8, data2: 80, data3: 80},
                { day: '20일 12시', data0: 50, data1: 50, data2: 100, data3: 100},
                { day: '20일 15시', data0: 230, data1: 230, data2: 100, data3: 100}
                
            ]
        });
        

        me.items = [{
            xtype: 'gridpanel',
            autoScroll: true,
            minHeight: 100,
            columns : {
                defaults: {
                    sortable: false,
                    menuDisabled: true
                },
                items: [
                    { text: '일시', dataIndex: 'day' },
                    { text: '인입호', dataIndex: 'data0'},
                    { text: '응답호', dataIndex: 'data1'},
                    { text: '응답률', dataIndex: 'data2'},
                    { text: '20초서비스레벨', dataIndex: 'data3'}
                ]
            },
            store: this.myDataStore,
            width: '100%'
        },{
            xtype: 'chart',
            id : 'wfm-chart',
            minHeight: 110,
            width: '100%',
            padding: '0 0 0 0',
            style: {
                'background' : '#fff'
            },
            animate: true,
            shadow: false,
            store: this.myDataStore2,
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Numeric',
                fields: 'data2',
                position: 'left',
                grid: true,
                minimum: 0,
                label: {
                    renderer: function(v) { return v + '%'; }
                }
            }, {
                type: 'Category',
                fields: ['day'],
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
                yField: 'data2',
                title: '응답율',
                showInLegend: true,
                style: {
                    'stroke-width': 4
                },
                markerConfig: {
                    radius: 2
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
                        this.setTitle(storeItem.get('day') + ': ' + storeItem.get('data2') + '%');
                    }
                }
            },{
                type: 'line',
                axis: 'left',
                xField: 'day',
                yField: 'data3',
                title: '20초서비스레벨',
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
                        this.setTitle(storeItem.get('day') + ': ' + storeItem.get('data3') + '%');
                    }
                }
            }]
        }
        ];

        this.callParent();
    }
});
