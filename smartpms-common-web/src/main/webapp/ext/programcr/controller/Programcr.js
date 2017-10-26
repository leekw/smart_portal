Ext.define('Ext.programcr.controller.Programcr', {
    extend: 'Ext.app.Controller',
    stores: ['ChangeRequestJira','ProgramListJira','SourceProgramListJira'],
    models: ['ChangeRequestJira','ProgramListJira','SourceProgramListJira'],

    views: ['ProgramGrid'],

    refs: [{
    	ref: 'programGrid',
	    selector: 'programgrid'
    }],
    
    init: function() {

        this.control({
        	'programgrid' : {
        		selectionchange : this.openProgramInfo
        	}
        });
    },
    openProgramInfo : function(model, records) {
    	var grid = this.getProgramGrid();
    	var form = Ext.getCmp('program-form');
    	form.getForm().reset();
    	if (records[0]) {
        	form.getForm().loadRecord(records[0]);
        } 
    }
});
