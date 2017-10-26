Ext.define('Ext.layout.view.Center', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.intcenter',
	bodyPadding : 5,
	autoScroll:true,
	items : [{
		title : 'Main',
		items : [{ 
            xtype: 'component', 
            title: 'content',
            autoEl: { 
                    tag: 'iframe', 
                    width: '100%', 
                    height: '100%', 
                    focusOnLoad: true, 
                    frameborder: 0, 
                    src: '' 
            } 
		}]
	}]
});