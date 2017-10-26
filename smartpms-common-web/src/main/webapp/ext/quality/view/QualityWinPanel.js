Ext.define('Ext.quality.view.QualityWinPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.qualitywinpanel',
	id : 'quality-win-panel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	items : [
		{
			   xtype  : 'panel',
			   border : false,
			   width  : '100%',
			   layout : 'column',
			   items : [
			       {
			    	   xtype: 'checkboxgroup',
			    	   width : '100%',
			    	   fieldLabel : '검토유형',
			    	   columns: 10,
			    	   columnWidth : 0.97,
			    	   id : 'top-list-param',
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
			       },
			       {
			    	   xtype : 'button',
			    	   text : '조회',
			    	   ui : 'gray',
			    	   align : 'right',
			    	   width : 60,
			    	   handler : function() {
			    		   _tm = null;
			    			_md = null;
			    			_fc = null;
			    			var grid = Ext.getCmp('org-grid');
			    			var sm = grid.getSelectionModel();
			    	    	var rec = sm.getSelection()[0];
			    	    	if (rec) {
			    	    		_tm = rec.data.originalOrgName;
			    	    		var temp = Ext.getCmp('quality-summary-grid').getSelectionModel().getSelection()[0];
			    	    		if (temp) {
			    	    			_md = temp.data.module;
			    	    			
			    	    			var temp2 = Ext.getCmp('quality-detail-grid').getSelectionModel().getSelection()[0];
			    	        		if (temp2) {
			    	        			_fc = temp.data.function;
			    	        		}
			    	    		}
			    	    	}
			    	    	var topGrid = Ext.getCmp('developer-rank-grid');
	        	           	var topStore = topGrid.getStore();
	        	           	var topProxy = topStore.getProxy();
	        	           	topProxy.extraParams.team = _tm;
	        	           	var topList = Ext.getCmp('top-list-param').getValue()["topList"] + "";
	        	           	topProxy.extraParams.topList = topList.split(",") ;
	        	           	topProxy.extraParams.module = _md;
	        	           	topProxy.extraParams.function = _fc;
	        	           	topProxy.extraParams.searchMode = 'ALL';
	        	           	topStore.load();
	        	           	
	        	           	Ext.getCmp('developer-win-grid').getStore().removeAll();
			    	   }
			       }
			   ],
			   responsiveCls: 'big-100 small-100'
		},
		{
			xtype : 'developerrankgrid',
			responsiveCls: 'big-40 small-50'
		}
		,
		{
			xtype : 'developerwingrid',
			responsiveCls: 'big-60 small-50'
		}
	]
});
