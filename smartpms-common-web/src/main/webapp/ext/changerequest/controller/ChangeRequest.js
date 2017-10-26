Ext.define('Ext.changerequest.controller.ChangeRequest', {
    extend: 'Ext.app.Controller',
    stores: ['ChangeRequest','ChangeRequestJiraCombo', 'RepositoryCombo'],
    models: ['ChangeRequest','ChangeRequestJira','Repository'],

    views: ['ChangeRequestGrid','ChangeRequestJiraComboBox','RepositoryComboBox'],

    refs: [{
        ref: 'changeRequestGrid',
        selector: 'changerequestgrid'
    }],
    
    init: function() {

        this.control({
           'changerequestgrid' : {
        	   cellclick : this.openJira
           }
        });
        
    },
    openJira : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var grid = this.getChangeRequestGrid();
    	if (grid.columns[cellIndex-1].dataIndex == 'jiraId') {
    		var jiraId = record.data.jiraId;
    		var url = 'http://10.217.230.250:8080/browse/' + jiraId;
    	    var option = "left=100,top=100,width='100%',height='100%',fullscreen=yes,location=no,titlebar=no,scrollbars=yes";
        	var popup = window.open(url, 'WBS-CR_' + jiraId, option);
            popup.focus();
    	}
    }
});