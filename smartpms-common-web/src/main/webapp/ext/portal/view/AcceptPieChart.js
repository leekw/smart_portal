Ext.define('Ext.portal.view.AcceptPieChart', {
    extend: 'Ext.Panel',
    xtype: 'acceptpiechart',
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

        this.myDataStore = Ext.create('Ext.data.JsonStore', {
            fields: ['type', 'data1' ],
            data: [
                { type: '단순문의', data1: 30.5},
				{ type: '이슈', data1: 20.5},
				{ type: '결함', data1: 40},
				{ type: '기타', data1: 9}
            ]
        });
        
        var temp = this.myDataStore;
	    var isDesktop = Ext.os.is.MacOS || Ext.os.is.Windows || Ext.os.is.Linux;
	    var count = temp.getCount() - 1;
	    
	    temp.timer = setInterval(function () {
	    	var rec = temp.getAt(Ext.Number.randomInt(0, count));
	    	var aaa = Ext.Number.randomInt(0, 100);
	    	 rec.set({
	    		 type: rec.get('type'),
	             data1: aaa
	         });
	    	 var chart = Ext.getCmp('biz-proc-chart');
	    	 chart.redraw();
	    }, Ext.isIE || !isDesktop ? 1000 : 2000);

        me.items = [{
            xtype: 'chart',
            id : 'accept-pie-chart',
            width: '100%',
            padding: '0 0 0 0',
            style: {
                'background' : '#fff'
            },
            animate: true,
            shadow: false,
            store: this.myDataStore,
            legend: {
            	field: 'type',
                position: 'bottom',
                boxStrokeWidth: 0
            },
            series: [{
                type: 'pie',
                angleField: 'data1',
                label: {
                    field: 'type',
                    display: 'inside'
                },
                showInLegend: true,
                highlight: true,
                highlightCfg: {
                    fill: '#000',
                    'stroke-width': 20,
                    stroke: '#fff'
                },
                tips: {
                    trackMouse: true,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('type') + ': ' + storeItem.get('data1') + '%');
                    }
                }
            }]
        }
        ];

        this.callParent();
    }
});
