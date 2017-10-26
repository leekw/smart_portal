Ext.define('Ext.ncutover.view.WidgetTotal', {
    extend: 'Ext.Component',
    xtype: 'dashboardwidgettotal',

    border: false,
    cls: 'weather-panel shadow-panel',
    height: 60,
    items : [
		{
		    xtype:'component',
		    data: {
		        name: 'Finance',
		        value: '20%'
		    },
		    tpl: '<div class="left-aligned-div">{name}</div><div class="right-aligned-div">{value}</div>'
		},
		{
		    xtype: 'progressbar',
		    cls: 'bottom-indent service-finance',
		    height: 50,
		    minHeight: 4,
		    value: 0.2
		}
    ]         
    
});
