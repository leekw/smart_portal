Ext.define('Ext.program.controller.Program', {
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
    		if(records[0].data.mode == 'D') {
    			form.getForm().getFields().each(function (field) {
    				field.setReadOnly (true);
    			});
    		} else {
    			form.getForm().getFields().each(function (field) {
    				field.setReadOnly (false);
    			});
    		}
    		
        	form.getForm().loadRecord(records[0]);
        } 
    }
});
