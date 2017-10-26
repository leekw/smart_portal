Ext.define('Ext.nlayout.view.FileGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.filegrid',
    id : 'main-file-grid',
    border: false,
    maxHeight : 150,
    minHeight : 150,
    initComponent: function() {
    	
    	this.store = Ext.create('Ext.nlayout.store.File');

        this.columns = [
        new Ext.grid.RowNumberer({
        	header : 'no',
        	width: 40
        }),
        { 
            header: '파일 명',
            dataIndex: 'fileName',
            width: 100,
            flex:1
        }, { 
            header: '파일 사이즈',
            dataIndex: 'fileSize',
            width: 150
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
        
        this.tbar = [];
        
        this.callParent(arguments);
    },
    listeners : {
    	afterrender : function() {
    		var grid = Ext.getCmp('main-file-grid');
//    		var window = Ext.getCmp('main-upload-info');
//    		window.setTitle(M_TITLE + '메뉴의 파일 목록');
    		if (IMG_RESOURCE != null) {
        		var store = grid.getStore(); 
            	var proxy = store.getProxy();
            	proxy.extraParams.resourceId = IMG_RESOURCE;
            	store.load();
    		}
    	},
    	cellclick : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        	var grid = Ext.getCmp('main-file-grid');
        	if (grid.columns[cellIndex].dataIndex == 'fileDownd') {
        		var store = grid.getStore();
            	var sm = grid.getSelectionModel();
            	if (sm.getSelection() != null && sm.getSelection()[0] !=null) {
            		var data = sm.getSelection()[0].getData();
            		var iframe = Ext.getBody().createChild({
                		tag : 'iframe',
                		cls : 'x-hidden',
                		src : G_PATH + '/file/download.do?fileNo=' + encodeURIComponent(data.fileNo) + '&filePath=' + encodeURIComponent(data.filePath),
                		onload : 'Ext.getBody().unmask(); var t = Ext.get(this); t.remove.defer(1000, t);'
                	});
            		
            	}
        	}
        }
    }
});    
