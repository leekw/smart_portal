Ext.define('Ui.admin.menu.view.MenuPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.menupanel',
	layout: 'responsivecolumn',
	border : false,
    defaults: {
        xtype: 'container'
    },
	items : [
		{
		    xtype : 'panel',
		    border : false,
		    title : '메뉴 관리',
		    style : {
			    'background-color' : '#fff',
			    'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
			},
		    items : [
				{
					xtype: 'menutree'
				}
		    ],
		    tools : [
	     		{
	     		    xtype: 'tool',                                    
	     		    cls: 'x-fa fa-key dashboard-tools',
	     		    tooltip: '메뉴/화면 잠금해제',
	     		    width: 20,
	     		    height: 20,
	     		    handler : function() {
	     		    	TreeAction.modifyLock();
	     		    }
	     		},{
	     		    xtype: 'tool',                                    
	     		    cls: 'x-fa fa-plus dashboard-tools',
	     		    tooltip: '메뉴/화면 추가',
	     		    width: 20,
	     		    height: 20,
	     		    handler : function() {
	     		    	TreeAction.addMenu();
	     		    }
	     		},{
	     		    xtype: 'tool',                                    
	     		    cls: 'x-fa fa-trash dashboard-tools',
	     		    tooltip: '메뉴/화면 삭제',
	     		    width: 20,
	     		    height: 20,
	     		    handler : function() {
	     		    	TreeAction.removeMenu();
	     		    }
	     		},{
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
		    	   title : '메뉴/화면 상세',
		    	   border: false,
		    	   width : '100%',
		    	   items : [
		    	        {
		    	        	xtype : 'form',
		    				id : 'menu-form',
		    				border: false,
		    				items : [
								{
									xtype:'htmleditor',
								    id:'resourceContent',
								    name: 'resourceContent',
								    border: false,
								    readOnly : true,
								    width : '100%',
								    minHeight: 600,
								    maxHeight: 600,
								    listeners : {
								    	'initialize' : function(editor) {
								    		editor.getEditorBody().onpaste = function(event) {
								    			var items = (event.clipboardData || event.originalEvent.clipboardData).items;
								    			for (index in items) {
								    				var item = items[index];
								    				if (item.kind == 'file') {
								    					var blob = item.getAsFile();
								    					var reader = new FileReader();
								    					if (blob) {
								    						reader.readAsDataURL(blob);
								    					}
								    					reader.addEventListener("load", function() {
								    						var obj = Ext.getCmp('resourceContent');
						            						var image = '<img src="' + reader.result + '">';
						            				    	obj.setValue(obj.getValue() + image);
								    					}, false);
								    					
								    				}
								    			}
								    		}
								    	}
								    }
								}
		    				],
		    				listeners : {
		    					
		    				}
		    	        }
		    	   ]
		       },{
		    	   xtype : 'panel',
		    	   title : '메뉴 파일',
		    	   border: false,
		    	   items : [
		    	      {
		    	    	  xtype : 'filegrid'
		    	      }
		    	   ]
		       },{
		    	   xtype : 'panel',
		    	   title : '메뉴/화면 서비스',
		    	   border: false,
		    	   items : [
		    	      {
		    	    	  xtype : 'menuservicegrid'
		    	      }
		    	   ]
		       }
		    ],
		    responsiveCls: 'big-50 small-100'
		}
	]
});