Ext.define('Ui.admin.menu.view.MenuServiceGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.menuservicegrid',
    id : 'menu-service-grid',
    minHeight: 610,
    border: false,
    maxHeight: 610,
    initComponent: function() {
    
    	
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            pluginId: 'rowEditing',
            listeners : {
            	edit : function(editor, e) {
            		var grid = Ext.getCmp('menu-service-grid');
            		var params, url;
            		if (e.record.data.resourceId == null || e.record.data.resourceId == '') {
	                	params = {resourceName: e.record.data.text, parentResourceId : e.record.data.parentResourceId, url: e.record.data.url, resourceTypeCode: 'CONTENT'};
	                	url = G_PATH + '/resource/add.json';
            		} else {
            			params = {resourceId : e.record.data.resourceId, resourceName: e.record.data.text, parentResourceId : e.record.data.parentResourceId, url: e.record.data.url, resourceTypeCode: 'CONTENT'};
	                	url = G_PATH + '/resource/content/modify.json';
            		}
        			Ext.Ajax.request({
	    	    	    url: url,
	    	    	    method: 'POST',
	    	    	    jsonData: Ext.encode(params),
	    	    	    success: function(response){
	    	    	    	var result = JSON.parse(response.responseText);
	    	    	    	if (result.error != null) {
	    	    				Ext.Msg.alert('Exception', result.error.message);
	    	    			} else {
	    	    				Ext.Msg.alert('Complete', '저장 되었습니다.');
	    	    				grid.getStore().load();
	    	    			}
	    	    	    },
	    	    	    failure: function(){
	    	    	    	Ext.Msg.alert('Error', '저장 중 오류가 발생되었습니다.');
	    	    	    }
	    	    	});
            	}
            }
    	});
    	this.plugins = [rowEditing];
    	
    	
        this.store = 'MenuService';
       
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'no',
			width: 40
		}),
		{ 
            header: '메뉴/화면 명',
            dataIndex: 'parentResourceName',
            width: 200
        },
		{ 
            header: '서비스 명',
            dataIndex: 'text',
            width: 300,
            editor: {
		        allowBlank: false
		    }
        }, { 
            header: 'URL',
            dataIndex: 'url',
            width: 200,
            flex:1,
            editor: {
		        allowBlank: false
		    }
        }
        ];
        
        this.tbar = [
              {
            	  xtype :'button',
            	  text : '추가',
            	  ui : 'soft-green',
            	  handler : function () {
            		  GridAction._addService();
            	  }
              },{
            	  xtype : 'button',
            	  text : '삭제',
            	  ui : 'soft-red',
            	  handler : function() {
            		  GridAction._removeSercie();
            	  }
              }
        ];
        
        this.callParent(arguments);
    }
});    
