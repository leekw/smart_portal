Ext.define('Ext.portal.view.ItsmGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.itsmgrid',
    id : 'itsm-grid',
    width:'100%',
    maxHeight: 150,
    initComponent: function() {
    	
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            pluginId: 'rowEditing'
        });
    	
        this.store = 'Itsm';
        
        this.plugins = [rowEditing];
       
        this.columns = [{
        	header : 'ITSM기준',
        	columns : [
			{
			    header: 'WEB',
			    dataIndex: 'data1',
			    width: 60,
			    editor: {
			        allowBlank: false
			    },
	            align : 'center',
	            renderer : function(value) {
	            	if(value == null)
	            		return value;
	            	else 
	            		return Ext.util.Format.number(value,'0,000');
	            },
			    autoSizeColumn: true
			}, { 
			    header: 'CTI',
			    dataIndex: 'data2',
			    width: 60,
			    editor: {
			        allowBlank: false
			    },
	            align : 'center',
	            renderer : function(value) {
	            	if(value == null)
	            		return value;
	            	else 
	            		return Ext.util.Format.number(value,'0,000');
	            },
			    autoSizeColumn: true
			}, { 
			    header: '합계',
			    dataIndex: 'data3',
			    width: 60,
			    editor: {
			        allowBlank: false
			    },
	            align : 'center',
	            renderer : function(value) {
	            	if(value == null)
	            		return value;
	            	else 
	            		return Ext.util.Format.number(value,'0,000');
	            },
			    autoSizeColumn: true
			}
			]
        }];
        
        this.tbar = [{
            text: 'Add',
            action: 'add-itsm-record',
            hidden : G_IS_HADNS == "Y" ? false : true
        },{
            itemId: 'removeItsm',
            text: 'Remove',
            action: 'remove-itsm-record',
            disabled: true,
            hidden : G_IS_HADNS == "Y" ? false : true
        },{
            text: 'Save',
            action:'save-itsm-record',
            hidden : G_IS_HADNS == "Y" ? false : true
        },{
            text: 'Reload',
            action:'reload-itsm-record'
        }];
        
        this.callParent(arguments);
    },
    listeners : {
    	resize : function (grid, width, height) {
//    		var cols = grid.columns;
//    		var length = cols.length;
//    		var colWidth = (width-5) / length;
//    		for (var i=0;i < length;i++) {
//    			if (cols[i].autoSizeColumn) {
//    				cols[i].setWidth(colWidth);
//    			}
//    		}
    	}
    }
});    
