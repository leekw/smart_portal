var M_TITLE = '';
Ext.define('Ext.layout.controller.LayoutMain', {
    extend: 'Ext.app.Controller',
    stores: ['SubMenu'],
    models: ['SubMenu'],

    views: ['Header', 'SubMenu'],

    refs: [{
    	ref: 'SubMenu',
        selector: 'submenu'
    }],
    
    init: function() {

        this.control({
        	'submenu' : {
        		beforeload : this.subMenuBeforeLoad,
        		itemclick : this.onSubMenuSelect
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
    	var tree = this.getSubMenu();
    	tree.getStore().reload();
    },
    onSubMenuSelect : function(view, record) {
    	var tab = Ext.getCmp('center-tab');
    	var count = tab.items.getCount();    	
    	if (count > 10) {
    		tab.setActiveTab(0);
    		tab.remove(tab.getActiveTab());
    	}
    	if (tab.getComponent(record.data.id) == null
    			&& record.data.leaf) {
    			M_TITLE = record.data.text;
    			if (record.data.resourceTypeCode == 'IMAGE') {
    				tab.add({
    					title : record.data.text,
	    				id : record.data.id,
	    				autoScroll : true,
	    				html: '<div style="padding: 20px 20px 20px 20px;">' + record.data.resourceContent + '</div>',
	    				closable : true
    				});
    			} else {
    				if (record.data.url.indexOf("http://") != -1) {
    					var url = record.data.url;
    	 			    var option = "left=100,top=100,width=1200,height=800,location=no,titlebar=no,scrollbars=yes";
    	 			    var title = record.data.text;
    	 		    	var popup = window.open(url, title, option);
    	 		        popup.focus();
    				} else {
		    			tab.add({
		    				title : record.data.text,
		    				id : record.data.id,
		    				items : [{ 
		    	  	            xtype: 'component', 
		    	  	            title: 'content',
		    	  	            autoEl: { 
		    	  	                    tag: 'iframe', 
		    	  	                    width: '100%', 
		    	  	                    height: '100%', 
		    	  	                    focusOnLoad: true, 
		    	  	                    frameborder: 0, 
		    	  	                    src: G_PATH + '' + record.data.url 
		    	  	            } 
		    	  			}],
		    				closable : true
		    			});
    				}
    			}
    			
    			tab.setActiveTab(count);
    		
			
    	} else {
    		tab.setActiveTab(tab.getComponent(record.data.id));
    	}
    }
});