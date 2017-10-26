Ext.define('Ext.programvf.view.WidgetTop', {
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
