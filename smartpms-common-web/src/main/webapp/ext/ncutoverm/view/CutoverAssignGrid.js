Ext.define('Ext.ncutoverm.view.CutoverAssignGrid', {
    extend: 'Ext.Panel',
    xtype: 'cutoverassigngrid',

    requires: [
        
    ],

    cls: 'service-type shadow-panel',
    height: 400,
    title: '작업할당 대상 Task (예정시작 일시 10분전 및 미할당 Task)',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [{
    	xtype : 'readygrid',
    	id : 'assign-tartget-grid',
    	width : '100%',
        border : false
    }
        
    ],
    tools: [
        {
            xtype: 'tool',                                    
            cls: 'x-fa fa-wrench dashboard-tools',
            tooltip: 'Task할당',
            width: 20,
            hidden: G_IS_HADNS == 'Y' ? false : true,
            height: 20,
            handler : function() {
            	if (G_IS_HADNS != 'Y') {
            		Ext.Msg.alert('Info', 'Task 할당에 대한 권한이 없습니다.');
            		return ;
            	} else {
            		var grid = Ext.getCmp('assign-tartget-grid');
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
    listeners : {
    	afterrender : function(panel) {
    		var header = panel.header;
    		header.setStyle('background-color', '#607d8b');
    		header.setStyle('border-color', '#607d8b');
    	}
    }
});
