Ext.define('Ext.ncutover.view.CutoverDelayGrid', {
    extend: 'Ext.Panel',
    xtype: 'cutoverdelaygrid',

    requires: [
       'Ext.ncutover.view.DashboardGrid'
    ],

    cls: 'service-type shadow-panel',
    height: 320,
    title: '작업지연 Task',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    tools: [
		{
		    xtype: 'tool',                                    
		    cls: 'x-fa fa-check-square-o dashboard-tools',
		    tooltip: '작업종료 20분전 Task',
		    width: 20,
		    height: 20,
		    hidden: true,
		    handler : function() {
		    	var grid = Ext.getCmp('cutover-dashboard-grid');
				var store = grid.getStore();
				var proxy = store.getProxy();
				proxy.extraParams.mode = '작업종료20';
				proxy.extraParams.yCategory = null;
				store.load();
		    }
		},{
		    xtype: 'tool',                                    
		    cls: 'x-fa fa-exclamation-circle dashboard-tools',
		    tooltip: 'Critical Task',
		    width: 20,
		    height: 20,
		    hidden: true,
		    handler : function() {
		    	var grid = Ext.getCmp('cutover-dashboard-grid');
				var store = grid.getStore();
				var proxy = store.getProxy();
				proxy.extraParams.mode = '중요작업';
				proxy.extraParams.yCategory = null;
				store.load();
		    }
		},{
            xtype: 'tool',                                    
            cls: 'x-fa fa-wrench dashboard-tools',
            tooltip: 'Task할당',
            width: 20,
            hidden: true,
            height: 20,
            handler : function() {
            	if (G_IS_HADNS != 'Y' && G_IS_CT_HANDS != 'Y') {
            		Ext.Msg.alert('Info', 'Task 할당에 대한 권한이 없습니다.');
            		return ;
            	} else {
            		var grid = Ext.getCmp('cutover-dashboard-grid');
            		var store = grid.getStore();
                	var url = "/int/cutover/task/assign.json";
                	var sm = grid.getSelectionModel();
                	var rec = sm.getSelection();
                	if (rec.length < 1) {
                		Ext.Msg.alert('Info', 'Task 할당 대상을 선택해 주십시오.');
                		return ;
                	}
                	Ext.getBody().mask("Processing...");
                	var params = [];
                	for (var i=0;i< rec.length;i++) {
                		var r = rec[i];
                		params.push(r.getData());
                	}
                	Ext.Ajax.request({
                	    url: url,
                	    method: 'POST',
                	    jsonData: Ext.encode(params),
                	    success: function(response){
                	    	Ext.Msg.alert('Complete', 'Task 할당 처리가 완료되었습니다.');
                	    	DashboardBind._reload();
                	    	Ext.getBody().unmask();
                	    },
                	    failure: function(){
                	    	Ext.Msg.alert('Error', 'Task 할당 처리 중 오료가 발생되었습니다.');
                	    	Ext.getBody().unmask();
                	    }
                	});
            	}
            }
        }
    ],
    items: [{
    	xtype : 'dashboardgrid',
    	id : 'cutover-dashboard-grid',
    	width : '100%',
        border : false
    }
        
    ],
    listeners : {
    	afterrender : function(panel) {
    		var header = panel.header;
    		header.setStyle('background-color', '#e91e63');
    		header.setStyle('border-color', '#e91e63');
    	}
    }
    
});
