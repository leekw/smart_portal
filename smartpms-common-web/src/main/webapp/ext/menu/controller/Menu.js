Ext.define('Ext.menu.controller.Menu', {
    extend: 'Ext.app.Controller',
    stores: ['MenuTree', 'File'],
    models: ['MenuTree', 'File'],

    views: ['MenuTree'],

    refs: [{
    	ref: 'menuTree',
        selector: 'menutree'
    }],
    
    init: function() {

        this.control({
        	'menutree' : {
        		beforeload : this.subMenuBeforeLoad
        	},
            '#resourceTypeSelect' : {
            	change : this.changeResourceType
            }
        });
        
    },
	changeResourceType : function() {
		var cmp = Ext.getCmp('menu-form');
		var value = cmp.getValues().resourceTypeCode;
		var obj = Ext.getCmp('resourceContent');
		var url = Ext.getCmp('resource-url');
		if (value == "IMAGE") {
			obj.setReadOnly(false);
			url.setReadOnly(true);
		} else if(value == "MENU") {
			obj.setReadOnly(true);
			url.setReadOnly(true);
		} else {
			obj.setReadOnly(true);
			url.setReadOnly(false);
		}
		
	},
	subMenuBeforeLoad : function(store, operation, eOpts) {
		var proxy = store.getProxy();
	    var node = operation.node;
	    if (node != null && proxy != null) {
	    	if (node.data.id != 'root') {
	    		proxy.extraParams.parentResourceId = node.data.id;
	    	}
	    	
	    }
	},
	reload : function() {
		var tree = this.getMenuTree();
		tree.getStore().reload();
	}
    
});