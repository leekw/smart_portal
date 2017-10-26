Ext.define('Ext.qualityhist.store.SvnNotRegChart', {
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
        extraParams : { maxRowSize : 0, searchType : 'svnNotReg' }
    },
    autoLoad : true,
    listeners : {
    	load: function( store, records, successful, eOpts ) {
    		var chart = Ext.getCmp('svnnotreg-chart');
    		var series = [];
    		var titles = [];
    		var yFields = [];
    		var rec = records[0];
    		if (rec != null) {
	    		for (var i=1;i < 8;i++) {
	    			if (rec.get('name' + i) == null || rec.get('name' + i) == '') continue;
	    			titles.push(rec.get('name' + i));
	    			yFields.push('data' + i);
	    		}
	    		var serie = {
						type: 'bar',
						showInLegend: true,
						title: titles,
						xField: 'statDate',
						yField: yFields,
						style: {
						    'stroke-width': 3
						},
						highlightCfg : {
							opactity: 1,
							strokeStyle: 'black'
						},
						stacked : false,
						tooltip : {
							trackMouse: true,
							renderer: function(tooltip, record, item) {
								
								tooltip.setHtml(record.get('statDate') + ': ' + Ext.util.Format.number(record.get(item.field),'0,000'));
						    }
						},
						useDarkerStrokeColor: false
				};
				series.push(serie);
	    		chart.setSeries(series);
	    		chart.redraw();
    		}
    	}
    }
    
});