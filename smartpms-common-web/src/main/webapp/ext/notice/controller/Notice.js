Ext.Loader.loadScript({url:G_PATH + '/ext/notice/controller/NoticeCore.js'});
Ext.define('Ext.notice.controller.Notice', {
    extend: 'Ext.app.Controller',
    stores: ['Notice', 'Mail'],
    models: ['Notice', 'Mail'],

    views: ['NoticeGrid','NoticeForm','NoticePanel'],

    refs: [{
        ref: 'noticeForm',
        selector: 'noticeform'
    },{
        ref: 'noticeGrid',
        selector: 'noticegrid'
    }],
    
    init: function() {

        this.control({
            'noticegrid': {
            	selectionchange: this.gridSelectionChange,
                beforeedit : this.gridBeforeedit,
                cellclick : this.viewNoticeDetail
            },
            'button[action=add-notice-record]' : {
            	click : this.addGridRecord
            },
            'button[action=remove-grid-record]' : {
            	click : this.removeGridRecord
            },
            'button[action=save-grid-record]' : {
            	click : this.saveGridRecord
            },
            'button[action=reload-notice-record]' : {
            	click : this.reloadGridRecord
            },
            'button[action=save-form-data]' : {
            	click : this.saveFormData
            },
            'button[action=reset-form-data]' : {
            	click : this.resetFormData
            },
            '#noticePublish' : {
            	click : this.openNoticePopup
            },
            '#noticeTemplateSelect' : {
            	change : this.changeNoticeTemplate
            },
            'button[action=pub-form-data]' : {
            	click : this.openNoticePopupByForm
            }
        });
        
    },
    
    
    addGridRecord : function() {
    	var form = this.getNoticeForm();
    	form.getForm().reset();
    	var cmp = Ext.getCmp('notice-form-tot');
    	cmp.expand();
    },
    
    removeGridRecord : function() {
    	var grid = this.getNoticeGrid();
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	grid.getPlugin('rowEditing').cancelEdit();
        store.remove(sm.getSelection());
        if (store.getCount() > 0) {
            sm.select(0);
        }
    },
    
    saveGridRecord : function() {
    	var grid = this.getNoticeGrid();
    	var store = grid.getStore();
    	
    	
    },
    
    reloadGridRecord : function() {
    	var grid = this.getNoticeGrid();
    	var store = grid.getStore();
    	store.load();
    },
    
    saveFormData : function() {
    	var form = this.getNoticeForm();
    	var store = this.getNoticeGrid().getStore();
    	var data = [];
    	var formData = form.getForm().getValues();
    	data.push(formData);
    	if (formData.noticeLevel == null || formData.noticeLevel  == "") {
    		Ext.Msg.alert('Info', '공지 레벨을 선택해 주십시오.');
    		return false;
    	}
    	NoticeCore._merge(data, formData.dataMode, store);
    	Ext.getCmp('notice-win').close();
    },
    
    resetFormData : function() {
    	Ext.getCmp('notice-win').close();
    },
    
    gridBeforeedit : function(editor, context, opt) {
    	var grid = this.getNoticeGrid();
    	
    	
    },
    viewNoticeDetail : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var _controller = this;
    	var grid = this.getNoticeGrid();
    	if (grid.columns[cellIndex-1] != null && 
    			grid.columns[cellIndex-1].dataIndex == 'noticeTitle') {
    		var store = grid.getStore();
        	var sm = grid.getSelectionModel();
        	if (sm.getSelection() != null && sm.getSelection()[0] !=null) {
        		var data = sm.getSelection()[0].getData();
        		var win = Ext.getCmp('notice-detail');
        		if (win != null) win.close();
        		//Ext.getCmp('notice-detail-view').setHtml(data.noticeDescription);
        		win = Ext.create('Ext.window.Window', {
        			id : 'notice-detail',
            	    title: '공지 상세',
            	    resizable : true,
            	    autoScroll: true,
            	    maximizable : false,
            	    border: false,
            	    height: '100%',
            	    align:'center',
            	    padding : '10',
            	    width: '100%',
            	    layout: 'fit',
            	    animateTarget:this,
            	    html : _controller.getNoticeContent(data),
            	    listeners : {
            	    	afterrender : function(panel) {
            	    		var header = panel.header;
            	    	}
            	    }
            	});
        		win.show();
        	}
    	}
    },
    getNoticeContent : function(data) { 
		var result = "";
		
		result += '<center><h2>' + data.noticeTitle + '</h2><br></center>';
		result += '<center><div style="padding: 10 10 10 10;"><p>' + data.noticeDescription + '</h2><div></center>';
		return result;
    },
    gridSelectionChange : function(model, records) {
//    	var grid = this.getNoticeGrid();
//    	var form = this.getNoticeForm();
//        if (records[0]) {
//        	form.getForm().loadRecord(records[0]);
//        }
//        var cmp = Ext.getCmp('notice-form-tot');
//        cmp.expand();
    },
    openNoticePopupByForm : function() {
    	var formData = this.getNoticeForm().getValues();
    	var url = G_PATH + '/notice/publish.json';
    	var data = {noticeId:formData.noticeId};
    	Ext.Ajax.request({
	        url: url,
	        method: 'POST',
	        jsonData: Ext.encode(data),
	        success: function(response){
	    	var result = JSON.parse(response.responseText);
	    	if (result.error != null) {
	    			Ext.Msg.alert('Exception', result.error.message);
	    		} 
	        },
	        failure: function(){
	        	Ext.Msg.alert('Error', '공지 발행 중 오류가 발생되었습니다.');
	        }
	    });
    },
    openNoticePopup : function(grid, record, index) {
    	var store = this.getNoticeGrid().getStore();
    	var m = store.getAt(index);
    	var url = G_PATH + '/notice/publish.json';
    	var data = {noticeId:m.get('noticeId')};
    	if (G_IS_HADNS == "Y") {
    		Ext.MessageBox.confirm('Confirm', '공지 발행하시겠습니까?',
    				function (btn) {
    					if (btn == 'yes') {
					    	Ext.Ajax.request({
						        url: url,
						        method: 'POST',
						        jsonData: Ext.encode(data),
						        success: function(response){
						    	var result = JSON.parse(response.responseText);
						    	if (result.error != null) {
						    			Ext.Msg.alert('Exception', result.error.message);
						    		} 
						        },
						        failure: function(){
						        	Ext.Msg.alert('Error', '공지 발행 중 오류가 발생되었습니다.');
						        }
						    });
    					}
    				}
    		);
    	}
    },
    changeNoticeTemplate : function() {
    	var cmp = Ext.getCmp('notice-form');
    	var index = cmp.getValues().noticeLevel;
    	var html = '';
    	var data = '';
    	if (index =="CRITICAL") {
    		html = 'critical';
    	} else if (index == "COMPLETE") {
    		html = 'complete';
    	} else {
    		html = 'normal';
    	}
    	if (html != '') {
	    	var iframe = document.getElementById("notice-tp-" + html).contentWindow;
	    	data = iframe.document.documentElement.innerHTML;
    	}
    	var obj = Ext.getCmp('noticeDescription');
    	obj.setValue(data);
    }
});