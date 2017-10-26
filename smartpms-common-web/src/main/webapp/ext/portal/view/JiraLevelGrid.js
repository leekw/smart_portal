Ext.define('Ext.portal.view.JiraLevelGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.jiralevelgrid',
    width:'100%',
    id : 'jiralevel-grid',
    minHeight: 330 ,
    autoScroll:true,
    initComponent: function() {
    	
        this.store = 'JiraLevel';
        
        this.features = [{ftype: 'summary'}];
       
        this.columns = [{
        	header : 'Defect 상황 - Level별',
        	columns :[
            {
	            header: '유형',
	            width: 80,
	            dataIndex: 'channel',
	            summaryType : 'count',
	            summaryRenderer : function(value, summaryData, dataIndex) {
	            	return "전체";
	            },
			    autoSizeColumn: true
	        }, { 
	            header: '처리중',
	            dataIndex: 'data1',
	            align : 'center',
	            width: 50,
	            renderer : function(value) {
	            	if(value == null)
	            		return value;
	            	else 
	            		return Ext.util.Format.number(value,'0,000');
	            },
	            summaryType : 'sum',
			    autoSizeColumn: true
	        }, { 
	            header: '완료',
	            dataIndex: 'data2',
	            align : 'center',
	            width: 50,
	            renderer : function(value) {
	            	if(value == null)
	            		return value;
	            	else 
	            		return Ext.util.Format.number(value,'0,000');
	            },
	            summaryType : 'sum',
			    autoSizeColumn: true
	        }, { 
	            header: '합계',
	            dataIndex: 'data3',
	            align : 'center',
	            width: 50,
	            renderer : function(value) {
	            	if(value == null)
	            		return value;
	            	else 
	            		return Ext.util.Format.number(value,'0,000');
	            },
	            summaryType : 'sum',
			    autoSizeColumn: true
	        }]
        }];
        
        this.tbar = [{
            text: 'Reload',
            action:'reload-level-record'
        }];
        
        this.callParent(arguments);
    },
    listeners : {
    	afterrender : function(g, etc) {
        	var temp = Ext.getCmp('jiralevel-grid').getStore();
    	    var isDesktop = Ext.os.is.MacOS || Ext.os.is.Windows || Ext.os.is.Linux;
    	    
    	    temp.timer = setInterval(function () {
    	    	temp.load();
    	    }, Ext.isIE || !isDesktop ? 1000 *1*60 : 1000 *1* 60);
        	temp.load();
    	    
        },
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
