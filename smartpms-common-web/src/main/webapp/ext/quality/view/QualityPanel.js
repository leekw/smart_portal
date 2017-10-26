Ext.define('Ext.quality.view.QualityPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.qualitypanel',
	id : 'quality-panel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	items : [ 
		{
			style: {
		        background: 'none'
		    },
			items : [
			   {
				   xtype : 'orggrid'
			   },
			   {
				   xtype : 'panel',
				   border : false,
				   width : '100%',
				   items : [
				       {
				    	   xtype: 'checkboxgroup',
				    	   width : '100%',
				    	   columns: 3,
				    	   id : 'top-list',
				           vertical: true,
				           items: [
				               { boxLabel: '개발지연', name: 'topList', inputValue: 'pgDelay' },
				               { boxLabel: '호출누락', name: 'topList', inputValue: 'unUsedSource' },
				               { boxLabel: 'UT누락', name: 'topList', inputValue: 'utNotest' },
				               { boxLabel: 'SIT누락', name: 'topList', inputValue: 'sitNotest' },
				               { boxLabel: '구문 10↓', name: 'topList', inputValue: 'underStatement' },
				               { boxLabel: 'RUN미수행', name: 'topList', inputValue: 'notRun', checked: true },
				               { boxLabel: 'UT-Cvrg65%↓', name: 'topList', inputValue: 'utCoverage', checked: true },
				               { boxLabel: 'SIT-Cvrg65%↓', name: 'topList', inputValue: 'underSitCoverage'}
				           ]
				       }
				   ]
			   },
			   {
				   xtype : 'developertopgrid'
			   }
			],
			responsiveCls: 'big-20 small-50'
		},{
			xtype : 'tabpanel',
			border : false,
			items :[
			   {
				   title : '종합 현황',
				   xtype : 'qualitysummarygrid'
			   },
			   {
				   title : '상세 현황',
				   xtype : 'qualitydetailgrid',
				   listeners : {
					   activate : function(tab, eOpts) {
						  var org = Ext.getCmp('quality-summary-grid');
						  var sm = org.getSelectionModel();
	  		    	      var rec = sm.getSelection()[0];
				    	  if (rec != null) {
							  var grid = Ext.getCmp('quality-detail-grid');
							  var store = grid.getStore();
			               	  var proxy = store.getProxy();
			               	  proxy.extraParams.team = rec.data.team;
			               	  proxy.extraParams.module = rec.data.module;
			               	  store.load();
				    	  }
					   }
				   }
			   }
			],
			responsiveCls: 'big-80 small-50'
		},
		{
			xtype : 'developergrid',
			responsiveCls: 'big-80 small-50'
		}
	]
});
