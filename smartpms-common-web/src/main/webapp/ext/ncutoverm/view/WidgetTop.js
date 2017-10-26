Ext.define('Ext.ncutoverm.view.WidgetTop', {
    extend: 'Ext.panel.Panel',
    xtype: 'widget-top',

    cls: 'admin-widget-small sale-panel info-card-item shadow-panel',

    containerColor: '',

    height: 115,

    data: {
        amount: 0,
        type: '',
        icon: ''
    },

    tpl: '<span style="cursor:pointer;cursor:hand;" onclick="TopInfo._changeGrid(\'{type}\',\'{color}\')"><div style="width:20%;float:center;"><span class="x-fa fa-{icon}" style="color:{color}"></span></div><div style="float:center;"><h2>{amount}</h2><div><font size="3">{type}</font></div></span>',

    initComponent: function(){
        var me = this;

        Ext.apply(me, {
            cls: me.config.containerColor
        });

        me.callParent(arguments);
    }
});
var TopInfo = {
	_changeGrid : function(type, color) {
		var tabpanel = Ext.getCmp('cutover-tab-panel');
		tabpanel.setActiveTab(Ext.getCmp('tab-task-panel'));
		var panel = Ext.getCmp('cutover-grid-panel');
		panel.setTitle(type + " Task");
		var header = panel.header;
		header.setStyle('background-color', color);
		header.setStyle('border-color', color);
		if (type == '작업진행중') {
			header.getTools()[0].setHidden(false);
			header.getTools()[1].setHidden(false);
		} else if (type == '할당대기') {
			header.getTools()[0].setHidden(true);
			header.getTools()[1].setHidden(true);
		} else {
			header.getTools()[0].setHidden(true);
			header.getTools()[1].setHidden(true);
		}
		_PieGridReload = false;
		var grid = Ext.getCmp('cutover-dashboard-grid');
		var store = grid.getStore();
		var proxy = store.getProxy();
		proxy.extraParams.mode = type;
		proxy.extraParams.yCategory = null;
		store.load();
	}	
};