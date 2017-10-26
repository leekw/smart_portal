Ext.define('Ext.stabilizationm.view.HelfGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.helfgrid', 
    minHeight: 100,
    initComponent: function() {
    	
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 2,
            autoCancel: false,
            pluginId: 'rowEditing'
        });
    	
        this.store = 'Helf';
        
        this.plugins = [rowEditing];
       
        this.columns = [{
		    header: '대기',
		    dataIndex: 'data1',
		    width: 80,
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
		},
		{
		    header: '1선',
		    dataIndex: 'data2',
		    width: 80,
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
		    width: 80,
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
		    width: 80,
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
		},
        {
		    header: '조치완료',
		    dataIndex: 'data5',
		    width: 100,
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
		    flex:1,
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
        
        this.tbar = [
			{
				xtype : 'label',
				width : '100%',
				html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800 !important"><i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;Help Desk 현황(누적)</span></div>'
					  + (G_IS_HADNS == 'Y' ? '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._add(\'helf-grid\')"><i class="x-fa fa-plus" style="padding-right:5px;"></i></span>'
					  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._remove(\'helf-grid\')"><i class="x-fa fa-trash" style="padding-right:5px;"></i></span>'
					  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._saveGrid(\'helf-grid\')"><i class="x-fa fa-save" style="padding-right:5px;"></i></span></div>'
					  : '')
					  + '</div>'
			 }
        ];
        
        this.callParent(arguments);
    },
    tools: [
           
    ],
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
