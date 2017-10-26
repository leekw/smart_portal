var stores = new Array();
var sourceModule = null; 
var targetModule = null;
var linkWay = null;
var relationType = null;
var relationName = null;
var g_team = null;
var g_module = null;
var g_programType = null;
var _programType = null;
var _treePanel = null;
var _pt = null;
var _tot = null;
var _run = null;
Ext.define('Ext.qualitytest.view.QualityBasePanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.qualitybasepanel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
    requires: [
		'Ext.chart.CartesianChart',
		'Ext.chart.axis.Category',
		'Ext.chart.axis.Numeric',
		'Ext.chart.series.Pie',
		'Ext.chart.series.Line',
	    'Ext.chart.interactions.PanZoom'
	],
	items : [
	    {
	    	xtype : 'tabpanel',
	    	bodyStyle: {
		        background: 'none'
		    },
		    border : false,
	    	tbar : [
    	        {
    	          	xtype : 'label',
    	          	width : '100%',
    	          	hieght : 10,
    	          	html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;영역별 연동 현황 -' + DateUtil._formatDateNormal(new Date()) + '기준 </span></div>'
    	          		  + '<div style="float:right;"></div>'
    	          		  + '</div>'
    	         }
    	    ],
	    	items : [
				{
					title : 'Billing-AR',
					bodyStyle: {
				        background: 'none'
				    },
				    border : false,
					items : [
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : [
						        ViewAction.pie('Billing','AR'),
						        ViewAction.pieByModule('Billing','AR'),
						        ViewAction.histLine('Billing','AR'),
						        ViewAction.changeBar('Billing','AR')
						    ],
						    listeners : {
						    	afterrender : function(panel, eOpts) {

						    	}
						    }
						},
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : ViewAction.treeView('Billing','AR'),
						    listeners : {
						    	afterrender : function(panel, eOpts) {
//						    		var params = {team :'Billing', module :'AR'};
//									DataAction.load(params, panel);
						    	}
						    }
						} 
					],
					listeners : {
						activate : function( tabpanel, eOpts ) {
							DataAction.chartLoad(tabpanel, 'Billing', 'AR');
							DataAction.treeLoad(tabpanel, 'Billing', 'AR');
							
						}
					}
				},
				{
					title : 'Billing-청구',
					bodyStyle: {
				        background: 'none'
				    },

				    border : false,
					items : [
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : [
						        ViewAction.pie('Billing','청구'),
						        ViewAction.pieByModule('Billing','청구'),
						        ViewAction.histLine('Billing','청구'),
						        ViewAction.changeBar('Billing','청구')
						    ],
						    listeners : {
						    	afterrender : function(panel, eOpts) {

						    	}
						    }
						},
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : ViewAction.treeView('Billing','청구'),
						    listeners : {
						    	afterrender : function(panel, eOpts) {
//						    		var params = {team :'Billing', module :'청구'};
//									DataAction.load(params, panel);
						    	}
						    }
						} 
					],
					listeners : {
						activate : function( tabpanel, eOpts ) {
							DataAction.chartLoad(tabpanel, 'Billing', '청구');
							DataAction.treeLoad(tabpanel, 'Billing', '청구');
						}
					}
				},
				{
					title : 'Billing-요금온라인',
					bodyStyle: {
				        background: 'none'
				    },
				    border : false,
					items : [
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : [
						        ViewAction.pie('Billing','BCOL'),
						        ViewAction.pieByModule('Billing','BCOL'),
						        ViewAction.histLine('Billing','BCOL'),
						        ViewAction.changeBar('Billing','BCOL')
						    ],
						    listeners : {
						    	afterrender : function(panel, eOpts) {
						
						    	}
						    }
						},
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : ViewAction.treeView('Billing','BCOL'),
						    listeners : {
						    	afterrender : function(panel, eOpts) {
//						    		var params = {team :'Billing', module :'BCOL'};
//									DataAction.load(params, panel);
						    	}
						    }
						} 
					],
					listeners : {
						activate : function( tabpanel, eOpts ) {
							DataAction.chartLoad(tabpanel, 'Billing', 'BCOL');
							DataAction.treeLoad(tabpanel, 'Billing', 'BCOL');
						}
					}
				},
				{
					xtype : 'panel'
				},
				{
					title : 'Order-신규',
					bodyStyle: {
				        background: 'none'
				    },
				    border : false,
					items : [
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : [
						        ViewAction.pie('Order','신규'),
						        ViewAction.pieByModule('Order','신규'),
						        ViewAction.histLine('Order','신규'),
						        ViewAction.changeBar('Order','신규')
						    ],
						    listeners : {
						    	afterrender : function(panel, eOpts) {

						    	}
						    }
						},
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : ViewAction.treeView('Order','신규'),
						    listeners : {
						    	afterrender : function(panel, eOpts) {
//						    		var params = {team :'Order', module :'신규'};
//									DataAction.load(params, panel);
						    	}
						    }
						} 
					],
					listeners : {
						activate : function( tabpanel, eOpts ) {
							DataAction.chartLoad(tabpanel, 'Order', '신규');
							DataAction.treeLoad(tabpanel, 'Order', '신규');
						}
					}
				},
				{
					title : 'Order-기기',
					bodyStyle: {
				        background: 'none'
				    },
				    border : false,
					items : [
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : [
						        ViewAction.pie('Order','기기'),
						        ViewAction.pieByModule('Order','기기'),
						        ViewAction.histLine('Order','기기'),
						        ViewAction.changeBar('Order','기기')
						    ],
						    listeners : {
						    	afterrender : function(panel, eOpts) {

						    	}
						    }
						},
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : ViewAction.treeView('Order','기기'),
						    listeners : {
						    	afterrender : function(panel, eOpts) {
//						    		var params = {team :'Order', module :'기기'};
//									DataAction.load(params, panel);
						    	}
						    }
						} 
					],
					listeners : {
						activate : function( tabpanel, eOpts ) {
							DataAction.chartLoad(tabpanel, 'Order', '기기');
							DataAction.treeLoad(tabpanel, 'Order', '기기');
						}
					}
				},
				{
					title : 'Order-무선상품',
					bodyStyle: {
				        background: 'none'
				    },
				    border : false,
					items : [
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : [
						        ViewAction.pie('Order','무선상품'),
						        ViewAction.pieByModule('Order','무선상품'),
						        ViewAction.histLine('Order','무선상품'),
						        ViewAction.changeBar('Order','무선상품')
						    ],
						    listeners : {
						    	afterrender : function(panel, eOpts) {

						    	}
						    }
						},
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : ViewAction.treeView('Order','무선상품'),
						    listeners : {
						    	afterrender : function(panel, eOpts) {
//						    		var params = {team :'Order', module :'무선상품'};
//									DataAction.load(params, panel);
						    	}
						    }
						} 
					],
					listeners : {
						activate : function( tabpanel, eOpts ) {
							DataAction.chartLoad(tabpanel, 'Order', '무선상품');
							DataAction.treeLoad(tabpanel, 'Order', '무선상품');
						}
					}
				},
				{
					xtype : 'panel'
				},
				{
					title : 'Order-인터넷',
					bodyStyle: {
				        background: 'none'
				    },
				    border : false,
					items : [
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : [
						        ViewAction.pie('Order','인터넷'),
						        ViewAction.pieByModule('Order','인터넷'),
						        ViewAction.histLine('Order','인터넷'),
						        ViewAction.changeBar('Order','인터넷')
						    ],
						    listeners : {
						    	afterrender : function(panel, eOpts) {

						    	}
						    }
						},
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : ViewAction.treeView('Order','인터넷'),
						    listeners : {
						    	afterrender : function(panel, eOpts) {
//						    		var params = {team :'Order', module :'인터넷'};
//									DataAction.load(params, panel);
						    	}
						    }
						} 
					],
					listeners : {
						activate : function( tabpanel, eOpts ) {
							DataAction.chartLoad(tabpanel, 'Order', '인터넷');
							DataAction.treeLoad(tabpanel, 'Order', '인터넷');
						}
					}
				},
				{
					title : 'Order-IPTV',
					bodyStyle: {
				        background: 'none'
				    },
				    border : false,
					items : [
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : [
						        ViewAction.pie('Order','IPTV'),
						        ViewAction.pieByModule('Order','IPTV'),
						        ViewAction.histLine('Order','IPTV'),
						        ViewAction.changeBar('Order','IPTV')
						    ],
						    listeners : {
						    	afterrender : function(panel, eOpts) {

						    	}
						    }
						},
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : ViewAction.treeView('Order','IPTV'),
						    listeners : {
						    	afterrender : function(panel, eOpts) {
//						    		var params = {team :'Order', module :'IPTV'};
//									DataAction.load(params, panel);
						    	}
						    }
						} 
					],
					listeners : {
						activate : function( tabpanel, eOpts ) {
							DataAction.chartLoad(tabpanel, 'Order', 'IPTV');
							DataAction.treeLoad(tabpanel, 'Order', 'IPTV');
						}
					}
				},
				{
					title : 'Order-SOIP',
					bodyStyle: {
				        background: 'none'
				    },
				    border : false,
					items : [
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : [
						        ViewAction.pie('Order','SOIP'),
						        ViewAction.pieByModule('Order','SOIP'),
						        ViewAction.histLine('Order','SOIP'),
						        ViewAction.changeBar('Order','SOIP')
						    ],
						    listeners : {
						    	afterrender : function(panel, eOpts) {

						    	}
						    }
						},
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : ViewAction.treeView('Order','SOIP'),
						    listeners : {
						    	afterrender : function(panel, eOpts) {
//						    		var params = {team :'Order', module :'SOIP'};
//									DataAction.load(params, panel);
						    	}
						    }
						} 
					],
					listeners : {
						activate : function( tabpanel, eOpts ) {
							DataAction.chartLoad(tabpanel, 'Order', 'SOIP');
							DataAction.treeLoad(tabpanel, 'Order', 'SOIP');
						}
					}
				},
				{
					title : 'Order-WiBro',
					bodyStyle: {
				        background: 'none'
				    },
				    border : false,
					items : [
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : [
						        ViewAction.pie('Order','WiBro'),
						        ViewAction.pieByModule('Order','WiBro'),
						        ViewAction.histLine('Order','WiBro'),
						        ViewAction.changeBar('Order','WiBro')
						    ],
						    listeners : {
						    	afterrender : function(panel, eOpts) {

						    	}
						    }
						},
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : ViewAction.treeView('Order','WiBro'),
						    listeners : {
						    	afterrender : function(panel, eOpts) {
//						    		var params = {team :'Order', module :'WiBro'};
//									DataAction.load(params, panel);
						    	}
						    }
						} 
					],
					listeners : {
						activate : function( tabpanel, eOpts ) {
							DataAction.chartLoad(tabpanel, 'Order', 'WiBro');
							DataAction.treeLoad(tabpanel, 'Order', 'WiBro');
						}
					}
				},
				{
					title : 'Order-유선공통',
					bodyStyle: {
				        background: 'none'
				    },
				    border : false,
					items : [
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : [
						        ViewAction.pie('Order','유선공통'),
						        ViewAction.pieByModule('Order','유선공통'),
						        ViewAction.histLine('Order','유선공통'),
						        ViewAction.changeBar('Order','유선공통')
						    ],
						    listeners : {
						    	afterrender : function(panel, eOpts) {

						    	}
						    }
						},
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : ViewAction.treeView('Order','유선공통'),
						    listeners : {
						    	afterrender : function(panel, eOpts) {
//						    		var params = {team :'Order', module :'유선공통'};
//									DataAction.load(params, panel);
						    	}
						    }
						} 
					],
					listeners : {
						activate : function( tabpanel, eOpts ) {
							DataAction.chartLoad(tabpanel, 'Order', '유선공통');
							DataAction.treeLoad(tabpanel, 'Order', '유선공통');
						}
					}
				},
				{
					title : 'Order-PSTN/WiFi UI 웹화',
					bodyStyle: {
				        background: 'none'
				    },
				    border : false,
					items : [
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : [
						        ViewAction.pie('Order','PSTN/WiFi UI 웹화'),
						        ViewAction.pieByModule('Order','PSTN/WiFi UI 웹화'),
						        ViewAction.histLine('Order','PSTN/WiFi UI 웹화'),
						        ViewAction.changeBar('Order','PSTN/WiFi UI 웹화')
						    ],
						    listeners : {
						    	afterrender : function(panel, eOpts) {

						    	}
						    }
						},
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : ViewAction.treeView('Order','PSTN/WiFi UI 웹화'),
						    listeners : {
						    	afterrender : function(panel, eOpts) {
//						    		var params = {team :'Order', module :'PSTN/WiFi UI 웹화'};
//									DataAction.load(params, panel);
						    	}
						    }
						} 
					],
					listeners : {
						activate : function( tabpanel, eOpts ) {
							DataAction.chartLoad(tabpanel, 'Order', 'PSTN/WiFi UI 웹화');
							DataAction.treeLoad(tabpanel, 'Order', 'PSTN/WiFi UI 웹화');
						}
					}
				},
				{
					title : 'Order-계약',
					bodyStyle: {
				        background: 'none'
				    },
				    border : false,
					items : [
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : [
						        ViewAction.pie('Order','계약'),
						        ViewAction.pieByModule('Order','계약'),
						        ViewAction.histLine('Order','계약'),
						        ViewAction.changeBar('Order','계약')
						    ],
						    listeners : {
						    	afterrender : function(panel, eOpts) {

						    	}
						    }
						},
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : ViewAction.treeView('Order','계약'),
						    listeners : {
						    	afterrender : function(panel, eOpts) {
//						    		var params = {team :'Order', module :'계약'};
//									DataAction.load(params, panel);
						    	}
						    }
						} 
					],
					listeners : {
						activate : function( tabpanel, eOpts ) {
							DataAction.chartLoad(tabpanel, 'Order', '계약');
							DataAction.treeLoad(tabpanel, 'Order', '계약');
						}
					}
				},
				{
					title : 'Order-상품',
					bodyStyle: {
				        background: 'none'
				    },
				    border : false,
					items : [
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : [
						        ViewAction.pie('Order','상품'),
						        ViewAction.pieByModule('Order','상품'),
						        ViewAction.histLine('Order','상품'),
						        ViewAction.changeBar('Order','상품')
						    ],
						    listeners : {
						    	afterrender : function(panel, eOpts) {

						    	}
						    }
						},
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : ViewAction.treeView('Order','상품'),
						    listeners : {
						    	afterrender : function(panel, eOpts) {
//						    		var params = {team :'Order', module :'상품'};
//									DataAction.load(params, panel);
						    	}
						    }
						} 
					],
					listeners : {
						activate : function( tabpanel, eOpts ) {
							DataAction.chartLoad(tabpanel, 'Order', '상품');
							DataAction.treeLoad(tabpanel, 'Order', '상품');
						}
					}
				},
				{
					title : 'Order-결합',
					bodyStyle: {
				        background: 'none'
				    },
				    border : false,
					items : [
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : [
						        ViewAction.pie('Order','결합'),
						        ViewAction.pieByModule('Order','결합'),
						        ViewAction.histLine('Order','결합'),
						        ViewAction.changeBar('Order','결합')
						    ],
						    listeners : {
						    	afterrender : function(panel, eOpts) {

						    	}
						    }
						},
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : ViewAction.treeView('Order','결합'),
						    listeners : {
						    	afterrender : function(panel, eOpts) {
//						    		var params = {team :'Order', module :'결합'};
//									DataAction.load(params, panel);
						    	}
						    }
						} 
					],
					listeners : {
						activate : function( tabpanel, eOpts ) {
							DataAction.chartLoad(tabpanel, 'Order', '결합');
							DataAction.treeLoad(tabpanel, 'Order', '결합');
						}
					}
				},
				{
					xtype : 'panel'
				},
				{
					title : 'B-RDS',
					bodyStyle: {
				        background: 'none'
				    },
				    border : false,
					items : [
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : [
						        ViewAction.pie('B-RDS',null),
						        ViewAction.pieByModule('B-RDS', null),
						        ViewAction.histLine('B-RDS',null),
						        ViewAction.changeBar('B-RDS',null)
						    ],
						    listeners : {
						    	afterrender : function(panel, eOpts) {

						    	}
						    }
						},
						{
							layout: 'responsivecolumn',
						    defaults: {
						        xtype: 'container'
						    },
						    bodyStyle: {
						        background: 'none'
						    },
						    border : false,
						    items : ViewAction.treeView('B-RDS',null),
						    listeners : {
						    	afterrender : function(panel, eOpts) {
//						    		var params = {team :'B-RDS', module :null};
//									DataAction.load(params, panel);
						    	}
						    }
						} 
					],
					listeners : {
						activate : function( tabpanel, eOpts ) {
							DataAction.chartLoad(tabpanel, 'B-RDS', null);
							DataAction.treeLoad(tabpanel, 'B-RDS', null);
						}
					}
				}
	    	],
    	    responsiveCls: 'big-100 small-100'
	    }
	    
	]
});

