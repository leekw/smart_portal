Ext.define('Ext.programvf.controller.Programvf', {
    extend: 'Ext.app.Controller',
    stores: ['ChangeRequestJira','Verify','ProgramListJira','Volume'],
    models: ['ChangeRequestJira','Verify','ProgramListJira','Volume'],

    views: ['VerifyGrid'],

    refs: [{
	    ref: 'verifyGrid',
	    selector: 'verifygrid'
	}],
    
    init: function() {

        this.control({
        	'verifygrid' : {
        		cellclick : this.loadProgramList
        	}
        });
    },
    loadProgramList : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var crGrid = Ext.getCmp('cr-grid');
		var sm = crGrid.getSelectionModel();
    	var rec = sm.getSelection()[0];
    	var pgGrid = Ext.getCmp('program-grid');
    	var store = pgGrid.getStore();
       	var proxy = store.getProxy();
       	proxy.extraParams.jiraId = rec.data.jiraId;
    	var grid = this.getVerifyGrid();
    	if (grid.columns[cellIndex].dataIndex == 'verifyCount') {
    		proxy.extraParams.logType = 'VERIFY';
    	} else if (grid.columns[cellIndex].dataIndex == 'dateCount') {
    		proxy.extraParams.logType = 'DATE';
    	} else if (grid.columns[cellIndex].dataIndex == 'formatCount') {
    		proxy.extraParams.logType = 'FORMAT';
    	} else if (grid.columns[cellIndex].dataIndex == 'reqCount') {
    		proxy.extraParams.logType = 'REQUIRED';
    	} else if (grid.columns[cellIndex].dataIndex == 'newCount') {
    		proxy.extraParams.logType = 'DUP';
    	} else if (grid.columns[cellIndex].dataIndex == 'etcCount') {
    		proxy.extraParams.logType = 'ETC';
    	}
     	store.load();
    }
});
