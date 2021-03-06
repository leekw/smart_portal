Ext.define('Ext.layout.view.SubMenu', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.submenu',
	id : 'sub-menu',
    width: '98%',
    minHeight: 500,
    margin: '0 0 0 2',
    bodyPadding: 10,
	border: false, 
	rootVisible :true,
	store: 'SubMenu',
	viewConfig: {
		plugins : {
			ptype: 'treeviewdragdrop',
			enableDrag : G_IS_HADNS == 'Y' ? true : false
		},
		listeners: {
			beforedrop: function(node, data, overModel, dropPosition) {
			},
			drop: function(node, data, overModel, dropPosition) {
				var sendData = [];
				var source = data.records[0].data.parentResourceId;
				var target = dropPosition == 'append' ?  overModel.data.resourceId : overModel.data.parentResourceId;
				if (source != target) {
					data.records[0].data.parentResourceId = target;
				}
				var treeData = target === "TOP" ? Ext.getCmp('sub-menu').getStore().root.childNodes  : Ext.getCmp('sub-menu').getStore().getNodeById(target).childNodes;
				for (var i=0;i < treeData.length;i++) {
					var temp = treeData[i];
					sendData.push({resourceId : temp.data.resourceId, parentResourceId: temp.data.parentResourceId, sortNo : i});
				}
				var url = G_PATH + '/resource/modify.json';
				Ext.Ajax.request({
		    	    url: url,
		    	    method: 'POST',
		    	    jsonData: Ext.encode(sendData),
		    	    success: function(response){
		    	    	var result = JSON.parse(response.responseText);
		    	    	if (result.error != null) {
		    				Ext.Msg.alert('Exception', result.error.message);
		    			} else {
		    				Ext.layout.getApplication().getController('LayoutMain').reload();
		    			}
		    	    },
		    	    failure: function(){
		    	    	Ext.Msg.alert('Error', 'Sort Processing Error');
		    	    }
		    	});
			},
			itemcontextmenu: function(tree, record, item, index, e, eOpts) {
				if (G_IS_HADNS == "Y") {
					if (tree.getSelectionModel().getSelection()[0] != null) {
						var selectedData = tree.getSelectionModel().getSelection()[0];
						parentId = selectedData.data.resourceId;
						parentName = selectedData.data.resourceName;
						resourceType = selectedData.data.resourceTypeCode;
						var menu_grid = Ext.create('Ext.menu.Menu', {
							items: [
							    {text: 'Add', handler: function() { ContextMenu._openMenu();} },
							    {text: 'Modify', handler: function() { ContextMenu._openMenuCheck(selectedData, false);} },
							    {text: 'Modify(Force)', handler: function() { ContextMenu._openMenuCheck(selectedData, true);} },
							    {text: 'Delete', handler: function() { ContextMenu._removeMenu(); } }
							]
						});
						var position = [e.getX()-10, e.getY()-10];
						e.stopEvent();
						menu_grid.showAt(position);
					}
				}
			},
			afterrender : function(p, eOpt) {
				
			}
		}
	}
});
var parentId;
var parentName;
var resourceType;
var ContextMenu = {
	_removeMenu : function() {
		Ext.MessageBox.confirm('Confirm', parentName + '를 삭제하겠습니까(복구 불가)?', ContextMenu._remove);
	},
	_remove : function(btn) {
		if (btn == "yes") {
			var formData = {resourceId : parentId };
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
	    				var store = Ext.getCmp('sub-menu').getStore();
	    				store.reload();
	    				Ext.Msg.alert('Compete', '삭제 되었습니다.');
	    			}
	    	    },
	    	    failure: function(){
	    	    	Ext.Msg.alert('Error', 'Save Error');
	    	    }
	    	});
		}
	},
	_openMenu : function() {
		if (resourceType == "") {
			parentId = "TOP";
			parentName = "차세대 PMO";
			resourceType = "MENU";
		}
		if (resourceType == "MENU") {
			Ext.MessageBox.confirm('Confirm', parentName + ' 메뉴 하위로 메뉴를 생성하겠습니까?', ContextMenu._openMenuWindow);
		} else {
			Ext.Msg.alert('Info', '분류 타입의 메뉴에만 추가 가능합나디.');
		}

	},
	_openMenuCheck : function(selectedData, isForce) {
		var url = G_PATH + '/resource/check/modify.json';
		Ext.Ajax.request({
    	    url: url,
    	    method: 'POST',
    	    jsonData: Ext.encode({resourceId:selectedData.data.resourceId, force : isForce}),
    	    success: function(response){
    	    	var result = JSON.parse(response.responseText);
    	    	if (result.error != null) {
    	    		if (!isForce) {
    	    			Ext.Msg.alert('Exception', result.error.message);
    	    		} else {
    	    			Ext.MessageBox.confirm('Confirm', result.error.message + '.작업을 무시하고 수정하겠습니까?', function(btn) {
    	    				if (btn == "yes") {
    	    					ContextMenu._openMenuByModify(selectedData);
    	    				}
    	    			});
    	    		}
    			} else {
    				ContextMenu._openMenuByModify(selectedData);
    			}
    	    },
    	    failure: function(){
    	    	Ext.Msg.alert('Error', 'Sort Processing Error');
    	    }
    	});
	},
	_openMenuByModify : function(selectedData) {
		var win = Ext.getCmp('menu-info');
		if (win != null) win.close();
		win = Ext.create('Ext.window.Window', {
			id : 'menu-info',
    	    title: '메뉴 상세',
    	    resizable : true,
    	    autoScroll: true,
    	    maximizable : true,
    	    height: '95%',
    	    width: 750,
    	    layout: 'fit',
    	    animateTarget:this,
    	    items : [{
				xtype : 'form',
				id : 'menu-form',
				labelWidth: 150,
				labelAlign: 'right',
				width : '98%',
				bodyPadding: 10,
				defaultType: 'textfield',
				items :[
				{
					xtype : 'fieldset',
					title : '메뉴 정보',
					defaultType : 'textfield',
    	    	    defaults : {
    	    		   anchor : '99%'
    	    	    },
					items : [{
					    fieldLabel: '상위 메뉴',
					    name: 'parentResourceId',
					    readOnly: true
					},{
					    fieldLabel: '메뉴ID',
					    name: 'resourceId',
					    hidden: true
					},{
					    fieldLabel: '메뉴명',
					    name: 'resourceName'
					},{
					    fieldLabel: 'URL',
					    name: 'url',
					    id : 'resource-url',
					    readOnly: true,
					    width: '90%'
					},{
			        	xtype: 'radiogroup',
			            fieldLabel: '메뉴유형',
			            id : 'resourceTypeSelect',
			            anchor: '80%',
			            items:[
			                   {boxLabel: '분류', name:'resourceTypeCode', inputValue:'MENU'},
			                   {boxLabel: '일반 페이지', name:'resourceTypeCode', inputValue:'PAGE'},
			                   {boxLabel: '이미지 페이지', name:'resourceTypeCode', inputValue:'IMAGE', checked : true}
			               ]
			        },{
			        	xtype: 'radiogroup',
			            fieldLabel: '메인 여부',
			            id : 'mainResourceSelect',
			            anchor: '80%',
			            items:[
			                   {boxLabel: 'Y', name:'mainResourceYn', inputValue:'Y'},
			                   {boxLabel: 'N', name:'mainResourceYn', inputValue:'N'}
			               ]
			        },{
			        	xtype:'htmleditor',
			            fieldLabel: '이미지 추가',
			            id:'resourceContent',
			            name: 'resourceContent',
			            width: '90%',
			            minHeight: 250,
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
			            	},
			            	resize : function (self, width, height) {
			            		this.setHeight(Ext.getCmp('menu-info').getHeight() - 380);
			            	}
			            }
			        }
					]
				}
				]
			}],
			bbar: [{
				xtype: 'button',
				text : '저장',
				handler: function() {
					var form = Ext.getCmp('menu-form');
					var formData = form.getForm().getValues();
					var url = G_PATH + '/resource/content/modify.json';
					Ext.Ajax.request({
			    	    url: url,
			    	    method: 'POST',
			    	    jsonData: Ext.encode(formData),
			    	    success: function(response){
			    	    	var result = JSON.parse(response.responseText);
			    	    	if (result.error != null) {
			    				Ext.Msg.alert('Exception', result.error.message);
			    			} else {
			    				var store = Ext.getCmp('sub-menu').getStore();
			    				store.reload();
			    				Ext.Msg.alert('Complete', '저장 완료되었습니다.');
			    				win.close();
			    			}
			    	    },
			    	    failure: function(){
			    	    	Ext.Msg.alert('Error', 'Save Error');
			    	    }
			    	});
				}
			},{
				xtype: 'button',
				text : '취소',
				handler: function() {
					var url = G_PATH + '/resource/complete/modify.json';
					Ext.Ajax.request({
			    	    url: url,
			    	    method: 'POST',
			    	    jsonData: Ext.encode({resourceId:selectedData.data.resourceId}),
			    	    success: function(response){
			    	    	
			    	    },
			    	    failure: function(){
			    	    	Ext.Msg.alert('Error', 'Sort Processing Error');
			    	    }
			    	});
					win.close();
				}
			}],
			listeners : {
				afterrender : function (p, eOpts) {
					var form = Ext.getCmp('menu-form');
					form.getForm().loadRecord(selectedData);
				}
			}
    	});
		win.show();
		win.tools.close.disable();
	},
	_openMenuWindow : function (btn) {
		if (btn == "yes") {
			var win = Ext.getCmp('menu-add');
			if (win != null) win.close();
			win = Ext.create('Ext.window.Window', {
				id : 'menu-add',
	    	    title: '메뉴 추가',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
	    	    height: '95%',
	    	    width: 750,
	    	    layout: 'fit',
	    	    animateTarget:this,
	    	    items : [{
					xtype : 'form',
					id : 'menu-form',
					labelWidth: 150,
					labelAlign: 'right',
					width: '98%',
					bodyPadding: 10,
					defaultType: 'textfield',
					items :[{
						xtype : 'fieldset',
						title : '메뉴 정보',
						defaultType : 'textfield',
	    	    	    defaults : {
	    	    		   anchor : '99%'
	    	    	    },
	    	    	    items : [{
						    fieldLabel: '상위 메뉴',
						    name: 'parentResourceId',
						    hidden: true,
						    value : parentId
						},{
						    fieldLabel: '상위 메뉴명',
						    name: 'parentResourceName',
						    value : parentName
						},{
						    fieldLabel: '메뉴명',
						    name: 'resourceName',
						},{
						    fieldLabel: 'URL',
						    name: 'url',
						    id : 'resource-url',
						    readOnly: true,
						    width: '100%'
						},{
				        	xtype: 'radiogroup',
				            fieldLabel: '메뉴유형',
				            id : 'resourceTypeSelect',
				            anchor: '80%',
				            items:[
				                   {boxLabel: '분류', name:'resourceTypeCode', inputValue:'MENU'},
				                   {boxLabel: '일반 페이지', name:'resourceTypeCode', inputValue:'PAGE'},
				                   {boxLabel: '이미지 페이지', name:'resourceTypeCode', inputValue:'IMAGE', checked : true}
				               ]
				        },{
				        	xtype:'htmleditor',
				            fieldLabel: '이미지 추가',
				            id:'resourceContent',
				            name: 'resourceContent',
				            width: '100%',
				            minHeight: 250,
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
				            	},
				            	resize : function (self, width, height) {
				            		this.setHeight(Ext.getCmp('menu-add').getHeight() - 380);
				            	}
				            }
				        }
	    	    	             
	    	    	    ]
					}
					        
					]
				}],
				bbar: [{
					xtype: 'button',
					text : '저장',
					handler: function() {
						var form = Ext.getCmp('menu-form');
						var formData = form.getForm().getValues();
						var url = G_PATH + '/resource/add.json';
						Ext.Ajax.request({
				    	    url: url,
				    	    method: 'POST',
				    	    jsonData: Ext.encode(formData),
				    	    success: function(response){
				    	    	var result = JSON.parse(response.responseText);
				    	    	if (result.error != null) {
				    				Ext.Msg.alert('Exception', result.error.message);
				    			} else {
				    				var store = Ext.getCmp('sub-menu').getStore();
				    				store.reload();
				    				Ext.Msg.alert('Compete', '저장 완료되었습니다.');
				    				win.close();
				    			}
				    	    },
				    	    failure: function(){
				    	    	Ext.Msg.alert('Error', 'Save Error');
				    	    }
				    	});
					}
				},{
					xtype: 'button',
					text : '취소',
					handler: function() {
						win.close();
					}
				}]
	    	});
			win.show();
		}
	}
};