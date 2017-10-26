Ext.define('Ext.board.view.FileGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.filegrid',
    id : 'file-grid',
    width: '98%',
    minHeight: 250,
    initComponent: function() {
    	
    	this.store = 'File';

        this.columns = [
        new Ext.grid.RowNumberer({
        	header : 'no',
        	width: 40
        }),
        { 
            header: '실제파일명',
            dataIndex: 'fileName',
            width: 100,
            flex:1
        },{
            header: '파일경로',
            dataIndex: 'filePath',
            width: 100,
        }, { 
            header: '파일사이즈',
            dataIndex: 'fileSize',
            width: 80
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
        
        this.tbar = [{
            text: '삭제',
            action: 'remove-file-record',
            ui : 'soft-red'
        }];
        
        this.callParent(arguments);
    },
    listeners : {
    	afterrender : function() {
    		var grid = Ext.getCmp('board-list');
        	var store = grid.getStore();
        	var sm = grid.getSelectionModel();
        	var recs = sm.getSelection()[0];
    		if (recs != null && recs.data.boardId != 0) {
        		var grid = Ext.getCmp('file-grid');
        		var store = grid.getStore(); 
            	var proxy = store.getProxy();
            	proxy.extraParams.boardId = recs.data.boardId;
            	proxy.extraParams.boardNo = recs.data.boardNo;
            	store.load();
    		}
    	}
    }
});    