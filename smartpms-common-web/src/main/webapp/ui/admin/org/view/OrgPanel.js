Ext.define('Ui.admin.org.view.OrgPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.orgpanel',
	layout: 'responsivecolumn',
	border : false,
    defaults: {
        xtype: 'container'
    },
	items : [
		{
		    xtype : 'panel',
		    border : false,
		    title : '조직 관리',
		    style : {
			    'background-color' : '#fff',
			    'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
			},
		    items : [
				{
					xtype: 'orgtree'
				}
		    ],
		    tools : [
				{
	     		    xtype: 'tool',                                    
	     		    cls: 'x-fa fa-plus dashboard-tools',
	     		    tooltip: '조직 추가',
	     		    width: 20,
	     		    height: 20,
	     		    handler : function() {
	     		    }
	     		},{
	     		    xtype: 'tool',                                    
	     		    cls: 'x-fa fa-trash dashboard-tools',
	     		    tooltip: '조직 삭제',
	     		    width: 20,
	     		    height: 20,
	     		    handler : function() {
	     		    }
	     		},{
	     		    xtype: 'tool',                                    
	     		    cls: 'x-fa fa-refresh dashboard-tools',
	     		    tooltip: '새로고침',
	     		    width: 20,
	     		    height: 20,
	     		    handler : function() {
	     		    	
	     		    }
	     		}
	     	],
		    responsiveCls: 'big-50 small-100'
		},
		{
		    xtype: 'tabpanel',
		    border: false,
		    style : {
			    'background-color' : '#fff',
			    'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
			},
		    items : [
		       {
		    	   xtype : 'panel',
		    	   title : '소속된 사용자',
		    	   border: false,
		    	   width : '100%',
		    	   items : [
		    	       {
		    	       		xtype : 'orgusergrid'
		    	       } 
		    	   ]
		       },{
		    	   xtype : 'panel',
		    	   title : '허용된 역할',
		    	   border: false,
		    	   items : [
		    	      {
		    	       		xtype : 'orgrolegrid'
		    	      }
		    	   ]
		       }
		    ],
		    responsiveCls: 'big-50 small-100'
		}
	]
});