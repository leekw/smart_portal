var _timer;
Ext.define('Ext.ncutoverm.view.Viewport', {
    extend: 'Ext.Viewport', 
    overflowY : 'auto',
//    scrollable : 'y',
//    minHeight : 500,
    requires: [
        'Ext.ncutoverm.view.CutoverDashboard',
        'Ext.ncutoverm.view.CutoverDashboard2',
        'Ext.ncutoverm.view.CutoverDashboard3',
        'Ext.ncutoverm.view.WidgetTop',
        'Ext.ux.BoxReorderer'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                	xtype : 'tabpanel',
                	border:false,
                	bodyStyle: {
        		        background: 'none'
        		    },
        		    id : 'cutover-tab-panel',
                	items : [
						{
						    xtype: 'cutoverdashboard2',
						    title : '진행율'
						},
						{
						    xtype: 'cutoverdashboard',
						    title : 'Task 현황'
						},
						{
						    xtype: 'cutoverdashboard3',
						    id : 'tab-task-panel',
						    title : 'Task 목록'
						}
                	]
                }
            ]
        });
                
        me.callParent(arguments);
    },
    listeners : {
    	beforerender : function() {
			Ext.Ajax.request({
	    	    url: G_PATH + '/cutover/dashboard/info/get.json',
	    	    method: 'POST',
	    	    jsonData: Ext.encode({}),
	    	    success: function(response){
	    	    	var data = JSON.parse(response.responseText);
	    	    	DashboardBind._bindSummaryInfo(data);
	    	    },
	    	    failure: function(){
	    	    	
	    	    }
	    	});
			ChartView._initBar('status-1', '17146');
			ChartView._initBar('status-2', '17151');
			ChartView._initBar('status-3', '17149');
			ChartView._initBar('status-4', '17152');
			ChartView._initBar('status-5', '17158');
			ChartView._initBar('status-6', '17352');

    		Ext.TaskManager.start({
    			run: DashboardBind._reload,
    			interval: 60000
    		});
    	},
    	beforeshow : function() {
    		
    	}
    }
});

