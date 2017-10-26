Ext.define('Ext.ncutover.view.DashboardGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.dashboardgrid',
    minHeight: 280,
    initComponent: function() {
    	
    	
        this.store = 'CutoverMain';
        
        this.plugins = ['gridfilters'];
        
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'no',
			width: 40
		}), { 
            header: 'Jira ID',
            dataIndex: 'jiraId',
            align:'center',
            width: 80,
            renderer : function(v, meta, rec) {
            	if (rec.get("caution") != null && rec.get("caution") == 'O') {
            		meta.tdCls = 'grid-delay';
            	}
            	
            	return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;">' + v + '</span>';
            }
        }, { 
            header: 'Task',
            dataIndex: 'task',
            flex :1
        }, { 
            header: '진행상태',
            dataIndex: 'jiraStatus',
            width: 80,
            renderer : function(v, meta) {
            	if (v == '시작지연' || v == '종료지연') {
            		meta.tdCls = 'grid-delay';
            	} else if (v == '작업대기') {
            		meta.tdCls = 'grid-workreay';
            	} else if (v == '작업진행중') {
            		meta.tdCls = 'grid-working';
            	} else if (v == '작업완료') {
            		meta.tdCls = 'grid-complete';
            	} else if (v == '힐당대기') {
            		meta.tdCls = 'grid-assignreay';
            	}
            	
            	return v;
            }
        }, { 
            header: '작업실행팀',
            dataIndex: 'jobExecutionTeam',
            width: 130,
            filter: {
            	type: 'list'
            }
        }, { 
            header: '작업기간',
            dataIndex: 'taskDate',
            width: 250
        }
        ];
        
        this.callParent(arguments);
    }
});    
