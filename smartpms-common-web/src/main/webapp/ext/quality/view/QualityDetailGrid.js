Ext.define('Ext.quality.view.QualityDetailGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.qualitydetailgrid',
    autoScroll: true,
    background: 'none',
    border: false,
    id : 'quality-detail-grid',
    minHeight : 350,
    maxHeight : 350,
    initComponent: function() {

        this.store = 'QualityDetail';
        
        this.plugins = [];
        
        this.selModel = {
            selType: 'checkboxmodel',
            mode : 'SINGLE',
            listeners : {
	            select : function(check, record, index, eOpts ) {
	             	var grid2 = Ext.getCmp('developer-grid');
	    			var store2 = grid2.getStore();
	               	var proxy2 = store2.getProxy();
	               	proxy2.extraParams.team = record.data.team;
	               	proxy2.extraParams.module = record.data.module;
	               	proxy2.extraParams.function = record.data.function;
	               	store2.load();
	               	
	               	var topGrid = Ext.getCmp('developer-top-grid');
	               	var topStore = topGrid.getStore();
	               	var topProxy = topStore.getProxy();
	               	var topList = Ext.getCmp('top-list').getValue()["topList"] + "";
	               	topProxy.extraParams.topList = topList.split(",") ;
	               	topProxy.extraParams.team = record.data.team;
	               	topProxy.extraParams.module = record.data.module;
	               	topProxy.extraParams.function = record.data.function;
	               	topStore.load();
	            }
            }
        };
        
        this.features = [{
        	ftype: 'groupingsummary',
        	id : 'group',
        	groupHeaderTpl: '{name}',
        	hideGroupHeader: false,
        	enbaleGroupingMenu: false
        }];
        
        
        this.columns = [
        { 
            header: '검토유형',
            dataIndex: 'verifyType',
            width: 150,
            align:'center',
            flex:1
        },
        { 
            header: 'UI',
            dataIndex: 'uiCount',
            width: 120,
            align:'center',
            renderer : function(value) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            }
        },
        { 
            header: 'ESB',
            dataIndex: 'esbCount',
            width: 120,
            align:'center',
            renderer : function(value) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            }
        },
        {
        	header : 'CoreBiz',
        	columns : [
				{ 
				    header: 'SO/JO',
				    dataIndex: 'sjCount',
				    width: 100,
				    align:'center',
				    renderer : function(value) {
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
		            }
				},{ 
				    header: 'BOC',
				    dataIndex: 'bocCount',
				    width: 100,
				    align:'center',
				    renderer : function(value) {
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
		            }
				},{ 
				    header: 'BO',
				    dataIndex: 'boCount',
				    width: 100,
				    align:'center',
				    renderer : function(value) {
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
		            }
				},{ 
				    header: 'DO',
				    dataIndex: 'doCount',
				    width: 100,
				    align:'center',
				    renderer : function(value) {
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
		            }
				},{ 
				    header: 'DTO',
				    dataIndex: 'dtoCount',
				    width: 100,
				    align:'center',
				    renderer : function(value) {
		            	var temp  = value >= 0 ? 'black' : 'red';
		            	var temp2 = value == 0 ? 'normal' : 'bold';
		            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
		            }
				}
        	]
        },
        { 
            header: 'ETC',
            dataIndex: 'etcCount',
            width: 120,
            align:'center',
            renderer : function(value) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            }
        },
        { 
            header: '합계',
            width: 120,
            dataIndex: 'totCount',
            align:'center',
            renderer : function(value) {
            	var temp  = value >= 0 ? 'black' : 'red';
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="cursor:pointer;cursor:hand;color:' + temp + ';font-weight:'+ temp2 + '">' + value + '</span>';
            }
        }
        ];
        
        
        this.tbar = [
        ];
        
        this.callParent(arguments);
    },
    listeners : {
    	resize : function (self, width, height) {
    	}
    }
});
