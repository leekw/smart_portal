Ext.define('Ext.portal.view.JiraChannelGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.jirachannelgrid',
    width:'100%',
    id : 'jirachannel-grid',
    maxHeight: 330 ,
    autoScroll: true,
    initComponent: function() {
    	
        this.store = 'JiraChannel';
        
        this.features = [{ftype: 'summary'}];
       
        this.columns = [{
        	header : 'Defect 상황 - 채널별',
        	columns :[
            {
	            header: '채널',
	            width: 120,
	            dataIndex: 'channel',
	            summaryType : 'count',
	            summaryRenderer : function(value, summaryData, dataIndex) {
	            	return "전체";
	            },
			    autoSizeColumn: true
	        }, { 
	            header : '1선',
	            columns : [{
	            	header: '처리',
	            	width: 45,
		            dataIndex: 'data1',
		            align : 'center',
		            renderer : function(value) {
		            	if(value == null)
		            		return value;
		            	else 
		            		return Ext.util.Format.number(value,'0,000');
		            },
		            summaryType : 'sum',
				    autoSizeColumn: true
	            },{
	            	header: '완료',
		            dataIndex: 'data2',
		            align : 'center',
		            width: 45,
		            renderer : function(value) {
		            	if(value == null)
		            		return value;
		            	else 
		            		return Ext.util.Format.number(value,'0,000');
		            },
		            summaryType : 'sum',
				    autoSizeColumn: true
	            }
	                       
	            ]
	        }, { 
	            header : '1.5선',
	            columns : [{
	            	header: '처리',
		            dataIndex: 'data3',
		            align : 'center',
		            width: 45,
		            renderer : function(value) {
		            	if(value == null)
		            		return value;
		            	else 
		            		return Ext.util.Format.number(value,'0,000');
		            },
		            summaryType : 'sum',
				    autoSizeColumn: true
	            },{
	            	header: '완료',
		            dataIndex: 'data4',
		            align : 'center',
		            width: 45,
		            renderer : function(value) {
		            	if(value == null)
		            		return value;
		            	else 
		            		return Ext.util.Format.number(value,'0,000');
		            },
		            summaryType : 'sum',
		            autoSizeColumn: true
	            }
	                       
	            ]
	        }, { 
	            header : '2선',
	            columns : [{
	            	header: '처리',
		            dataIndex: 'data5',
		            align : 'center',
		            width: 45,
		            renderer : function(value) {
		            	if(value == null)
		            		return value;
		            	else 
		            		return Ext.util.Format.number(value,'0,000');
		            },
		            summaryType : 'sum',
				    autoSizeColumn: true
	            },{
	            	header: '완료',
		            dataIndex: 'data6',
		            align : 'center',
		            width: 45,
		            renderer : function(value) {
		            	if(value == null)
		            		return value;
		            	else 
		            		return Ext.util.Format.number(value,'0,000');
		            },
		            summaryType : 'sum',
				    autoSizeColumn: true
	            }
	                       
	            ]
	        },{
            	header: '계',
            	dataIndex: 'target',
	            align : 'center',
	            width: 45,
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
            action:'reload-channel-record'
        }];
        
        this.callParent(arguments);
    },
    listeners : {
    	afterrender : function(g, etc) {
        	var temp = Ext.getCmp('jirachannel-grid').getStore();
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
//    			if (cols[i].autoSizeColumn == true) {
//    				cols[i].setWidth(colWidth);
//    			}
//    		}
    	}
    } 
});    
