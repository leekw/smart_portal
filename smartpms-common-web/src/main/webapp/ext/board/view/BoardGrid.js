var _data;
Ext.define('Ext.board.view.BoardGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.boardgrid',    
    title : '상황 보고  목록',  
    padding:5,
    background: 'none',
    layout: 'fit',
    minHeight : 600,
    maxHeight : 700,
    initComponent: function() {
    	
    	
        this.store = 'Board';
        
        this.plugins = [
             {
            	ptype : 'rowexpander',
            	rowBodyTpl : new Ext.XTemplate(
            	   '<p><b>내용:</b> {boardDescription}</p>'
            	)
             }
        ];
       
        this.columns = [
        {
            header: '번호',
            dataIndex: 'boardId',
            width: 50,
            hidden:true
        },{
            header: '게시판ID',
            dataIndex: 'boardNo',
            width: 50,
            hidden: true
        }, { 
            header: '제목',
            dataIndex: 'boardTitle',
            renderer : function(v) {
            	return '<span style="text-decoration:underline;">' + v + '</span>'
            },
            flex:1
        }, { 
        	header: '팀',
            width: 150,
            align:'center',
            dataIndex: 'boardTeam'
        }, { 
        	header: '등록자',
            width: 200,
            align:'center',
            dataIndex: 'boardCreator'
        }, { 
            header: '생성일시',
            align:'center',
            dataIndex: 'boardCreateDate',
            width: 200
        }, { 
            header: '<span class="right-icon hot-icon x-fa fa-search"></span>',
            width: 80,
            align:'center',
            dataIndex : 'fileView',
            renderer : function(value) {
            	return '<span class="right-icon hot-icon x-fa fa-search"  style="cursor:pointer;cursor:hand;"></span>';
            }
        }
        ];
        
        this.tbar = [
        ];
        
        this.callParent(arguments);
    },
    tools:[{
        xtype: 'tool',                                    
        cls: 'x-fa fa-refresh dashboard-tools',
        tooltip: '새로고침',
        width: 20,
        height: 20,
        handler : function() {
        	var grid = Ext.getCmp('board-list');
        	var store = grid.getStore();
        	store.load();
        }
    },{
        xtype: 'tool',                                    
        cls: 'x-fa fa-plus dashboard-tools',
        tooltip: '게시글 등록',
        width: 20,
        height: 20,
        handler : function() {
        	var win = Ext.getCmp('board-win');
        	_data = null;
    		if (win == null) {
	    		win = Ext.create('Ext.window.Window', {
	    			id : 'board-win',
	        	    title: '게시글 등록/변경',
	        	    resizable : true,
	        	    autoScroll: true,
	        	    maximizable : true,
	        	    closeAction : 'hide',
	        	    modal: true,
	        	    height: '95%',
	        	    width: '95%',
	        	    layout: 'fit',
	        	    animateTarget:this,
	        	    items : [{
	    				id : 'board-form',
	    				xtype : 'boardform'
	        	    }],
	        	    listeners : {
	        	    	beforeshow : function() {
	        	    		var form = Ext.getCmp('board-form');
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
        tooltip: '게시글 수정',
        width: 20,
        height: 20,
        handler : function() {
        	var grid = Ext.getCmp('board-list');
        	var store = grid.getStore();
        	var sm = grid.getSelectionModel();
        	if (sm.getSelection() != null && sm.getSelection()[0] !=null) {
        		_data = sm.getSelection()[0];
        		var win = Ext.getCmp('board-win');
        		if (win == null) {
    	    		win = Ext.create('Ext.window.Window', {
    	    			id : 'board-win',
    	        	    title: '게시글 등록/변경',
    	        	    resizable : true,
    	        	    autoScroll: true,
    	        	    maximizable : true,
    	        	    closeAction : 'hide',
    	        	    modal: true,
    	        	    height: '95%',
    	        	    width: '95%',
    	        	    layout: 'fit',
    	        	    animateTarget:this,
    	        	    items : [{
    	    				id : 'board-form',
    	    				xtype : 'boardform'
    	        	    }],
    	    			listeners : {
    	    				beforeshow : function() {
    	    					var form = Ext.getCmp('board-form');
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
        tooltip: '게시글 샂제',
        width: 20,
        height: 20,
        handler : function() {
        	var grid = Ext.getCmp('board-list');
        	var store = grid.getStore();
        	var sm = grid.getSelectionModel();
        	var recs = sm.getSelection();
        	if (recs.length < 1) {
        		Ext.Msg.alert('Info', '삭제 대상을 선택하십시오.');
        		return ;
        	}
        	Ext.MessageBox.confirm('Confirm', '선택한 게시글을 삭제하겠습니까(복구 불가)?', GridAction._remove);
        }
    }
    ]
});    
var GridAction = {
	_remove : function(btn) {
		if (btn == 'yes') {
			var grid = Ext.getCmp('board-list');
        	var store = grid.getStore();
        	var sm = grid.getSelectionModel();
        	var recs = sm.getSelection()[0];
        	var params = [];
        	params.push({boardNo : recs.getData().boardNo, boardId : recs.getData().boardId});
			var url = G_PATH + '/board/remove.json';
			Ext.Ajax.request({
	    	    url: url,
	    	    method: 'POST',
	    	    jsonData: Ext.encode(params),
	    	    success: function(response){
	    	    	var result = JSON.parse(response.responseText);
	    	    	if (result.error != null) {
	    				Ext.Msg.alert('Exception', result.error.message);
	    			} else {
	    				Ext.Msg.alert('Compete', '삭제 완료되었습니다.');
	        	    	store.load();
	    			}
	    	    },
	    	    failure: function(){
	    	    	Ext.Msg.alert('Error', '삭제 중 오류가 발생되었습니다.');
	    	    }
	    	});
		}
	}
}