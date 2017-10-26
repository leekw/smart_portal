Ext.define('Ui.admin.menu.view.FileGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.filegrid',
    id : 'menu-file-grid',
    border: false,
    minHeight: 610,
    initComponent: function() {
    	
    	this.store = 'File';

        this.columns = [
        new Ext.grid.RowNumberer({
        	header : 'no',
        	align : 'center',
        	width: 40
        }),
        { 
            header: '실제파일명',
            dataIndex: 'fileName',
            align : 'center',
            width: 100,
            flex:1
        }, { 
            header: '파일사이즈',
            dataIndex: 'fileSize',
            align : 'center',
            width: 200
        }, { 
            header: 'file no',
            hidden: true,
            dataIndex: 'fileNo',
            width: 50
        },{
        	header: '<span class="right-icon hot-icon x-fa fa-cloud-download"></span>',
        	width: 80,
        	align:'center',
        	dataIndex: 'fileDownd',
        	renderer : function(value) {
        		return '<span class="right-icon hot-icon x-fa fa-cloud-download"  style="cursor:pointer;cursor:hand;"></span>';
        	}
        }
        ];
        
        this.tbar = [
			{
				xtype : 'form',
				border: false,
				height:30,
				items :[
				    {
				    	xtype : 'fieldcontainer',
				    	layout : 'hbox',
				    	anchor : '0',
				    	items : [
							{
								xtype : 'filefield',
							    buttonOnly: true,
							    name: 'fileupload',
							    id : 'file-upload',
							    width: 75,
							    fileInputEl : {
							    	multiple: 'multiple'
							    },
							    buttonText : '파일첨부',
							    listeners: {
							    	afterrender : function(object) {
							    		object.fileInputEl.set({multiple: 'multiple'});
							    	},
							    	change : function(object, value, eOpts) {
							    		if (!isMenuFileAttach) {
							    			Ext.Msg.alert('Info', '파일 첨부 할 수 없는 메뉴유형입니다.');
							    			return false;
							    		}
							    		var frm = object.up("form").getForm();
							    		if (frm.isValid()) {
							    			frm.submit({
							    				url : G_PATH + '/permit/res/file/upload.file',
							    				success : function(ft, res) {
							    					var jsonResult = Ext.JSON.decode(res.response.responseText);
							    					var grid = Ext.getCmp('menu-file-grid');
							    					var store = grid.getStore();
							    					store.loadData(jsonResult.success, true);
							    					object.fileInputEl.set({multiple: 'multiple'});
							    					FileUpload._saveFile();
							    				},
							    				failure: function(ft, res){
							    					Ext.Msg.alert('Exception', result.error.message);
							    					object.fileInputEl.set({multiple: 'multiple'});
							    				}
							    			});
							    			
							    		}
							    	}
							    }
							},
							{
					            xtype : 'button',
								text: '삭제',
					            id : 'file-remove',
					            ui : 'soft-red',
					            disabled : true,
					            handler : function() {
					            	var grid = Ext.getCmp('menu-file-grid');
					            	var store = grid.getStore();
					            	var sm = grid.getSelectionModel();
					            	var data = sm.getSelection()[0].getData();
					                store.remove(sm.getSelection());
					                if (store.getCount() > 0) {
					                    sm.select(0);
					                }
					                var url = G_PATH + '/permit/res/file/remove.json';
					        		Ext.Ajax.request({
					            	    url: url,
					            	    method: 'POST',
					            	    jsonData: Ext.encode(data),
					            	    success: function(response){
					            	    	var result = JSON.parse(response.responseText);
					            	    	if (result.error != null) {
					            				Ext.Msg.alert('Exception', result.error.message);
					            			}  else {
					            				Ext.Msg.alert('Complete', '삭제 되었습니다.')
					            			}
					            	    },
					            	    failure: function(){
					            	    	Ext.Msg.alert('Error', '삭제 중 오류가 발생되었습니다.');
					            	    }
					            	});
					            }
					        }
				    	]
				    }
					
				]
			}
		];
        
        this.callParent(arguments);
    },
    listeners : {
    	afterrender : function() {
    		
    	},
    	cellclick : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        	var grid = Ext.getCmp('menu-file-grid');
        	if (grid.columns[cellIndex] != null && grid.columns[cellIndex].dataIndex == 'fileDownd') {
        		var store = grid.getStore();
            	var sm = grid.getSelectionModel();
            	if (sm.getSelection() != null && sm.getSelection()[0] !=null) {
            		var data = sm.getSelection()[0].getData();
            		var iframe = Ext.getBody().createChild({
                		tag : 'iframe',
                		cls : 'x-hidden',
                		src : G_PATH + '/permit/res/file/download.do?fileNo=' + encodeURIComponent(data.fileNo) + '&filePath=' + encodeURIComponent(data.filePath),
                		onload : 'Ext.getBody().unmask(); var t = Ext.get(this); t.remove.defer(1000, t);'
                	});
            		
            	}
        	}
        }
    }
});    

var FileUpload = {
	_saveFile : function() {
		var grid = Ext.getCmp('sub-menu');
		var selectMenu = grid.getSelectionModel().getSelection()[0];
		if (selectMenu != null) {
			var data = [];
			var fileStore = Ext.getCmp('menu-file-grid').getStore();
			var recs = fileStore.getRange();
			for (var i=0;i< recs.length;i++) {
				var rec = recs[i];
				if (rec.data.resourceId == null || rec.data.resourceId == '') {
					rec.set("resourceId", selectMenu.data.resourceId);
					data.push(rec.getData());
				}
			}
			var url = G_PATH + '/permit/res/file/add.json';
			Ext.Ajax.request({
	    	    url: url,
	    	    method: 'POST',
	    	    jsonData: Ext.encode(data),
	    	    success: function(response){
	    	    	var result = JSON.parse(response.responseText);
	    	    	if (result.error != null) {
	    				Ext.Msg.alert('Exception', result.error.message);
	    			} else {
	    				Ext.Msg.alert('Complete', '저장 완료되었습니다.');
	    				fileStore.reload();
	    			}
	    	    },
	    	    failure: function(){
	    	    	Ext.Msg.alert('Error', '저장중 오류가 발생되었습니다.');
	    	    }
	    	});
		} 
	}
}