var DataAction = {
	chartLoad : function(tabpanel, _team, _module) {
		for (var i=0; i < 3;i++) {
			var chart = tabpanel.items.items[0].items.items[i].items.items[1].items.items[0];
			var store = chart.getStore();
			var proxy = store.getProxy();
			proxy.extraParams.team = _team;
			proxy.extraParams.module = _module;
			store.load();
			chart.redraw();
		}
		var barChart = tabpanel.items.items[0].items.items[3].items.items[1].items.items[0];
		var barStore = barChart.getStore();
   		var barProxy = barStore.getProxy();
   		barProxy.extraParams.team = _team;
   		barProxy.extraParams.module = _module;
   		barStore.load({
   			scope : this,
   			callback : function(record, operation, success) {
   				var series = [];
   	    		var titles = [];
   	    		var yFields = [];
   	    		var yFields2 = [];
   	    		var rec = record[0];
   	    		if (rec != null) {
   		    		for (var i=1;i < 15;i++) {
   		    			if (rec.get('name' + i) == null || rec.get('name' + i) == '') continue;
   		    			titles.push(rec.get('name' + i));
   		    				yFields.push('data' + i);
   		    				yFields2.push('data9' + i);
   		    		}
   		    		var serie = {
   							type: 'bar3d',
   							showInLegend: true,
   							title: titles,
   							xField: 'statDate',
   							yField: yFields.length == 0 ? ['data1'] : yFields,		   				    							
   							tooltip : {
   								trackMouse: true,
   								renderer: function(tooltip, record, item) {
   									var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field);
   									tooltip.setHtml(record.get('statDate') + '/' + item.series.getTitle()[fieldIndex] + ':' + Ext.util.Format.number(record.get(item.field),'0,000'));
   							    }
   							}
   					};
   					series.push(serie);
   					serie2 = {
   							type: 'bar3d',
   							showInLegend: true,
   							title: titles,
   							xField: 'statDate',
   							yField: yFields2.length == 0 ? ['data91'] : yFields2,		   				    							
   							tooltip : {
   								trackMouse: true,
   								renderer: function(tooltip, record, item) {
   									var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field);
   									tooltip.setHtml(record.get('statDate') + '/' + item.series.getTitle()[fieldIndex] + ':' + Ext.util.Format.number(record.get(item.field),'0,000'));
   							    }
   							}
   					};
   					series.push(serie2);
   					barChart.setSeries(series);
   					barChart.redraw();
   	    		}
   			}
   		});
	},
	treeLoad : function(tabpanel, _team, _module) {
		var params = {team :_team, module :_module};
		var panel = tabpanel.items.items[1];
		var ui = 0;
    	var esb = 0;
    	var sj = 0;
    	var boc = 0;
    	var bo = 0;
    	var uiRun = 0;
    	var esbRun = 0;
    	var sjRun = 0;
    	var bocRun = 0;
    	var boRun = 0;
		var counts = new Array();
		var runs = new Array();
		var types = new Array();
		types[0] = 'UI';
		types[1] = 'ESB';
		types[2] = 'SJ';
		types[3] = 'BOC';
		types[4] = 'BO';
		Ext.Ajax.request({
    	    url: G_PATH + '/quality/test/summary/get.json',
    	    method: 'POST',
    	    jsonData: Ext.encode(params),
    	    success: function(response){
    	    	var data = JSON.parse(response.responseText).data;
    	    	for (var i=0;i < data.length;i++) {
    	    		if (data[i].programType == 'UI') {
    	    			counts[0] = data[i].programCount;
    	    			runs[0] = data[i].programRunCount;
    	    		}
    	    		if (data[i].programType == 'ESB') {
    	    			counts[1] = data[i].programCount;
    	    			runs[1] = data[i].programRunCount;
    	    		}
    	    		if (data[i].programType == 'SO/JO') {
    	    			if (counts[2] == null) {
    	    				counts[2] = 0;
    	    			}
    	    			if (runs[2] == null) {
    	    				runs[2] = 0;
    	    			}
    	    			counts[2] += data[i].programCount;
    	    			runs[2] += data[i].programRunCount;
    	    		}
    	    		if (data[i].programType == 'BOC') {
    	    			counts[3] = data[i].programCount;
    	    			runs[3] = data[i].programRunCount;
    	    		}
    	    		if (data[i].programType == 'BO') {
    	    			counts[4] = data[i].programCount;
    	    			runs[4] = data[i].programRunCount;
    	    		}
    	    	}
    	    	for (var i=0;i < types.length;i++) {
    				var tree = tabpanel.items.items[1].items.items[i].items.items[0];
    				_treePanel = tabpanel.items.items[1].items.items[i];
    				var treeStore = tree.getStore();
    				var treeProxy = treeStore.getProxy();
    				treeProxy.extraParams.team = _team;
    				treeProxy.extraParams.module = _module;
    				treeProxy.extraParams.programType = types[i];
    				_pt = types[i] == 'SJ' ? 'SO/JO' : types[i];
					_tot = counts[i] == null ? 0 : counts[i];
					_run = runs[i] == null ? 0 : runs[i];
    				treeStore.load({
    					params: {
    						comp : _treePanel,
    						pt : _pt,
    						tot : _tot,
    						run : _run
    					},
    					callback : function(record, operation, eOpts) {
    						var comp = operation.getParams().comp;
    						var pt = operation.getParams().pt;
    						var tot = operation.getParams().tot;
    						var run = operation.getParams().run;
    						
    						DataAction.setDocked(comp, pt, tot, run, record);
    					}
    				});
    			}
    	    	
    	    	
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', '조회 처리 중 오류가 발생되었습니다.');
    	    }
    	});
		
		
	},
	setDocked : function(comp, name, result, runResult, record) {
		var color = null;
		var total = 0;
		var runTotal = 0;
		for (var i=0;i < record.length; i++) {
			var rec = record[i];
			if (rec != null) {
				if (rec.get('programType') == 'DO') continue;
				total += rec.get('relCount');
				runTotal += rec.get('relRunCount');
			}
		}
		var temp = runTotal*100 / total;
		temp = temp.toFixed(2);
		if (total == 0) {
			color = '#c0c0c0';
		} else {
			if (temp > 95) {
				color = '#4caf50';
			} else if (temp <= 95 && temp >= 50) {
				color = '#ffc107';
	    	} else {
	    		color = '#e91e63';
	    	}
		}
		var ratio = result == 0 ? 0 : (runResult*100 / result).toFixed(2);
		
		var items = comp.getDockedItems('toolbar[dock="top"]');
		if (items != null) {
			for (var i=0;i < items.length;i++) {
				comp.removeDocked( items[i], true );
			}
		}
		
		comp.addDocked({
    	    xtype: 'toolbar',
    	    dock: 'top',
    	    items: [
				{
					xtype : 'label',
					width : '100%',
					html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-circle" style="color:' + color + '"></i>&nbsp;' + name + '</span></div>'
						+ '<div style="float:right;">'  + (name == 'UI' || name == 'ESB' ? '' : runResult + '/') + result +  (name == 'UI' || name == 'ESB' ? '' : '(' + ratio + '%)') +'</div>' 
						+ '</div>'
				 }
    	    ]
    	});
	},
	load : function(params, panel) {
		
	},
	openProgramOrgGrid : function() {
		var win = Ext.getCmp('program-org-info');
		if (win == null) {
			win = Ext.create('Ext.window.Window', {
				id : 'program-org-info',
	    	    title: '프로그램 정보',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
	    	    layout: 'fit',
	    	    modal: true,
	    	    animateTarget:this,
	    	    padding : 10,
	    	    width : '85%',
	    	    height : '90%',
	    	    border:false,
	    	    renderTo : parent.Ext.get('body'),
	    	    items : [
	    	        {
	    	        	xtype : 'programorggrid'
	    	        } 
	    	    ],
	    	    listeners : {
        	    	beforeshow : function(win) {
        	    		var temp = g_team + (g_module != null && g_module != '' ? ' > ' +  g_module : '');
        	    		win.setTitle('프로그램 정보 -' + '(' + temp + ')');
        	    		var grid = Ext.getCmp('program-org-grid');
        	    		var store = grid.getStore();
        	    		store.removeAll();
        	    		var proxy = store.getProxy();
        	    		proxy.extraParams.team = g_team;
        	    		proxy.extraParams.module = g_module;
        	    		proxy.extraParams.function = null;
        	    		proxy.extraParams.searchType = null;
        	    		proxy.extraParams.programType = g_programType;
        	    		proxy.extraParams.developer = null;
        	    		proxy.extraParams.page = 1;
        	    		proxy.extraParams.searchFilter = null;
        	           	proxy.extraParams.searchOption = null;
        	    		store.load();
        	    	}
	    	    }
			});
		}
		win.show();
	},
	openProgramGrid : function() {
		var win = Ext.getCmp('program-info');
		if (win == null) {
			win = Ext.create('Ext.window.Window', {
				id : 'program-info',
	    	    title: '인터페이스 프로그램 정보',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
	    	    layout: 'fit',
	    	    modal: true,
	    	    animateTarget:this,
	    	    padding : 10,
	    	    width : '85%',
	    	    height : '90%',
	    	    border:false,
	    	    items : [
	    	        {
	    	        	xtype : 'programgrid'
	    	        } 
	    	    ],
	    	    listeners : {
        	    	beforeshow : function(win) {
        	    		var temp = '';
        	    		if (linkWay == 'source') {
        	    			temp = '▶';
        	    		} else {
        	    			temp = '◀';
        	    		}
        	    		win.setTitle('인터페이스 프로그램 정보 -' + (sourceModule == '-' ? '구분없음' : sourceModule) + temp + (targetModule == '-' ? '구분없음' : targetModule) );
        	    		var grid = Ext.getCmp('program-grid');
        	    		var store = grid.getStore();
        	    		store.removeAll();
        	    		var proxy = store.getProxy();
        	    		proxy.extraParams.sourceModule = sourceModule;
        	    		proxy.extraParams.targetModule = targetModule;
        	    		proxy.extraParams.linkWay = linkWay;
        	    		proxy.extraParams.relationType = relationType;
        	    		proxy.extraParams.relationName = relationName;
        	    		proxy.extraParams.programType = _programType;
        	    		store.load();
        	    	}
	    	    }
			});
		}
		win.show();
	}
}
var GridAction = {
	_loadInit : function() {
		for (var i=0; i < stores.length; i++) {
			stores[i].load();
		}
	}
}