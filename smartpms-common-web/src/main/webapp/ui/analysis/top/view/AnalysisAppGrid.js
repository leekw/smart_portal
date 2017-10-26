Ext.define('Ui.analysis.top.view.AnalysisAppGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.analysisappgrid',    
    title: 'App - Top 10 취약점 (누적 기준)',
    background: 'none',
    layout: 'fit',
    minHeight : 400,
    maxHeight : 500,
    columnLines : true,
    initComponent: function() {
    	
        this.store = 'AnalysisApp';
        
        this.selModel = {
        };
       
        this.columns = [
        { 
            header: '취약점명',
            dataIndex: 'securityRule',
            flex:1
        },
        { 
            header: '발견수',
            align:'center',
            dataIndex: 'detectionCount'
        },
        { 
            header: '조치율(%)',
            align:'center',
            dataIndex: 'measureRatio'
        }
        
        ];
        
        this.tbar = [
        	
        ];
        
        this.callParent(arguments);
    },
    tools:[
    ],
    listeners : {
    	afterrender : function(panel) {
    	},
    	beforerender : function(panel) {
    		
    	}
    }
});