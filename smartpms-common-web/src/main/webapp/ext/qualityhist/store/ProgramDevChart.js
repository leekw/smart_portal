Ext.define('Ext.qualityhist.store.ProgramDevChart', {
    extend: 'Ext.data.Store',
    model: 'Ext.qualityhist.model.ChartData',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/quality/history/chart/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'datas'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0, searchType : 'programDev' }
    },
    autoLoad : true,
    listeners : {
    	load: function( store, records, successful, eOpts ) {
    		var chart = Ext.getCmp('program-dev-chart');
    		var series = [];
    		var rec = records[0];
    		if (rec != null) {
	    		for (var i=1;i < 8;i++) {
	    			if (rec.get('name' + i) == null || rec.get('name' + i) == '') continue;
	    			var serie = {
	    					type: 'line',
	    					showInLegend: true,
	    					title: rec.get('name' + i),
	    					xField: 'statDate',
	    					yField: 'data' + i,
	    					marker: {
	    						type: 'arrow',
	    						fx: {
	    							duration:200,
	    							easing: 'backOut'
	    						}
	    					},
//	    					label: {
//	    						field: 'data' + i,
//	    						display: 'over'
//	    					},
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
	    							
	    							tooltip.setHtml(record.get('statDate') + ': ' + Ext.util.Format.number(record.get(item.field),'0,000'));
	    					    }
	    					},
	    					useDarkerStrokeColor: false,
	    					smooth: true
	    			};
	    			series.push(serie);
	    		}
	    		chart.setSeries(series);
	    		chart.redraw();
    		}
    	}
    }
    
});