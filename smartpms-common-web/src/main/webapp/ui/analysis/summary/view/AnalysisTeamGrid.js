Ext.define('Ui.analysis.summary.view.AnalysisTeamGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.analysisteamgrid',
    id :'analysis-team-grid',    
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
            header: '부서',
            dataIndex: 'team',
            align :'center'
        },
        { 
            header: '서비스',
            dataIndex: 'serviceName'
        },
        { 
            header: '담당자',
            dataIndex: 'manager',
            align :'center'
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