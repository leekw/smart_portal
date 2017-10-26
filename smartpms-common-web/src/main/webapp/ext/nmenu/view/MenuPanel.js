Ext.define('Ext.nmenu.view.MenuPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.menupanel',
	layout: 'responsivecolumn',
	border : false,
    defaults: {
        xtype: 'container'
    },
	items : [
		{
		    xtype: 'menutree',
		    tools : [
	     		{
	     		    xtype: 'tool',                                    
	     		    cls: 'x-fa fa-unlock dashboard-tools',
	     		    tooltip: '메뉴/화면 잠금해제',
	     		    width: 20,
	     		    height: 20,
	     		    handler : function() {
	     		    	var grid = Ext.getCmp('sub-menu');
	     		    	var selectMenu = grid.getSelectionModel().getSelection()[0];
	     		    	if (selectMenu == null) {
	     		    		Ext.Msg.alert('Info', '잠금해제할 대상을 선택하십시오.');
	     		    		return false;
	     		    	}
	     		    	var url = G_PATH + '/resource/check/modify.json';
		     		   	Ext.Ajax.request({
		     		       url: url,
		     		       method: 'POST',
		     		       jsonData: Ext.encode({resourceId:selectMenu.data.resourceId, force : true}),
		     		       success: function(response){
			     		        var result = JSON.parse(response.responseText);
			     		        unlockMenu = null;
			     		   		if (result.error != null) {
				     		   		Ext.MessageBox.confirm('Confirm', result.error.message + '.작업을 무시하고 수정하겠습니까?', function(btn) {
			     		   				if (btn == "yes") {
			     		   					unlockMenu = selectMenu.data.resourceId;
			     		   					Ext.Msg.alert('Info', '잠금해제 되었습니다.');
			     		   				}
			     		   			});
			     		   		} else {
			     		   			Ext.Msg.alert('Info', '잠금해제 되었습니다.');
			     		   			unlockMenu = selectMenu.data.resourceId;
			     		   		}
		     		       },
		     		       failure: function(){
		     		    	   Ext.Msg.alert('Error', 'Processing Error');
		     		       }
		     		   });
	     		    	
	     		    }
	     		},{
	     		    xtype: 'tool',                                    
	     		    cls: 'x-fa fa-plus dashboard-tools',
	     		    tooltip: '메뉴/화면 추가',
	     		    width: 20,
	     		    height: 20,
	     		    handler : function() {
	     		    	var content = Ext.getCmp('resourceContent');
	     		    	var grid = Ext.getCmp('sub-menu');
	     		    	var selectMenu = grid.getSelectionModel().getSelection()[0];
	     		    	var parentResourceId = null;
	     		    	var selectedIndex = 0;
	     		    	content.setValue('');
	     				if (selectMenu == null) {
	     					parentResourceId = 'TOP';
	     					grid.getStore().getRootNode().appendChild({
	     						text : '',
		     					parentId : 'TOP',
		     					parentResourceId : 'TOP'
	     					});
	     					grid.getView().refresh();
	     				} else {
	     					if (selectMenu.data.resourceTypeCode != "MENU") {
	     						Ext.Msg.alert('Info', '분류 타입의 메뉴에만 추가 가능합나디.');
				    			return false;
	     					}
	     					parentResourceId = selectMenu.data.resourceId;
	     					selectMenu.appendChild({
		     					text : '',
		     					parentId : parentResourceId,
		     					parentResourceId : parentResourceId
		     				});
		     				
		     				grid.getView().refresh();
		     				selectMenu.expand();
	     				}
	     				var content = Ext.getCmp('resourceContent');
	        			content.setReadOnly(false);
	     		    }
	     		},{
	     		    xtype: 'tool',                                    
	     		    cls: 'x-fa fa-trash dashboard-tools',
	     		    tooltip: '메뉴/화면 삭제',
	     		    width: 20,
	     		    height: 20,
	     		    handler : function() {
	     		    	var grid = Ext.getCmp('sub-menu');
	     		    	var selectMenu = grid.getSelectionModel().getSelection()[0];
	     		    	if (selectMenu == null) {
	     		    		Ext.Msg.alert('Info', '삭제할 대상을 선택하십시오.');
	     		    		return false;
	     		    	}
	     		    	Ext.MessageBox.confirm('Confirm', '선택한 메뉴를 삭제하겠습니까(복구 불가)?', function(btn){
	     		    		if (btn == 'yes') {
	     		    			if (selectMenu != null) {
		     		    			var formData = {resourceId : selectMenu.data.id };
			     		   			var url = G_PATH + '/resource/remove.json';
			     		   			Ext.Ajax.request({
			     		   	    	    url: url,
			     		   	    	    method: 'POST',
			     		   	    	    jsonData: Ext.encode(formData),
			     		   	    	    success: function(response){
			     		   	    	    	var result = JSON.parse(response.responseText);
			     		   	    	    	if (result.error != null) {
			     		   	    				Ext.Msg.alert('Exception', result.error.message);
			     		   	    			} else {
			     		   	    				Ext.Msg.alert('Complete', '삭제 되었습니다.');
			     		   	    				var store = grid.getStore();
				     		   	    			var proxy = store.getProxy();
				     		     		    	proxy.extraParams.parentResourceId = 'TOP';
			     		   	    				store.reload();
			     		   	    			}
			     		   	    	    },
			     		   	    	    failure: function(){
			     		   	    	    	Ext.Msg.alert('Error', '삭제 처리 중 오류가 발생되었습니다.');
			     		   	    	    }
			     		   	    	});
	     		    			}
	     		    		}
	     		    	});
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
	     		    	proxy.extraParams.parentResourceId = 'LIMIT';
	     		    	store.load();
	     		    }
	     		}
	     	],
		    responsiveCls: 'big-40 small-50'
		},{
		    xtype: 'tabpanel',
		    border: false,
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
								    minHeight: 695,
								    maxHeight: 695,
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
		    	   items : [
		    	      {
		    	    	  xtype : 'filegrid'
		    	      }
		    	   ]
		       },{
		    	   xtype : 'panel',
		    	   title : '메뉴/화면 서비스',
		    	   items : [
		    	      {
		    	    	  xtype : 'menuservicegrid'
		    	      }
		    	   ]
		       }
		    ],
		    responsiveCls: 'big-60 small-50'
		}
	]
});