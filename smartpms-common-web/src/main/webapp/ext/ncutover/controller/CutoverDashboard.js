Ext.define('Ext.ncutover.controller.CutoverDashboard', {
    extend: 'Ext.app.Controller',
    stores: ['CutoverMain','CutoverChart','CutoverReady'],
    models: ['CutoverMain','CutoverChart'],

    views: ['DashboardGrid', 'ReadyGrid'],

    refs: [{
	    ref: 'dashboardGrid',
	    selector: 'dashboardgrid'
	},{
	    ref: 'readyGrid',
	    selector: 'readygrid'
	}],
    
    init: function() {

        this.control({
        	'dashboardgrid' : {
        		cellclick : this.openCutoverJira
        	},
        	'readygrid' : {
        		cellclick : this.openCutoverJira2
        	}
        });
        
    },
    openCutoverJira : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var grid = this.getDashboardGrid();
    	if (grid.columns[cellIndex].dataIndex == 'jiraId') {
    		var jiraId = record.data.jiraId;
    		var url = 'http://10.217.230.250:8080/browse/' + jiraId;
    	    var option = "left=100,top=100,width='100%',height='100%',fullscreen=yes,location=no,titlebar=no,scrollbars=yes";
        	var popup = window.open(url, 'CutOver_Task_' + jiraId, option);
            popup.focus();
    	}
    },
    openCutoverJira2 : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var grid = this.getReadyGrid();
    	if (grid.columns[cellIndex-1] != null && grid.columns[cellIndex-1].dataIndex == 'jiraId') {
    		var jiraId = record.data.jiraId;
    		var url = 'http://10.217.230.250:8080/browse/' + jiraId;
    	    var option = "left=100,top=100,width='100%',height='100%',fullscreen=yes,location=no,titlebar=no,scrollbars=yes";
        	var popup = window.open(url, 'CutOver_Task_' + jiraId, option);
            popup.focus();
    	}
    }
});