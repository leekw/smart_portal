Ext.define('Ext.program.view.SourceProgramGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.sourceprogramgrid',
    autoScroll: true,
    background: 'none',
    border: false,
    id : 'source-program-grid',
    minHeight : 800,
    maxHeight : 800,
    initComponent: function() {
    	
        this.selModel = {
            selType: 'checkboxmodel'
        };

        this.store = 'SourceProgramListJira';
        
        this.plugins = [];
        
        this.columns = [
        { 
            header: 'Task',
            dataIndex: 'task',
            width: 150
        },
        { 
            header: 'Program명(영문)',
            dataIndex: 'programId',
            width: 200
        },
        { 
            header: 'Program(한글)',
            dataIndex: 'programName',
            width: 200
        },
        { 
            header: '인터페이스ID',
            dataIndex: 'interfaceId',
            width: 150
        },
        { 
            header: '대분류',
            dataIndex: 'programType',
            width: 100,
            align:'center'
        },
        { 
            header: '소분류',
            dataIndex: 'programSmallType',
            width: 100,
            align:'center'
        },
        { 
            header: '개발자',
            dataIndex: 'developer',
            width: 120
        },
        { 
            header: '시작일자',
            dataIndex: 'startDateStr',
            width: 120,
            align:'center'
        },
        { 
            header: '완료일자',
            dataIndex: 'dueDateStr',
            width: 120,
            align:'center'
        },
        { 
            header: 'Phase',
            dataIndex: 'phase',
            width: 100,
            align:'center'
        },
        { 
            header: 'Iteration',
            dataIndex: 'iteration',
            width: 100,
            align:'center'
        },
        { 
            header: 'SR 여부',
            dataIndex: 'srFlag',
            width: 100,
            align:'center'
        },
        { 
            header: '팀',
            dataIndex: 'team',
            width: 100,
            align:'center'
        },
        { 
            header: '모듈',
            dataIndex: 'module',
            width: 100,
            align:'center'
        },
        { 
            header: '서브모듈',
            dataIndex: 'sumModule',
            width: 100,
            align:'center'
        },
        { 
            header: '완료율',
            dataIndex: 'doneRatio',
            width: 60,
            align:'center'
        },
        { 
            header: '사용여부',
            dataIndex: 'useFlag',
            width: 80,
            align:'center',
            renderer : function(value) {
            	return value == 'DIH IF' || value == '미사용' ? '미사용 ' : '사용';
            }
        }
		];
        
        this.bbar = this.paging= Ext.create('Ext.toolbar.Paging',
		{
			store : this.store,
			displayInfo: true
		});
        
        this.dockedItems = [{
        	xtype : 'toolbar',
        	dock : 'top',
        	items :[
				{
				    name: 'team',
				    xtype: Org._getOrgCombo('TEAM', '팀', false, 'team-param', {labelWidth:50, labelAlign : 'right', width: '25%'}, ComboAction._module),
				    allowBlank: false
				},
				{
				    name: 'module',
				    xtype: Org._getOrgCombo('MODULE', '모듈', false, 'module-param', {labelWidth:50, labelAlign : 'right', width: '25%'}),
				    allowBlank: false
				},
				{
			    	xtype : 'datefield',
			    	id : 'startDateStr-param',
			    	fieldLabel : '개발기간',
			    	labelAlign : 'right',
			    	format : 'Y-m-d',
			    	labelWidth : 60,
			    	value : new Date(2015, 0, 1),
			    	width : 200
			     },{
			    	xtype : 'datefield',
			    	format : 'Y-m-d',
			    	id : 'dueDateStr-param',
			    	value : new Date(),
			    	width : 160
			     }
				
        	]
        }];
        
        this.tbar = [
			{
			    name: 'iteration',
			    xtype: CommonCode._getCombo('ITER', 'Iteration', false, 'iteration-param', {labelWidth:50, labelAlign : 'right', width: '25%'}),
			    allowBlank: false
			},
			{
			    name: 'phase',
			    xtype:  CommonCode._getCombo('PA_TYPE', 'Phase', false, 'phase-param', {labelWidth:50, labelAlign : 'right', width: '25%'}),
			    allowBlank: false
			},
			{
	        	   xtype : 'checkbox',
	        	   id : 'done-param',
	        	   name : 'doneParam',
	        	   labelWidth : 150,
	        	   width:180,
	        	   fieldLabel : '완료된 프로그램 제외',
	        	   value : true
	           },{
	        	   text: '조회',
	               ui : 'gray',
	               handler : function() {
	            	    var grid = Ext.getCmp('source-program-grid');
		           		var store = grid.getStore();
		           		var proxy = store.getProxy();
		           		var team = Ext.getCmp('team-param');
		           		var module = Ext.getCmp('module-param');
		           		var iteration = Ext.getCmp('iteration-param');
		           		var phase = Ext.getCmp('phase-param');
		           		var done = Ext.getCmp('done-param');
		           		var start = Ext.getCmp('startDateStr-param');
		           		var end = Ext.getCmp('dueDateStr-param');
		           		if (team.getValue() == null || team.getValue() == '') {
		           			Ext.Msg.alert('Info', '팀은 필수 입니다.');
		            		return ;
		           		}
		           		if (start.getValue() == null || start.getValue() == '') {
		           			Ext.Msg.alert('Info', '조회 시작일자는 필수 입니다.');
		            		return ;
		           		}
		           		if (end.getValue() == null || end.getValue() == '') {
		           			Ext.Msg.alert('Info', '조회 종료일자는 필수 입니다.');
		            		return ;
		           		}
		           		proxy.extraParams.team = team.getValue();
		           		if (module.getValue() != null && module.getValue() != '') {
		           			proxy.extraParams.module = module.getValue();
		           		} else {
		           			proxy.extraParams.module = null
		           		}
		           		if (iteration.getValue() != null && iteration.getValue() != '') {
		           			proxy.extraParams.iteration = iteration.getValue();
		           		} else {
		           			proxy.extraParams.iteration = null;
		           		}
		           		if (phase.getValue() != null && phase.getValue() != '') {
		           			proxy.extraParams.phase = phase.getValue();
		           		} else {
		           			proxy.extraParams.phase = null;
		           		}
		           		
		           		proxy.extraParams.startDateStr = DateUtil._formatDateYmd(start.getValue(), 0);
		           		proxy.extraParams.dueDateStr = DateUtil._formatDateYmd(end.getValue(), 0);
		           		proxy.extraParams.doneParam = done.getValue();
		           		store.load();
	               }
	           }
        ];
        
        this.callParent(arguments);
    },
    listeners : {
    	resize : function (self, width, height) {
    		
    	}
    }
});
var ComboAction = {
	_module : function(parent) {
		var combo = Ext.getCmp('module-param');
		var store = combo.getStore();
		var proxy = store.getProxy();
		proxy.extraParams.parentOrgId = parent;
		proxy.extraParams.orgDiv = 'MODULE'
		store.load();
	}
};