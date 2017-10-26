Ext.define('Ext.portal.view.HelfGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.helfgrid', 
    id : 'helf-grid',
    maxHeight: 150,
    initComponent: function() {
    	
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            pluginId: 'rowEditing'
        });
    	
        this.store = 'Helf';
        
        this.plugins = [rowEditing];
       
        this.columns = [{
		    header: '대기',
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
		},{
        	header : '처리중',
        	columns : [
			{
			    header: '1선',
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
			    header: '1.5선',
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
			}, { 
			    header: '2선',
			    dataIndex: 'data4',
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
        },
        {
		    header: '조치완료',
		    dataIndex: 'data5',
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
		},{
		    header: '종료',
		    dataIndex: 'data6',
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
        ];
        
        this.tbar = [{
            text: 'Add',
            action: 'add-helf-record',
            hidden : G_IS_HADNS == "Y" ? false : true
        },{
            itemId: 'removeHelf',
            text: 'Remove',
            action: 'remove-helf-record',
            disabled: true,
            hidden : G_IS_HADNS == "Y" ? false : true
        },{
            text: 'Save',
            action:'save-helf-record',
            hidden : G_IS_HADNS == "Y" ? false : true
        },{
            text: 'Reload',
            action:'reload-helf-record'
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
