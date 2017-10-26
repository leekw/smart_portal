Ext.define('Ui.analysis.summary.view.AnalysisManagerGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.analysismanagergrid',  
    id :'analysis-manager-grid', 
    background: 'none',
    layout: 'fit',
    minHeight : 600,
    maxHeight : 700,
    columnLines : true,
    initComponent: function() {
    	
        this.store = 'AnalysisResult';
        
        this.selModel = {
        };
       
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'No',
			width: 60,
			align :'center'
		}),
		{ 
            header: '담당자',
            align :'center',
            dataIndex: 'manager'
        },
        { 
            header: '서비스',
            dataIndex: 'serviceName'
        },
        { 
            header: 'Repo명',
            dataIndex: 'repoName'
        },
        { 
            header: 'File',
            dataIndex: 'file',
            flex:1
        },
        { 
            header: '상태',
            align :'center',
            dataIndex: 'statusName'
        },
        { 
            header: 'Jira#',
            align :'center',
            dataIndex: 'refKey'
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