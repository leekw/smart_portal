Ext.define('Ext.portal.view.Portal', {
	extend : 'Ext.dashboard.Dashboard',
	alias : 'widget.portaldashboard',
	layout : 'fit',
   	initComponent: function() {

           var me = this;
           
           Ext.apply(me, {
           	items: [
           	       {
   			        xtype: 'dashboard',
   			        reference: 'dashboard',
   			        region: 'center',
   			        stateful: false,
   			        columnWidths: [
   			            0.22,
   			            0.20,
   			            0.55
   			        ],
   			        parts: {
   			            portlet1: {
   			                viewTemplate: {
   			                    title: '접속자 현황',
   			                    titleAlign: 'center',
   			                    id: 'conn-pt',
   			                    items :[{
	   			         			xtype : 'connusergrid'
	   			         		}
	   			         		]
	   			         		
   			                }
   			            },
   			
   			            portlet2: {
   			                viewTemplate: {
   			                    title: '업무처리 현황',
   			                    titleAlign: 'center',
   			                     id: 'biz-pt',
	   			                 items :[{
	   			                    	xtype:'bizprocessgrid'
	   			                    }    
			                    ]
   			                }
   			            },
   			
   			            portlet3: {
   			                viewTemplate: {
   			                    title: 'ISC 접수 현황',
   			                    titleAlign: 'center',
   			                     id: 'isc-pt',
	   			                 items :[{
	   			                    	xtype:'questionchart'
	   			                    }    
			                    ]
   			                }
   			            }
   			        },
   			
   			        defaultContent: [{
   			            type: 'portlet1',
   			            columnIndex: 0,
   			            height: 780
   			        }, {
   			            type: 'portlet2',
   			            columnIndex: 1,
   			            height: 780
   			        }, {
   			            type: 'portlet3',
   			            columnIndex: 2,
   			            height: 780
   			        }
   			        ]
   			    },{
   			        xtype: 'dashboard',
   			        reference: 'dashboard',
   			        region: 'center',
   			        stateful: false,
   			       
   			        columnWidths: [
   			            0.48,
   			            0.49
   			        ],
   			        parts: {
   			            portlet4: {
			                viewTemplate: {
			                    title: '접속자 추이',
			                    titleAlign: 'center',
			                    items :[{
	   			         			xtype : 'connuserchart'
	   			         		}
	   			         		]
	   			         		
			                }
			            },
			            portlet5: {
   			                viewTemplate: {
   			                    title: '업무처리 추이',
   			                    titleAlign: 'center',
	   			                 items :[{
	   			                    	xtype:'bizprocesschart'
	   			                    }    
			                    ]
   			                }
   			            }
   			        },
   			
   			        defaultContent: [{
   			            type: 'portlet4',
   			            columnIndex: 0,
   			            height: 350
   			        }, {
   			            type: 'portlet5',
   			            columnIndex: 1,
   			            height: 350
   			        }
   			        ]
   			    },{
   			        xtype: 'dashboard',
   			        reference: 'dashboard',
   			        region: 'center',
   			        stateful: false,
   			       
   			        columnWidths: [
   			            0.97
   			        ],
   			        parts: {
   			            portlet6: {
			                viewTemplate: {
			                    title: 'Defect 추이 (JIRA)',
			                    titleAlign: 'center',
	   			                 items :[{
	   			                    	xtype:'openissuechart'
	   			                    }    
			                    ]
			                }
			            }
   			        },
   			
   			        defaultContent: [ {
   			            type: 'portlet6',
   			            columnIndex: 0,
   			            height: 350
   			        }
   			        ]
   			    }
              ]
           });
                   
           me.callParent(arguments);
   	   },
   	   listeners : {
   		   afterrender : function(panel, eOpts) {
   		   }
   	   }
});