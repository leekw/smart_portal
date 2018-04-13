Ext.define('Ui.analysis.sourceResult.view.AnalysisSourceResultPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.analysissourceresultpanel',
	id : 'source-result-panel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	border : false
	,
	items : [
        {

            xtype : 'panel',
            border : false,
            title : '진단결과 클래스',
            style : {
                'background-color' : '#fff',
                'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
            },
            items : [
                {
                    xtype: 'analysissourceresultgrid',
                    responsiveCls: 'big-100 small-100'

                }
            ],
            tools : [
                 {
                    xtype: 'tool',
                    cls: 'x-fa fa-refresh dashboard-tools',
                    tooltip: '새로고침',
                    width: 20,
                    height: 20,
                    handler : function() {
                        var grid = Ext.getCmp('sub-menu');
                        var store = grid.getStore();
                        var proxy = store.getProxy();
                        proxy.extraParams.parentResourceId = 'TOP';
                        store.load();
                    }
                }
            ]
 		}
        ]

});


