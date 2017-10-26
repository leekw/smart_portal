Ext.define('Ext.stabilization.view.WidgetTop', {
    extend: 'Ext.panel.Panel',
    xtype: 'widget-top',

    cls: 'admin-widget-small sale-panel info-card-item shadow-panel',

    containerColor: '',
    
    height: 90,

    data: {
        amount: 0,
        type: '',
        icon: ''
    },

    tpl: '<div style="height:90px !important;">'
    	+ '<div style="width:20%;height:64%;float:left;background-color:{background};top:50px;"><i class="x-fa fa-{icon} fa-2x" style="color:#fff"></i></div>'
    	+ '<div style="width:80%;height:64%;float:right;background-color:{background};color:#fff;"><span style="font-size:22px;font-weight:500;">{amount}</span><br><span style="font-size:15px;font-weight:500;">{type}</span></div>'
    	+ '</div>',

    initComponent: function(){
        var me = this;

        Ext.apply(me, {
            cls: me.config.containerColor
        });

        me.callParent(arguments);
    }
});