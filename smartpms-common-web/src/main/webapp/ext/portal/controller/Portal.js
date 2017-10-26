Ext.Loader.loadScript({url:G_PATH + '/ext/portal/controller/PortalCore.js'});
Ext.define('Ext.portal.controller.Portal', {
    extend: 'Ext.app.Controller',
    
    stores: ['ConnUser','ConnUserChart', 'BizProcess', 'BizProcessChart', 'Question', 'Wfm', 'Itsm', 'Helf','QuestionChart','JiraLevel','JiraChannel','OpenIssueChart', 'OpenIssueOriginationChart'],
    models: ['Statistic'],

    views: ['ConnUserGrid','BizProcessGrid','QuestionGrid','WfmGrid','ItsmGrid','HelfGrid','JiraLevelGrid','JiraChannelGrid'],

    refs: [{
        ref: 'connUserGrid',
        selector: 'connusergrid'
    },{
        ref: 'bizProcessGrid',
        selector: 'bizprocessgrid'
    },{
        ref: 'questionGrid',
        selector: 'questiongrid'
    },{
        ref: 'wfmGrid',
        selector: 'wfmgrid'
    },{
        ref: 'itsmGrid',
        selector: 'itsmgrid'
    },{
        ref: 'helfGrid',
        selector: 'helfgrid'
    },{
        ref: 'jiraLevelGrid',
        selector: 'jiralevelgrid'
    },{
        ref: 'jiraChannelGrid',
        selector: 'jirachannelgrid'
    }],
    
    init: function() {

        this.control({
        	'connusergrid': {
            	selectionchange: this.gridSelectionChange,
                beforeedit : this.gridBeforeedit
            },
            'bizprocessgrid': {
            	selectionchange: this.gridSelectionChangeBiz
            },
            'questiongrid': {
            	selectionchange: this.gridSelectionChangeQue
            },
            'wfmgrid': {
            	selectionchange: this.gridSelectionChangeWfm
            },
            'itsmgrid': {
            	selectionchange: this.gridSelectionChangeItsm
            },
            'helfgrid': {
            	selectionchange: this.gridSelectionChangeHelf
            },
        	'button[action=add-grid-record]' : {
        		click : this.addGridRecord
	        },
	        'button[action=save-grid-record]' : {
	        	click : this.saveGridRecord
	        },
	        'button[action=reload-grid-record]' : {
	        	click : this.reloadGridRecord
	        },
	        'button[action=remove-grid-record]' : {
            	click : this.removeGridRecord
            },
            //
            'button[action=add-biz-record]' : {
        		click : this.addBizRecord
	        },
	        'button[action=save-biz-record]' : {
	        	click : this.saveBizRecord
	        },
	        'button[action=reload-biz-record]' : {
	        	click : this.reloadBizRecord
	        },
	        'button[action=remove-biz-record]' : {
            	click : this.removeBizRecord
            },
            //
            'button[action=add-que-record]' : {
        		click : this.addQueRecord
	        },
	        'button[action=save-que-record]' : {
	        	click : this.saveQueRecord
	        },
	        'button[action=reload-que-record]' : {
	        	click : this.reloadQueRecord
	        },
	        'button[action=remove-que-record]' : {
            	click : this.removeQueRecord
            },
            
            //
            'button[action=add-wfm-record]' : {
        		click : this.addWfmRecord
	        },
	        'button[action=save-wfm-record]' : {
	        	click : this.saveWfmRecord
	        },
	        'button[action=reload-wfm-record]' : {
	        	click : this.reloadWfmRecord
	        },
	        'button[action=remove-wfm-record]' : {
            	click : this.removeWfmRecord
            },
            
            //
            'button[action=add-itsm-record]' : {
        		click : this.addItsmRecord
	        },
	        'button[action=save-itsm-record]' : {
	        	click : this.saveItsmRecord
	        },
	        'button[action=reload-itsm-record]' : {
	        	click : this.reloadItsmRecord
	        },
	        'button[action=remove-itsm-record]' : {
            	click : this.removeItsmRecord
            },
            
            //
            'button[action=add-helf-record]' : {
        		click : this.addHelfRecord
	        },
	        'button[action=save-helf-record]' : {
	        	click : this.saveHelfRecord
	        },
	        'button[action=reload-helf-record]' : {
	        	click : this.reloadHelfRecord
	        },
	        'button[action=remove-helf-record]' : {
            	click : this.removeHelfRecord
            },
            '#chart-data-select' : {
            	change : this.changeChartData
            },
            'button[action=reload-level-record]' : {
	        	click : this.reloadLevelRecord
	        },
	        'button[action=reload-channel-record]' : {
	        	click : this.reloadChannelRecord
	        },
	        'button[action=upload-excel]' : {
	        	click : this.uploadExcel
	        }
        });
        
    },
    gridBeforeedit : function(editor, context, opt) {

    },
    
    gridSelectionChange : function(model, records) {
    	var grid = this.getConnUserGrid();
    	grid.down('#removeItem').setDisabled(!records.length);
    },
    gridSelectionChangeBiz : function(model, records) {
    	var grid = this.getBizProcessGrid();
    	grid.down('#removeBiz').setDisabled(!records.length);
    },
    gridSelectionChangeQue : function(model, records) {
    	var grid = this.getQuestionGrid();
    	grid.down('#removeQue').setDisabled(!records.length);
    },
    gridSelectionChangeWfm : function(model, records) {
    	var grid = this.getWfmGrid();
    	grid.down('#removeWfm').setDisabled(!records.length);
    },
    gridSelectionChangeItsm : function(model, records) {
    	var grid = this.getItsmGrid();
    	grid.down('#removeItsm').setDisabled(!records.length);
    },
    gridSelectionChangeHelf : function(model, records) {
    	var grid = this.getHelfGrid();
    	grid.down('#removeHelf').setDisabled(!records.length);
    },
    addGridRecord : function() {
    	var rowEditing = this.getConnUserGrid().getPlugin('rowEditing');
    	var store = this.getConnUserGrid().getStore();
    	rowEditing.cancelEdit();

        var r = Ext.create('Ext.portal.model.Statistic', {
        	channel: '',
        	target: 0,
        	data1: 0,
        	mode: '',
        	day:''
        });

        store.insert(0, r);
        rowEditing.startEdit(0, 0);
    },
    addBizRecord : function() {
    	var rowEditing = this.getBizProcessGrid().getPlugin('rowEditing');
    	var store = this.getBizProcessGrid().getStore();
    	rowEditing.cancelEdit();

        var r = Ext.create('Ext.portal.model.Statistic', {
        	channel: '',
        	target: 0,
        	data1: 0,
        	mode: '',
        	day:''
        });

        store.insert(0, r);
        rowEditing.startEdit(0, 0);
    },
    addQueRecord : function() {
    	var rowEditing = this.getQuestionGrid().getPlugin('rowEditing');
    	var store = this.getQuestionGrid().getStore();
    	rowEditing.cancelEdit();

        var r = Ext.create('Ext.portal.model.Statistic', {
        	channel: '',
        	target: 0,
        	data1: 0,
        	mode: '',
        	day:''
        });

        store.insert(0, r);
        rowEditing.startEdit(0, 0);
    },
    addWfmRecord : function() {
    	var rowEditing = this.getWfmGrid().getPlugin('rowEditing');
    	var store = this.getWfmGrid().getStore();
    	rowEditing.cancelEdit();

        var r = Ext.create('Ext.portal.model.Statistic', {
        	channel: '',
        	target: 0,
        	data1: 0,
        	data2: 0,
        	data3: 0,
        	data4: 0,
        	mode: '',
        	day:''
        });

        store.insert(0, r);
        rowEditing.startEdit(0, 0);
    },
    addItsmRecord : function() {
    	var rowEditing = this.getItsmGrid().getPlugin('rowEditing');
    	var store = this.getItsmGrid().getStore();
    	rowEditing.cancelEdit();

        var r = Ext.create('Ext.portal.model.Statistic', {
        	channel: 'fixed',
        	target: 0,
        	data1: 0,
        	data2: 0,
        	data3: 0,
        	mode: '',
        	day:''
        });

        store.insert(0, r);
        rowEditing.startEdit(0, 0);
    },
    addHelfRecord : function() {
    	var rowEditing = this.getHelfGrid().getPlugin('rowEditing');
    	var store = this.getHelfGrid().getStore();
    	rowEditing.cancelEdit();

        var r = Ext.create('Ext.portal.model.Statistic', {
        	channel: 'fixed',
        	target: 0,
        	data1: 0,
        	data2: 0,
        	data3: 0,
        	data4: 0,
        	data5: 0,
        	data6: 0,
        	mode: '',
        	day:''
        });

        store.insert(0, r);
        rowEditing.startEdit(0, 0);
    },
    saveGridRecord : function() {
    	var grid = this.getConnUserGrid();
    	var store = grid.getStore();
    	var url = "/int/connuser/save.json";
    	PortalCore._save(store, url, 'conn-user-chart');
    },
    saveBizRecord : function() {
    	var grid = this.getBizProcessGrid();
    	var store = grid.getStore();
    	var url = "/int/bizprocess/save.json";
    	PortalCore._save(store, url, 'biz-proc-chart');
    },
    saveQueRecord : function() {
    	var grid = this.getQuestionGrid();
    	var store = grid.getStore();
    	var url = "/int/question/save.json";
    	PortalCore._save(store, url, 'question-chart');
    },
    saveWfmRecord : function() {
    	var grid = this.getWfmGrid();
    	var store = grid.getStore();
    	var url = "/int/wfm/save.json";
    	PortalCore._save(store, url, 'question-chart');
    },
    saveItsmRecord : function() {
    	var grid = this.getItsmGrid();
    	var store = grid.getStore();
    	var url = "/int/itsm/save.json";
    	PortalCore._save(store, url, 'question-chart');
    },
    saveHelfRecord : function() {
    	var grid = this.getHelfGrid();
    	var store = grid.getStore();
    	var url = "/int/helf/save.json";
    	PortalCore._save(store, url, 'question-chart');
    },
    reloadGridRecord : function() {
    	var grid = this.getConnUserGrid();
    	var store = grid.getStore();
    	store.load();
    },
    reloadBizRecord : function() {
    	var grid = this.getBizProcessGrid();
    	var store = grid.getStore();
    	store.load();
    },
    reloadQueRecord : function() {
    	var grid = this.getQuestionGrid();
    	var store = grid.getStore();
    	store.load();
    },
    reloadWfmRecord : function() {
    	var grid = this.getWfmGrid();
    	var store = grid.getStore();
    	store.load();
    },
    reloadItsmRecord : function() {
    	var grid = this.getItsmGrid();
    	var store = grid.getStore();
    	store.load();
    },
    reloadHelfRecord : function() {
    	var grid = this.getHelfGrid();
    	var store = grid.getStore();
    	store.load();
    },
    reloadLevelRecord : function() {
    	var grid = this.getJiraLevelGrid();
    	var store = grid.getStore();
    	store.load();
    	var chart = Ext.getCmp('openissue-chart').getStore();
    	chart.load();
    },
    reloadChannelRecord : function() {
    	var grid = this.getJiraChannelGrid();
    	var store = grid.getStore();
    	store.load();
    },
    removeGridRecord : function() {
    	var grid = this.getConnUserGrid();
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	grid.getPlugin('rowEditing').cancelEdit();
        store.remove(sm.getSelection());
        if (store.getCount() > 0) {
            sm.select(0);
        }
    },
    removeBizRecord : function() {
    	var grid = this.getBizProcessGrid();
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	grid.getPlugin('rowEditing').cancelEdit();
        store.remove(sm.getSelection());
        if (store.getCount() > 0) {
            sm.select(0);
        }
    },
    removeQueRecord : function() {
    	var grid = this.getQuestionGrid();
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	grid.getPlugin('rowEditing').cancelEdit();
        store.remove(sm.getSelection());
        if (store.getCount() > 0) {
            sm.select(0);
        }
    },
    removeWfmRecord : function() {
    	var grid = this.getWfmGrid();
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	grid.getPlugin('rowEditing').cancelEdit();
        store.remove(sm.getSelection());
        if (store.getCount() > 0) {
            sm.select(0);
        }
    },
    removeItsmRecord : function() {
    	var grid = this.getItsmGrid();
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	grid.getPlugin('rowEditing').cancelEdit();
        store.remove(sm.getSelection());
        if (store.getCount() > 0) {
            sm.select(0);
        }
    },
    removeHelfRecord : function() {
    	var grid = this.getHelfGrid();
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	grid.getPlugin('rowEditing').cancelEdit();
        store.remove(sm.getSelection());
        if (store.getCount() > 0) {
            sm.select(0);
        }
    },
    changeChartData : function(field, newValue, oldValue) {
    	var chart = Ext.getCmp('question-chart');
    	var store = chart.getStore(); 
    	var proxy = store.getProxy();
    	proxy.extraParams.type = newValue.processType;
    	store.load();
    },
    uploadExcel : function() {
    	var win = Ext.getCmp('upload-info');
		if (win == null) {
			win = Ext.create('Ext.window.Window', {
				id : 'upload-info',
	    	    title: '엑셀 업로드',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
	    	    closeAction : 'hide',
	    	    height: 150,
	    	    width: 400,
	    	    layout: 'fit',
	    	    animateTarget:this,
	    	    items : [{
	    	    	xtype : 'form',
	    			labelWidth: 80,
	    			labelAlign: 'right',
	    			margin: '10 10 10 10',
	    			maxHeight : 60,
	    			bodyPadding: 10,
	    			items :[
	    			{
	    				xtype : 'filefield',
	    				fieldLabel : '파일첨부',
	    				reference : 'basicFile',
	    			    name: 'fileupload',
	    			    id : 'file-upload',
	    			    buttonText : '찾아보기',
	    			    fbar : [
	    			        {
	    			        	xtype : 'buttton',
	    			        	text : '파일전송',
	    			        	handler : function(btn) {
	    			        		var frm = object.up("form").getForm();
		    			    		if (frm.isValid()) {
		    			    			frm.submit({
		    			    				url : G_PATH + '/excel/upload.file',
		    			    				success : function(ft, res) {
		    			    					var jsonResult = Ext.JSON.decode(res.response.responseText);
		    			    					
		    			    				},
		    			    				failure: function(ft, res){
		    			    					Ext.Msg.alert('Exception', result.error.message);
		    			    				}
		    			    			});
		    			    			
		    			    		}
	    			        	}
	    			        }
	    			    ],
	    			    listeners: {
	    			    }
	    			}]
	    	    }
	    	    ],
				listeners : {
					beforeshow : function() {
						
					}
				}
	    	});
		}
		win.show();
    }
    
});