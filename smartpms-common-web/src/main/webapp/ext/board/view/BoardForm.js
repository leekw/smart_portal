Ext.define('Ext.board.view.BoardForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.boardform',
    bodyPadding: 10,
    minHeight: 400,
    defaults: {
        labelWidth: 120
    },
    defaultType: 'textfield',
    items: [
        {
            fieldLabel: '제목',
            name: 'boardTitle',
            anchor: '70%'
        },
        {
        	xtype: 'teamcombobox',
        	name: 'boardTeam',
            fieldLabel: '팀 선택',
            anchor: '30%'
        },{
            fieldLabel: '등록자',
            name: 'boardCreator',
            id : 'boardCreator',
            anchor: '30%',
            readOnly: true,
            value : G_LOGIN_NAME,
            handler : function() {
            	
            }
        },{
			xtype: 'button',
			name : 'fileUpload',
			text : '파일 업로드',
			anchor: '10%',
			handler : function() {
				FileUpload._openFileUploadForm();
            }
        },{
        	xtype:'htmleditor',
            fieldLabel: '내용',
            id:'boardDescription',
            name: 'boardDescription',
            width: '100%',
            autoScroll: true,
            minHeight: 370,
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
            						var obj = Ext.getCmp('boardDescription');
            						var image = '<img src="' + reader.result + '">';
            				    	obj.setValue(obj.getValue() + image);
            					}, false);
            					
            				}
            			}
            		}
            	},
            	resize : function (self, width, height) {
            		this.setHeight(Ext.getCmp('board-panel').getHeight() - 300);
            	}
            }
        },{
        	xtype : 'hidden',
            name: 'dataMode'
        },{
        	xtype : 'hidden',
            name: 'boardId'
        },{
        	xtype : 'hidden',
            name: 'boardNo',
            value: G_BOARD_NO
        },{
        	xtype : 'hidden',
            name  : 'ip'
        }
        
    ],
    buttons: [{
        text:'저장',
        action: 'save-form-data',
        ui : 'gray'
    },{
        text:'삭제',
        action: 'remove-form-data',
        disabled: true,
        itemId: 'removeItem',
        ui : 'soft-red'
    },{
        text: '취소',
        action: 'reset-form-data',
        ui : 'gray'
    }],
    listeners : {
    }
});
var _boardId, _boardNo;
var FileUpload = {
	_saveFile : function() {
		var grid = Ext.getCmp('board-list');
		var selectData = grid.getSelectionModel().getSelection()[0];
		if (selectData != null) {
			var data = [];
			var fileStore = Ext.getCmp('file-grid').getStore();
			var recs = fileStore.getRange();
			for (var i=0;i< recs.length;i++) {
				var rec = recs[i];
				if (rec.data.boardId == null || rec.data.boardId == '') {
					rec.set("boardId", selectData.data.boardId);
					rec.set("boardNo", selectData.data.boardNo);
					data.push(rec.getData());
				}
			}
			var url = G_PATH + '/file/add.json';
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
	},
	_openFileUploadForm : function(boardId, boardNo) {
		_boardId = boardId;
		_boardNo = boardNo;
		var win = Ext.getCmp('upload-info');
		if (win == null) {
			win = Ext.create('Ext.window.Window', {
				id : 'upload-info',
	    	    title: '파일 업로드',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
	    	    closeAction : 'hide',
	    	    height: 420,
	    	    width: 550,
	    	    layout: 'fit',
	    	    animateTarget:this,
	    	    items : [{
	    	    	xtype : 'form',
	    			labelWidth: 80,
	    			labelAlign: 'right',
	    			margin: '10 10 10 10',
	    			maxHeight : 330,
	    			bodyPadding: 10,
	    			border: false,
	    			items :[
	    			{
	    				xtype : 'filefield',
	    			    buttonOnly: true,
	    			    name: 'fileupload',
	    			    id : 'file-upload',
	    			    fileInputEl : {
	    			    	multiple: 'multiple'
	    			    },
	    			    anchor: '10%',
	    			    buttonText : '파일첨부',
	    			    listeners: {
	    			    	afterrender : function(object) {
	    			    		object.fileInputEl.set({multiple: 'multiple'});
	    			    	},
	    			    	change : function(object, value, eOpts) {
	    			    		var frm = object.up("form").getForm();
	    			    		if (frm.isValid()) {
	    			    			frm.submit({
	    			    				url : G_PATH + '/file/upload.file',
	    			    				success : function(ft, res) {
	    			    					var jsonResult = Ext.JSON.decode(res.response.responseText);
	    			    					var grid = Ext.getCmp('file-grid');
	    			    					var store = grid.getStore();
	    			    					store.loadData(jsonResult.success, true);
	    			    					object.fileInputEl.set({multiple: 'multiple'});
	    			    					if (_boardId != null && _boardNo != null) {
	    			    						FileUpload._saveFile();
	    			    					}
	    			    				},
	    			    				failure: function(ft, res){
	    			    					Ext.Msg.alert('Exception', result.error.message);
	    			    					object.fileInputEl.set({multiple: 'multiple'});
	    			    				}
	    			    			});
	    			    			
	    			    		}
	    			    	}
	    			    }
	    			},{
	    				xtype : 'filegrid'
	    			},{
	    				xtype : 'form',
	    				id : 'file-down-form',
	    				maxHeight : 0,
	    				defaultType: 'hiddenfield',
	    				items: [{
	    					name : 'fileName'
	    				},{
	    					name : 'filePath'
	    				},{
	    					name : 'filePath'
	    				}]
	    			}]
	    	    }
	    	    ],
				listeners : {
					beforeshow : function() {
						var grid = Ext.getCmp('board-list');
			        	var store = grid.getStore();
			        	var sm = grid.getSelectionModel();
			        	var recs = sm.getSelection()[0];

			    		if (_boardId != null || (recs != null && recs.data.boardId != 0)) {
			        		var grid = Ext.getCmp('file-grid');
			        		var store = grid.getStore(); 
			            	var proxy = store.getProxy();
			            	proxy.extraParams.boardId = _boardId == null ? recs.data.boardId : _boardId;
			            	proxy.extraParams.boardNo = _boardNo == null ? recs.data.boardNo : _boardNo;
			            	store.load();
			    		}
					}
				}
	    	});
		}
		win.show();
	}	
};