Ext.define('Ui.android.analysis.view.AnalysisPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.analysispanel',
	id : 'analysis-panel',
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
            title : '정적분석',
            style : {
                'background-color' : '#fff',
                'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
            },
            responsiveCls: 'big-80 small-100',


		},
        {
            xtype : 'analysisgrid',
            responsiveCls: 'big-80 small-100',
            style : {
                'background-color' : '#fff',
                'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
            },

        },  {
            xtype : 'panel',
            border : false,
            title : 'Scalpel 동적분석',
            style : {
                'background-color' : '#fff',
                'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
            },
            responsiveCls: 'big-80 small-100',
             items: [
                {
                    xtype :'form',
                    border : false,
                    padding : 10,
                    items :[{
                        xtype:'textarea',
                        grow : true,
                        anchor :'100%',
                        name: 'fileName',
                        maxHeight:'400',
                        fieldLabel:'동적분석',
                        style : {
                            'height' : '400'
                        },
                    }
                    ]

                }
            ],

        }
	]
});