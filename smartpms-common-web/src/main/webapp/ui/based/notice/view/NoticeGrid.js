var _data;
Ext.define('Ui.based.notice.view.NoticeGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.noticegrid',    
    title: '전체 공지',
    background: 'none',
    layout: 'fit',
    minHeight : 600,
    maxHeight : 700,
    initComponent: function() {
    	
        this.store = 'Notice';
        
        this.selModel = {
        	selType: 'checkboxmodel'
        };
       
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'No',
			width: 60,
			align :'center'
		}),
        { 
            header: '제목',
            dataIndex: 'noticeTitle',
            flex:1,
            renderer : function(v) {
            	return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;">' + v + '</span>'
            }
        }, { 
            header: '공지 레벨',
            align : 'center',
            dataIndex: 'noticeLevel',
            width: 100,
            renderer : function(value) {
            	if (value == 'NORMAL') {
            		return '상시';
            	} else if(value == 'CRITICAL') {
            		return '긴급';
            	} else if(value == 'FAILURE') {
            		return '장애';
            	} else if(value == 'WORK') {
            		return '작업';
            	} else {
            		return value;
            	}
            }
        }, { 
            header: '생성일시',
            align : 'center',
            dataIndex: 'noticeCreateDate',
            width: 150,
            editor: {
                allowBlank: false
            }
        }, 
        { 
        	header: '<span class="right-icon hot-icon x-fa fa-send"></span>',
            width: 80,
            align : 'center',
            id: 'noticePublish',
            renderer: function(value) {
                return '<span class="right-icon hot-icon x-fa fa-send"  style="cursor:pointer;cursor:hand;"></span>';
            }
        },{ 
        	header: '공지유형',
            width: 80,
            align : 'center',
            dataIndex: 'noticePublishType',
            renderer: function(value) {
            	if (value == '1') {
            		return '긴급공지';
            	} else if(value == '2') {
            		return '이메일발송';
            	} else if(value == '3') {
            		return '전체';
            	}
            	return '';
            }
        }, { 
        	header: '이메일발송 그룹',
            width: 120,
            align : 'center',
            dataIndex: 'mailGroupName'
        }
        
        ];
        
        this.tbar = [
        ];
        
        this.callParent(arguments);
    },
    tools:[{
        xtype: 'tool',                                    
        cls: 'x-fa fa-refresh dashboard-tools',
        tooltip: '공지 조회',
        width: 20,
        height: 20,
        handler : function() {
        	var grid = Ext.getCmp('notice-list');
        	var store = grid.getStore();
        	store.load();
        }
    },{
        xtype: 'tool',                                    
        cls: 'x-fa fa-plus dashboard-tools',
        tooltip: '공지 등록',
        width: 20,
        height: 20,
        handler : function() {
        	var win = Ext.getCmp('notice-win');
        	_data = null;
    		if (win == null) {
	    		win = Ext.create('Ext.window.Window', {
	    			id : 'notice-win',
	        	    title: '공지 작성',
	        	    resizable : true,
	        	    autoScroll: true,
	        	    maximizable : true,
	        	    closeAction : 'hide',
	        	    modal: true,
	        	    height: '95%',
	        	    width: '95%',
	        	    layout: 'fit',
	        	    border: false,
	        	    animateTarget:this,
	        	    items : [{
	    				id : 'notice-form',
	    				cls : 'reg-panel-body',
	    				border : false,
	    				xtype : 'noticeform'
	        	    }],
	        	    listeners : {
	        	    	beforeshow : function() {
	        	    		var form = Ext.getCmp('notice-form');
	        	    		if (_data == null) {
	        	    			form.getForm().reset();
	        	    		} else {
	        	    			form.getForm().loadRecord(_data);
	        	    		}
	        	    	}
	        	    }
	    		});
    		}
    		win.show();
        }
    },{
        xtype: 'tool',                                    
        cls: 'x-fa fa-edit dashboard-tools',
        tooltip: '공지 수정',
        width: 20,
        height: 20,
        handler : function() {
        	var grid = Ext.getCmp('notice-list');
        	var store = grid.getStore();
        	var sm = grid.getSelectionModel();
        	if (sm.getSelection() != null && sm.getSelection()[0] !=null) {
        		_data = sm.getSelection()[0];
        		var win = Ext.getCmp('notice-win');
        		if (win == null) {
    	    		win = Ext.create('Ext.window.Window', {
    	    			id : 'notice-win',
    	        	    title: '공지 작성',
    	        	    resizable : true,
    	        	    autoScroll: true,
    	        	    maximizable : true,
    	        	    closeAction : 'hide',
    	        	    modal: true,
    	        	    height: '95%',
    	        	    width: '95%',
    	        	    layout: 'fit',
    	        	    animateTarget:this,
    	        	    border: false,
    	        	    items : [{
    	    				id : 'notice-form',
    	    				cls : 'reg-panel-body',
    	    				xtype : 'noticeform'
    	        	    }],
    	    			listeners : {
    	    				beforeshow : function() {
    	    					var form = Ext.getCmp('notice-form');
    	        	    		if (_data == null) {
    	        	    			form.getForm().reset();
    	        	    		} else {
    	        	    			form.getForm().loadRecord(_data);
    	        	    		}
    	    				}
    	    			}
    	    		});
        		}
        		win.show();
        	} else {
        		Ext.Msg.alert('Info', '변경할 대상을 선택해 주십시오.');
        	}
        	
        }
    },{
        xtype: 'tool',                                    
        cls: 'x-fa fa-trash dashboard-tools',
        tooltip: '공지 삭제',
        width: 20,
        height: 20,
        handler : function() {
        	var grid = Ext.getCmp('notice-list');
        	var store = grid.getStore();
        	var sm = grid.getSelectionModel();
        	var recs = sm.getSelection();
        	if (recs.length < 1) {
        		Ext.Msg.alert('Info', '삭제 대상을 선택하십시오.');
        		return ;
        	}
        	Ext.MessageBox.confirm('Confirm', '선택한 공지를 삭제하겠습니까(복구 불가)?', GridAction._remove);
        }
    }
    ],
    listeners : {
    	afterrender : function(panel) {
    	},
    	beforerender : function(panel) {
    		
    	}
    }
});    

var GridAction = {
	_remove : function(btn) {
		if (btn == 'yes') {
			var grid = Ext.getCmp('notice-list');
        	var store = grid.getStore();
        	var sm = grid.getSelectionModel();
        	var recs = sm.getSelection();
        	var params = [];
        	for (var i=0;i < recs.length;i++) {
        		var r = recs[i];
        		params.push({noticeId : r.getData().noticeId});
        	}
        	
        	var url = G_PATH + '/notice/remove.json';
	    	Ext.Ajax.request({
		        url: url,
		        method: 'POST',
		        jsonData: Ext.encode(params),
		        success: function(response){
			    	var result = JSON.parse(response.responseText);
			    	if (result.error != null) {
		    			Ext.Msg.alert('Exception', result.error.message);
		    		} else {
		    			Ext.Msg.alert('Complete', '삭제 완료되었습니다.');
		    		}
			    	store.load();
		        },
		        failure: function(){
		        	Ext.Msg.alert('Error', '공지 삭제 중 오류가 발생되었습니다.');
		        }
		    });
		}
	}
}