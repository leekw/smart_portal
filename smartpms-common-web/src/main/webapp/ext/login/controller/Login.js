Ext.define('Ext.login.controller.Login', {
    extend: 'Ext.app.Controller',
    stores: ['OrgTree'],
    models: ['OrgTree'],

    views: ['OrgTree'],

    refs: [{
    	ref: 'orgTree',
        selector: 'orgtree'
    }],
    
    init: function() {

        this.control({
        	'orgtree' : {
        		beforeload : this.orgBeforeLoad
        	}
        });

    },
    orgBeforeLoad : function(store, operation, eOpts) {
		var proxy = store.getProxy();
	    var node = operation.node;
	    if (node != null && proxy != null) {
	    	if (node.data.id != 'root') {
	    		proxy.extraParams.parentOrgId = node.data.id;
	    	}
	    	
	    }
    }
});