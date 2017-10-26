Ext.define('Ext.menu.view.FileGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.filegrid',
    id : 'menu-file-grid',
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
            ui : 'soft-red',
            handler : function() {
            	var grid = Ext.getCmp('menu-file-grid');
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
            				
            			}
            	    },
            	    failure: function(){
            	    	Ext.Msg.alert('Error', '삭제 중 오류가 발생되었습니다.');
            	    }
            	});
            }
        }];
        
        this.callParent(arguments);
    },
    listeners : {
    	afterrender : function() {
    		var formData = Ext.getCmp('menu-form').getForm().getValues();
    		var resourceId = formData.resourceId;
    		if (resourceId != null) {
        		var grid = Ext.getCmp('menu-file-grid');
        		var store = grid.getStore(); 
            	var proxy = store.getProxy();
            	proxy.extraParams.resourceId = resourceId;
            	store.load();
    		}
    	}
    }
});    
