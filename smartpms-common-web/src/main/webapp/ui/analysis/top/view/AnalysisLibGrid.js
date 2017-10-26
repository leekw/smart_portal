Ext.define('Ui.analysis.top.view.AnalysisLibGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.analysislibgrid',    
    title: 'Library - Top 10 취약점 (누적기준)',
    background: 'none',
    layout: 'fit',
    minHeight : 400,
    maxHeight : 500,
    columnLines : true,
    initComponent: function() {
    	
        this.store = 'AnalysisLib';
        
        this.selModel = {
        };
       
        this.columns = [
        { 
            header: '서비스',
            dataIndex: 'serviceName'
        },
        { 
            header: 'Repo명',
            dataIndex: 'repoName'
        },
        { 
            header: '대상명',
            align:'center',
            dataIndex: 'targerName'
        },
        { 
            header: '팀명',
            align:'center',
            dataIndex: 'teamName'
        },
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