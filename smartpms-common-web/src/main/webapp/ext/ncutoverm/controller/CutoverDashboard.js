Ext.define('Ext.ncutoverm.controller.CutoverDashboard', {
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
    	
    },
    openCutoverJira2 : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	
    }
});