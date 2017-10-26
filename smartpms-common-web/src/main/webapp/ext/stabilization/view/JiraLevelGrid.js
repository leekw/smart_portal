Ext.define('Ext.stabilization.view.JiraLevelGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.jiralevelgrid',
    minHeight: 275 ,
    maxHeight: 275 ,
    border: false,
    autoScroll:true,
    initComponent: function() {
    	
        this.store = 'JiraLevel';
        
        this.features = [{
        	ftype: 'groupingsummary',
        	id : 'group',
        	groupHeaderTpl: '{name}',
        	hideGroupHeader: true,
        	enbaleGroupingMenu: false
        }];
       
        this.columns = [
            {
	            header: '구분',
	            width: 120,
	            dataIndex: 'day',
	            summaryType : function(records) {
	            	var group = records[0].get("day");
	            	return group == '01.total' ? '누적합계' : group + '합계';
	            },
	            renderer : function(value) {
	            	return value == '01.total' ? '누적' : value;
	            },
	            summaryRenderer : function(value, summaryData, dataIndex) {
	            	return value;
	            },
			    autoSizeColumn: true
	        },{
	            header: '유형',
	            flex:1,
	            dataIndex: 'channel',
			    autoSizeColumn: true
	        }, { 
	            header: '처리중',
	            dataIndex: 'data1',
	            align : 'center',
	            width: 120,
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
	            width: 120,
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
	            width: 120,
	            renderer : function(value) {
	            	if(value == null)
	            		return value;
	            	else 
	            		return Ext.util.Format.number(value,'0,000');
	            },
	            summaryType : 'sum',
			    autoSizeColumn: true
	        }];
        
        this.tbar = [
         			{
         				xtype : 'label',
         				width : '100%',
         				html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800 !important;"><span style="cursor:pointer;cursor:hand;" onclick="ViewInfo._changeChart(3)"><i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;JIRA Defect 현황(누적)</span></span></div>'
         					  + '</div>'
         			 }
                 ];
        
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
    	}
    } 
});    
