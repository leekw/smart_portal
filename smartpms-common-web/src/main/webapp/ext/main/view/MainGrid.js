var timer;
Ext.define('Ext.main.view.MainGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.maingrid',
    plugins: 'gridfilters',
    autoScroll: true,
    id : 'main-grid',
    initComponent: function() {

        this.store = 'Main';    
        
        Ext.define('autoRefreshCombo', {
		    extend: 'Ext.data.Model',
		    fields: [
		        'label',
		        'value'
		    ]
		});
		var comboData = Ext.create('Ext.data.Store', {
			fields : ['label','value'],
			model : 'autoRefreshCombo',
			data : [
				{'label':'사용안함', 'value':''},
				{'label':'30초', 'value':'0.5'},
				{'label':'1분', 'value':'1'},
				{'label':'2분', 'value':'2'},
				{'label':'3분', 'value':'3'},
				{'label':'4분', 'value':'4'},
				{'label':'5분', 'value':'5'},
				{'label':'6분', 'value':'6'},
				{'label':'7분', 'value':'7'},
				{'label':'8분', 'value':'8'},
				{'label':'9분', 'value':'9'},
				{'label':'10분', 'value':'10'}
			],
			autoLoad : false
		});
        
        this.columns = [{
            header: 'no',
            dataIndex: 'rowIndex',
            sortable: false,
            align : 'right',
            width: 50,
            renderer: function(value, metaData, record, rowIndex) {
            	return rowIndex+1;
            }
        },{ 
            header: 'JIRA ID',
            dataIndex: 'jiraId',
            id: 'jiraId',
            width: 110
        },{
            header: '작업 ID',
            dataIndex: 'jobId',
            width: 110
        }, { 
            header: '작업단계',
            dataIndex: 'yCategory',
            width: 150
        },{ 
            header: 'Task',
            dataIndex: 'task',
            width: 200
        },{ 
            header: '작업실행팀',
            dataIndex: 'jobExecutionTeam',
            width: 100,
            filter: {
            	type: 'list'
            }
        },{ 
            header: '작업실행자',
            dataIndex: 'jobExecutor',
            width: 180,
            filter: {
            	type: 'string'
            }
        },{ 
            header: '진행상태',
            dataIndex: 'jiraStatusDesc',
            align:'center',
            width: 80,
            filter: {
            	type: 'list'
            }
        },{ 
            header: '선행작업 Task',
            dataIndex: 'preJob',
            width: 100
        },{ 
            header: '예정시작일시',
            dataIndex: 'startExpectDate',
            width: 100,
            renderer : function(value) {
            	if (value == null || value == "") return value;
            	return value.substring(5, value.length-3);
            }
        },{ 
            header: '예정종료일시',
            dataIndex: 'endExpectDate',
            width: 100,
            filter: {
            	type: 'date'
            },
            renderer : function(value) {
            	if (value == null || value == "") return value;
            	return value.substring(5, value.length-3);
            }
        },{ 
            header: '시간/분',
            dataIndex: 'duration',
            align:'center',
            width: 80,
            renderer : function(value) {
            	if (value == null || value == "") return value;
            	var hours = Math.floor( value / 60 );
				var minutes = value % 60;
				return hours + "시  " + minutes + "분";
            }
        },{ 
            header: '작업확인자',
            dataIndex: 'supervisor',
            width: 120
        },{ 
            header: '중분류',
            dataIndex: 'xCategory',
            width: 100
        },{ 
            header: '주요 Activity',
            dataIndex: 'activity',
            width: 200
        },{ 
            header: '시스템/모듈',
            dataIndex: 'systemType',
            width: 110,
            filter: {
            	type: 'list'
            }
        }];
        
        this.tbar = [{
            fieldLabel: '시나리오 구분',
            name: 'cutoverTh',
            xtype: 'maincombobox',
            id : 'main-combo',
            labelWidth: 90,
            hidden: true,
            allowBlank: false
        },{
            fieldLabel: '전환단계',
            name: 'jobStep',
            xtype: 'transitioncombobox',
            id : 'transition-combo',
            labelWidth: 90,
            hidden: true,
            allowBlank: false
        },{
		    fieldLabel: '자동새로고침',
		    name: 'autoRefresh',
		    id: 'autoRefresh',
		    xtype: 'combobox',
		    store: comboData,
		    displayField : 'label',
		    valueField : 'value',
		    queryMode: 'local',
		    autoSelect: false,
		    readOnly : parent.G_IS_HADNS == "Y" ? false : true,
		    listeners: {
		    	afterrender : function() {
		    		var combo = Ext.getCmp('autoRefresh');
		    		combo.setValue('');
		    	},
		    	change: function( combo, newValue, oldValue, eOpts ) {
		    		clearInterval(timer);
		    		if (newValue != "") {
			    		timer = window.setInterval(AutoReload._reload, 1000 * 60 * newValue);
		    		}
		    	}
		    }
		},{
            text: 'Reload',
            action:'reload-grid-record'
        },{
            text: 'Jira Dashboard',
            action:'open-jira-dashboard'
        },{
            text: 'JIRA Sync',
            id: 'jira-sync',
            hidden: true,
            action:'sync-jira'
        }];
        
        this.callParent(arguments);
    },
    listeners : {
    	resize : function (self, width, height) {
    		this.setMaxHeight(Ext.getCmp('main-acc').getHeight() - 130);
    	}
    }
});

var AutoReload = {
	_reload : function() {
		var iframe = document.getElementById("cutover-iframe").contentWindow;
    	var filterType = null;
    	var grid = Ext.getCmp('main-grid');
    	var store = grid.getStore(); 
    	var proxy = store.getProxy();
    	var combobox = Ext.getCmp('main-combo');
    	var transition = Ext.getCmp('transition-combo');
    	var param = combobox.getValue() == null ? proxy.extraParams.cutoverTh : combobox.getValue(); 
    	proxy.extraParams.cutoverTh = param;
    	proxy.extraParams.filterType = null;
    	var jobStep = null;
    	if (transition.getValue() != null) {
    		jobStep = transition.getValue();
    		proxy.extraParams.jobStep = jobStep;
    	}
    	proxy.extraParams.filterType = iframe._type;
    	store.load();
    	iframe.dataReload(param, "N", jobStep);
	}	
}
