var Menu = {
	html : function() {
		var result = '<nav class="horizontal-nav">';
			result += '<ul>';
			result += '<li><a id="portal" name="dashboard" href="#" onclick="Menu.addTab(this);return false;">Dashboard</a></li>';
			result += '<li><a id="main" name="Cutover" href="#" onclick="Menu.addTab(this);return false;">Cutover</a></li>';
			result += '<li><a href="#" onclick="Menu.sub(this);return false;">Etc2</a></li>';
			result += '<li><a href="#" onclick="Menu.sub(this);return false;">Etc3</a></li>';
			result += '<li><a href="#" onclick="Menu.sub(this);return false;">Etc4</a></li>';
			result += '<li><a id="M9000" href="#" onclick="Menu.sub(this);return false;">Admin</a></li>';
			result += '</ul>';
			result += '</nav>';
		return result;
	},
	addTab : function(obj) {
		var tab = Ext.getCmp('center-tab');
    	var count = tab.items.getCount();    	
    	if (count > 10) {
    		tab.setActiveTab(0);
    		tab.remove(tab.getActiveTab());
    	}
    	if (tab.getComponent(obj.id) == null) {
			tab.add({
				title : obj.name,
				id : obj.id,
				items : [{ 
	  	            xtype: 'component', 
	  	            title: 'content',
	  	            autoEl: { 
	  	                    tag: 'iframe', 
	  	                    width: '100%', 
	  	                    height: '100%', 
	  	                    focusOnLoad: true, 
	  	                    frameborder: 0, 
	  	                    src: G_PATH + '/' + obj.id + "/app/view.do" 
	  	            } 
	  			}],
				closable : true
			});
	    	tab.setActiveTab(count);
    	}
	},
	sub : function (obj) {
		var type = obj.id;
		var menu = Ext.getCmp('sub-menu');
		var node = menu.getRootNode();
		node.findChildBy(function (child) {
            var id = child.data.id;
            if (id == type) {
            	menu.getSelectionModel().select(child, true);
            	child.expand();
            }
        });
		
	}
};
Ext.define('Ext.layout.view.Header', {
	extend : 'Ext.container.Container',
	alias : 'widget.intheader',
	id : 'app-header',
	height : 25,
	layout : {
		type : 'hbox',
		align : 'middle'
	},
	initComponent : function() {
		this.items = [ {
			xtype : 'component',
			id : 'app-header-title',
			html : 'kt BSS Project',
			flex : 3
		} ];
		this.callParent();
	}
});