var Runner = function(){
    var f = function(v, pbar, count, cb){
        return function(){
            if(v > count){
                cb();
            }else{
            	pbar.updateProgress(v/count, '');
            }
       };
    };
    return {
        run : function(pbar, count, cb) {
            var ms = 5000/count;
            for(var i = 1; i < (count+2); i++){
               setTimeout(f(i, pbar, count, cb), i*ms);
            }
        }
    };
}();
var _PieChartIndex = 1;
var _PieGridReload = false;
var DashboardBind = {
	_reload : function() {
		Ext.getBody().mask("Processing...");
		Ext.Ajax.request({
    	    url: G_PATH + '/cutover/dashboard/info/get.json',
    	    method: 'POST',
    	    jsonData: Ext.encode({}),
    	    success: function(response){
    	    	var data = JSON.parse(response.responseText);
    	    	DashboardBind._bindSummaryInfo(data);
    	    	Ext.getBody().unmask();
    	    },
    	    failure: function(){
    	    	Ext.getBody().unmask();
    	    }
    	});
		ChartView._initBar('status-1', '17146');
		ChartView._initBar('status-2', '17151');
		ChartView._initBar('status-3', '17149');
		ChartView._initBar('status-4', '17152');
		ChartView._initBar('status-5', '17158');
		ChartView._initBar('status-6', '17352');

		var grid2 = Ext.getCmp('cutover-dashboard-grid');
		var store2 = grid2.getStore();
		store2.load();

	},
	_bindStatusInfo : function(data) {
		var ratio = 0;
		var assignready = Ext.getCmp('assignready-status');
    	var assignreadypg = Ext.getCmp('assignready-status-pg');
    	var workready = Ext.getCmp('workready-status');
    	var workreadypg = Ext.getCmp('workready-status-pg');
    	var working = Ext.getCmp('working-status');
    	var workingpg = Ext.getCmp('working-status-pg');
    	var startdelay = Ext.getCmp('startdelay-status');
    	var startdelaypg = Ext.getCmp('startdelay-status-pg');
    	var enddelay = Ext.getCmp('enddelay-status');
    	var enddelaypg = Ext.getCmp('enddelay-status-pg');
    	var complete = Ext.getCmp('complete-status');
    	var completepg = Ext.getCmp('complete-status-pg');
    	ratio = data.info.totalCount == 0 ? 0 : data.info.assignReadyCount/data.info.totalCount;
    	assignready.setData({
            name: '할당대기',
            value: (ratio*100).toFixed(2) + '% (' + data.info.assignReadyCount + '/' + data.info.totalCount + ')'
        });
    	assignreadypg.setValue(ratio);
    	
    	ratio = data.info.totalCount == 0 ? 0 : data.info.workReadyCount/data.info.totalCount;
    	workready.setData({
            name: '작업대기',
            value: (ratio*100).toFixed(2) + '% (' + data.info.workReadyCount + '/' + data.info.totalCount + ')'
        });
    	workreadypg.setValue(ratio);
    	
    	ratio = data.info.totalCount == 0 ? 0 : data.info.workingCount/data.info.totalCount;
    	working.setData({
            name: '작업진행중',
            value: (ratio*100).toFixed(2) + '% (' + data.info.workingCount + '/' + data.info.totalCount + ')'
        });
    	workingpg.setValue(ratio);
    	
    	ratio = data.info.totalCount == 0 ? 0 : data.info.startDelayCount/data.info.totalCount;
    	startdelay.setData({
            name: '시작지연',
            value: (ratio*100).toFixed(2) + '% (' + data.info.startDelayCount + '/' + data.info.totalCount + ')'
        });
    	startdelaypg.setValue(ratio);
    	    	
    	ratio = data.info.totalCount == 0 ? 0 : data.info.endDelayCount/data.info.totalCount;
    	enddelay.setData({
            name: '종료지연',
            value: (ratio*100).toFixed(2) + '% (' + data.info.endDelayCount + '/' + data.info.totalCount + ')'
        });
    	enddelaypg.setValue(ratio);
    	
    	ratio = data.info.totalCount == 0 ? 0 : data.info.workCompleteCount/data.info.totalCount;
    	complete.setData({
            name: '작업완료',
            value: (ratio*100).toFixed(2) + '% (' + data.info.workCompleteCount + '/' + data.info.totalCount + ')'
        });
    	completepg.setValue(ratio);
    	
	},
	_bindSummaryInfo : function(data) {
    	var total = Ext.getCmp('dashboard-total');
    	var assignready = Ext.getCmp('dashboard-assignready');
    	var workready = Ext.getCmp('dashboard-workready');
    	var working = Ext.getCmp('dashboard-working');
    	var workdelay = Ext.getCmp('dashboard-workdelay');
    	var workcomplete = Ext.getCmp('dashboard-workcomplete');
    	var workingRatio = Ext.getCmp('total-working-ratio');
    	var workingTotalView = Ext.getCmp('total-working-view');
    	total.setData({
	        amount: data.info.totalCount,
	        type: '작업대상',
	        icon: 'list-alt',
	        color: '#673ab7'
	    });
    	assignready.setData({
	        amount: data.info.assignReadyCount,
	        type: '할당대기',
	        icon: 'dropbox',
	        color: '#c0c0c0'
	    });
    	workready.setData({
	        amount: data.info.workReadyCount,
	        type: '작업대기',
	        icon: 'spinner',
	        color: '#ffc107'
	    });
    	working.setData({
	        amount: data.info.workingCount,
	        type: '작업진행중',
	        icon: 'gears',
	        color: '#4caf50'
	    });
    	workdelay.setData({
	        amount: data.info.workDelayCount,
	        type: '작업지연',
	        icon: 'warning',
	        color: '#e91e63'
	    });
    	workcomplete.setData({
	        amount: data.info.workCompleteCount,
	        type: '작업완료',
	        icon: 'check',
	        color: '#458fd2'
	    });
    	workingTotalView.setData({
            name: '전체 작업 진행률',
            value: (data.info.workingRatio*100).toFixed(2) + '%'
        });
    	workingRatio.setValue(data.info.workingRatio);
	}	
};
