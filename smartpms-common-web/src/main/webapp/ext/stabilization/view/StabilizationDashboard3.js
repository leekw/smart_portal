Ext.define('Ext.stabilizationm.view.StabilizationDashboard3', {
    extend: 'Ext.container.Container',
    xtype: 'stabliizationdashboard3',
    itemId: 'stabliizationdashboard3',
    border : false,
    requires: [
		
    ],
    
    layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
    items: [
		{
		    xtype: 'panel',
		    title : '업무처리 추이',
		    id : 'chart-hist-title2',
		    iconCls: 'x-fa fa-line-chart',
		    items : [ {
		    	xtype : 'panel',
		    	border :false,
		    	items : [
		    	   {
		    		   xtype : 'bizprocesschart',
		    		   id : 'biz-chart',
		    		   border :false
		    	   }
		    	]
		    }
		    ],
		    tools: [
				{
					xtype: 'tool', 
					cls: 'x-fa fa-refresh dashboard-tools2',
				    tooltip: '새로고침',
				    width: 20,
				    height: 20,
				    handler : function() {
				    	var chart2 = Ext.getCmp('biz-chart-detail');
				    	var proxy = chart2.getStore().getProxy();
				    	var date = new Date();
				    	var paramDay = DateUtil._formatDateYmd(date, 0);
				    	chart2.getStore().load();
				    	chart2.redraw();
				    	_connUserHours = null;
				    	_bizTypeHours = null;
				    	
				    }
				}
		    ],        
    	    listeners : {
    	    	afterrender : function(panel) {
    	    		var header = panel.header;
    	    		header.setStyle('background-color', '#fafafa');
    	    		header.setStyle('border-color', '#d0d0d0');
    	    	}
    	    },
		    responsiveCls: 'big-60 small-100'
		}
    ],
    listeners : {
    	afterrender : function() {
    		
    	}
    }
});
