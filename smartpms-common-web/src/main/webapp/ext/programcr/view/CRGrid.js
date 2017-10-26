Ext.define('Ext.programcr.view.CRGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.crgrid',
    autoScroll: true,
    background: 'none',
    border: false,
    id : 'cr-grid',
    minHeight : 790,
    maxHeight : 790,
    initComponent: function() {
    	
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            pluginId: 'rowEditing',
            listeners : {
            	beforeedit : function( editor, e, eOpts ) {
            		
            	},
            	canceledit : function( editor, context, eOpts ) {
            		
            	},
            	edit : function(editor, e) {
            		
            	}
            }
        });
    	

        this.selModel = {
            selType: 'checkboxmodel',
            mode : 'SINGLE',
            listeners : {
        		select : function(check, record, index, eOpts ) {
        			var grid = Ext.getCmp('program-grid');
        			var store = grid.getStore();
	               	var proxy = store.getProxy();
	               	proxy.extraParams.jiraId = record.data.jiraId;
	               	store.load();
        		}
            }
        };

        this.store = 'ChangeRequestJira';
        
        this.plugins = [];
        
        this.columns = [		
        { 
            header: 'JIRA ID',
            dataIndex: 'jiraId',
            width: 120
        },{ 
            header: '상태',
            dataIndex: 'jiraStatus',
            width: 100
        },
        { 
            header: 'WBS-CR 제목',
            dataIndex: 'jiraSummary',
            width: 200,
            flex:1
        },
        { 
            header: '요청일시',
            dataIndex: 'jiraCreateDate',
            width: 150
        },
        { 
            header: '현재작업자',
            dataIndex: 'jiraAssignee',
            width: 120,
            hidden :true
        },
		{ 
            header: '요청자',
            dataIndex: 'jiraReporter',
            width: 120
        }];
        
        
        this.dockedItems = [{
        	xtype : 'toolbar',
        	dock : 'top',
        	items :[
				{
				    name: 'team',
				    xtype: Org._getOrgCombo('TEAM', '팀', false, 'team-param', {labelWidth:50, labelAlign : 'right', width: 180}, ComboAction._module),
				    allowBlank: false
				},
				{
				    name: 'module',
				    xtype: Org._getOrgCombo('MODULE', '모듈', false, 'module-param', {labelWidth:100, labelAlign : 'right', width: 250}),
				    allowBlank: false
				}
        	]
        }];
        
        this.tbar = [
            {
			   xtype : 'textfield',
			   name : 'jiraId',
			   id : 'jiraId-param',
			   labelWidth : 50,
			   width: 180,
			   fieldLabel : 'JIRA ID'
			},{
			   xtype : 'textfield',
			   name : 'jiraSummary',
			   id : 'jiraSummary-param',
			   labelWidth : 100,
			   width: 250,
			   fieldLabel : 'WBS-CR 제목'
			},{
        	   text: '조회',
               ui : 'gray',
               handler : function() {
            	    var grid = Ext.getCmp('cr-grid');
	               	var store = grid.getStore();
	               	var proxy = store.getProxy();
	               	var jiraId = Ext.getCmp('jiraId-param');
	               	var jiraSummary = Ext.getCmp('jiraSummary-param');
	               	var team = Ext.getCmp('team-param');
	               	var module = Ext.getCmp('module-param');
	               	if (team.getValue() != null && team.getValue() != '') {
	               		proxy.extraParams.team = team.getValue()
	               	} else {
	               		proxy.extraParams.team = null;
	               	}
	               	if (module.getValue() != null && module.getValue() != '') {
	               		proxy.extraParams.module = module.getValue();
	               	} else {
	               		proxy.extraParams.module = null;
	               	}
	               	if (jiraId.getValue() != null && jiraId.getValue() != '') {
	               		proxy.extraParams.jiraId = jiraId.getValue();
	               	} else {
	               		proxy.extraParams.jiraId = null;
	               	}
	               	if (jiraSummary.getValue() != null && jiraSummary.getValue() != '') {
	               		proxy.extraParams.jiraSummary = jiraSummary.getValue();
	               	} else {
	               		proxy.extraParams.jiraSummary = null;
	               	}
	               	store.load();
               }
           },
           {
        	   text: '요청결과확인',
               ui : 'gray',
               handler : function() {
	        	    var win = Ext.getCmp('edit-info');
	           		if (win == null) {
	           			win = Ext.create('Ext.window.Window', {
	           				id : 'edit-info',
	           	    	    title: '요청결과 및 영향도 확인',
	           	    	    resizable : true,
	           	    	    autoScroll: true,
	           	    	    maximizable : true,
	           	    	    closeAction : 'hide',
	           	    	    layout: 'fit',
	           	    	    modal: true,
	           	    	    animateTarget:this,
	           	    	    padding : 10,
	           	    	    width : '90%',
	           	    	    height : '90%',
	           	    	    border:false,
	           	    	    items : [
	           	    	        
	           	    	    ]
	           			});
	           		}
	           		win.show();
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
