Ext.define('Ext.stabilizationm.view.StabilizationDashboard2', {
    extend: 'Ext.container.Container',
    xtype: 'stabliizationdashboard2',
    itemId: 'stabliizationdashboard2',
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
		    title : '접속자 추이',
		    id : 'chart-hist-title1',
		    iconCls: 'x-fa fa-line-chart',
		    items : [ {
		    	xtype : 'panel',
		    	border :false,
		    	items : [
		    	   {
		    		   xtype : 'connuserchart',
		    		   id : 'conn-chart',
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
				    	var chart1 = Ext.getCmp('conn-chart-detail');
				    	var proxy = chart1.getStore().getProxy();
				    	var date = new Date();
				    	var paramDay = DateUtil._formatDateYmd(date, 0);
				    	chart1.getStore().load();
				    	chart1.redraw();
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
