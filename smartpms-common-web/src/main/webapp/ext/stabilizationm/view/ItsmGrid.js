Ext.define('Ext.stabilizationm.view.ItsmGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.itsmgrid',
    minHeight: 100 ,
    initComponent: function() {
    	
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            pluginId: 'rowEditing'
        });
    	
        this.store = 'Itsm';
        
        this.plugins = [rowEditing];
       
        this.columns = [
			{
			    header: 'WEB',
			    dataIndex: 'data1',
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
			}, { 
			    header: 'CTI',
			    dataIndex: 'data2',
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
			}, { 
			    header: '합계',
			    dataIndex: 'data3',
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
				html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800 !important"><i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;ITSM 현황</span></div>'
					  + (G_IS_HADNS == 'Y' ? '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._add(\'itsm-grid\')"><i class="x-fa fa-plus" style="padding-right:5px;"></i></span>'
					  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._remove(\'itsm-grid\')"><i class="x-fa fa-trash" style="padding-right:5px;"></i></span>'
					  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._saveGrid(\'itsm-grid\')"><i class="x-fa fa-save" style="padding-right:5px;"></i></span></div>'
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
