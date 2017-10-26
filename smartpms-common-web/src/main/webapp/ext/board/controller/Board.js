Ext.Loader.loadScript({url:G_PATH + '/ext/board/controller/BoardCore.js'});
Ext.define('Ext.board.controller.Board', {
    extend: 'Ext.app.Controller',
    stores: ['Board', 'Team', 'File'],
    models: ['Board', 'Team', 'File'],

    views: ['BoardGrid','BoardForm','BoardPanel', 'FileGrid'],

    refs: [{
        ref: 'boardForm',
        selector: 'boardform'
    },{
        ref: 'boardGrid',
        selector: 'boardgrid'
    },{
        ref: 'fileGrid',
        selector: 'filegrid'
    }],
    
    init: function() {

        this.control({
            'boardgrid': {
            	//selectionchange: this.gridSelectionChange,
            	cellclick : this.gridCellClick,
                beforeedit : this.gridBeforeedit
            },
            'filegrid' : {
            	cellclick : this.fileDownload
            },
            'button[action=add-board-record]' : {
            	click : this.addGridRecord
            },
            'button[action=remove-grid-record]' : {
            	click : this.removeGridRecord
            },
            'button[action=save-grid-record]' : {
            	click : this.saveGridRecord
            },
            'button[action=reload-board-record]' : {
            	click : this.reloadGridRecord
            },
            'button[action=save-form-data]' : {
            	click : this.saveFormData
            },
            'button[action=reset-form-data]' : {
            	click : this.resetFormData
            },
            'button[action=remove-form-data]' : {
            	click : this.removeFormData
            },
            'button[action=remove-file-record]' : {
            	click : this.removeFile
            },
            'button[action=confirm-file-record]' : {
            	click : this.saveFile
            }
        });
        
    },
    
    addGridRecord : function() {
    	var form = this.getBoardForm();
    	form.getForm().reset();
    	form.expand();
    	form.down('#removeItem').setDisabled(true);
    	Ext.getCmp('boardCreator').setValue(G_LOGIN_NAME);
    },
    
    removeGridRecord : function() {
    	var grid = this.getBoardGrid();
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	grid.getPlugin('rowEditing').cancelEdit();
        store.remove(sm.getSelection());
        if (store.getCount() > 0) {
            sm.select(0);
        }
    },
    
    
    reloadGridRecord : function() {
    	var grid = this.getBoardGrid();
    	var store = grid.getStore();
    	store.load();
    },
    removeFormData : function() {
    	var form = this.getBoardForm();
    	var store = this.getBoardGrid().getStore();
    	var data = [];
    	var formData = form.getForm().getValues();
    	data.push(formData);
    	BoardCore._remove(data, formData.dataMode, store);
    	this.getBoardGrid().expand();
    },
    saveFormData : function() {
    	var form = this.getBoardForm();
    	var store = this.getBoardGrid().getStore();
    	var data = [];
    	var formData = form.getForm().getValues();
    	if (formData.boardTitle == "") {
    		Ext.Msg.alert('Info', '제목은 필수로 입력되어야 합니다.');
    		return false;
    	}
    	if (formData.boardTeam == "") {
    		Ext.Msg.alert('Info', '팀은 필수로 입력되어야 합니다.');
    		return false;
    	}
    	if (formData.boardDescription == "") {
    		Ext.Msg.alert('Info', '보고 내용은 필수로 입력되어야 합니다.');
    		return false;
    	}
    	if (formData.boardCreator == "") {
    		Ext.Msg.alert('Info', '등록자는 필수로 입력되어야 합니다.');
    		return false;
    	}
    	data.push(formData);
    	BoardCore._merge(data, formData.dataMode, store);
    	Ext.getCmp('board-win').close();
    },
    
    resetFormData : function() {
    	Ext.getCmp('board-win').close();
    },
    
    gridBeforeedit : function(editor, context, opt) {
    	var grid = this.getBoardGrid();
    	
    },
    gridCellClick : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var form = this.getBoardForm();
    	var grid = this.getBoardGrid();
    	if (grid.columns[cellIndex-1].dataIndex == 'fileView')  {
            var data = record.getData();
        	FileUpload._openFileUploadForm(data.boardId, data.boardNo);
    	}
    },
    gridSelectionChange : function(model, records) {
    	var form = this.getBoardForm();
        form.down('#removeItem').setDisabled(!records.length);
    },
    removeFile : function() {
    	var grid = this.getFileGrid();
    	Ext.MessageBox.confirm('Confirm', '선택한 파일을 삭제하겠습니까(복구 불가)?', function(btn) {
    		if (btn == 'yes') {
    	    	var store = grid.getStore();
    	    	var sm = grid.getSelectionModel();
    	    	var data = sm.getSelection()[0].getData();
    	        store.remove(sm.getSelection());
    	        if (store.getCount() > 0) {
    	            sm.select(0);
    	        }
    	        var url = G_PATH + '/file/remove.json';
    			Ext.Ajax.request({
    	    	    url: url,
    	    	    method: 'POST',
    	    	    jsonData: Ext.encode(data),
    	    	    success: function(response){
    	    	    	var result = JSON.parse(response.responseText);
    	    	    	if (result.error != null) {
    	    				Ext.Msg.alert('Exception', result.error.message);
    	    			}  else {
    	    				Ext.Msg.alert('Complete', '삭제 되었습니다.');
    	    			}
    	    	    },
    	    	    failure: function(){
    	    	    	Ext.Msg.alert('Error', '삭제 중 오류가 발생되었습니다.');
    	    	    }
    	    	});
    		}
    	});
    },
    fileDownload : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var grid = this.getFileGrid();
    	if (grid.columns[cellIndex].dataIndex == 'fileDownd') {
    		var store = grid.getStore();
        	var sm = grid.getSelectionModel();
        	if (sm.getSelection() != null && sm.getSelection()[0] !=null) {
        		var data = sm.getSelection()[0].getData();
        		
        		var iframe = document.getElementById("file-down-iframe");
        		iframe.src = G_PATH + '/file/download.do?fileName=' + encodeURIComponent(data.fileName) + '&filePath=' + encodeURIComponent(data.filePath);
        	}
    	}
    }
});