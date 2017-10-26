Ext.define('Ext.programvf.view.CRGrid' ,{
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
            listeners : {
        		select : function(check, record, index, eOpts ) {
        			var tab = Ext.getCmp('program-tab-panel');
        			if (tab.activeTab.id == 'verify-tab') {
        				var grid = Ext.getCmp('program-grid');
            			var store = grid.getStore();
    	               	var proxy = store.getProxy();
    	               	proxy.extraParams.jiraId = record.data.jiraId;
    	               	proxy.extraParams.logType = null;
    	               	store.load();
    	               	
    	               	var vgrid = Ext.getCmp('verify-grid');
    	               	var vstroe = vgrid.getStore();
    	               	var vproxy = vstroe.getProxy();
    	               	vproxy.extraParams.jiraId = record.data.jiraId;
    	               	vstroe.load();
    	               	
    	               	var param = {
    	               		jiraId : record.data.jiraId
    	               	};
    	               	Ext.Ajax.request({
    	            	    url: G_PATH + '/changerequest/summary/get.json',
    	            	    method: 'POST',
    	            	    jsonData: Ext.encode(param),
    	            	    success: function(response){
    	            	    	var temp = JSON.parse(response.responseText);
    	            	    	var data = temp.summarys;
    	            	    	var newCount = 0;
	            	    		var modCount = 0;
	            	    		var delCount = 0;
    	            	    	if (data.length > 0) {
    		            	    	for (var i =0;i < data.length; i++) {
    		            	    		if (data[i].crMode == 'I') newCount = data[i].count;
    		                			else if (data[i].crMode == 'M') modCount = data[i].count;
    		                			else if (data[i].crMode == 'D') delCount = data[i].count;
    		            	    	}
    	            	    	}
    	            	    	var ns = Ext.getCmp('dashboard-new');
		                		var ms = Ext.getCmp('dashboard-mod');
		                		var ds = Ext.getCmp('dashboard-del');
		                		
		                		ns.setData({
		                	        amount: newCount,
		                	        type: '신규',
		                	        icon: 'tasks',
		                	        color: '#458fd2'
		                	    });
		                		
		                		ms.setData({
		                	        amount: modCount,
		                	        type: '변경',
		                	        icon: 'edit',
		                	        color: '#ffc107'
		                	    });
		                		
		                		ds.setData({
		                	        amount: delCount,
		                	        type: '삭제',
		                	        icon: 'trash',
		                	        color: '#e91e63'
		                	    });
    	            	    },
    	            	    failure: function(){
    	            	    	
    	            	    }
    	            	});
        			} else {
        				var grid = Ext.getCmp('cr-grid');
  		    		    var sm = grid.getSelectionModel();
  		    	        var rec = sm.getSelection();
  		    	        var data = new Array();
			    	    if (!rec) {
			    	    	Ext.Msg.alert('Info', 'WBS-CR을 선택해야 합니다.');
			    	    	return ;
			    	    }
			    	    
			    	    for (var i=0;i < rec.length;i++) {
			    	    	data.push(rec[i].data.jiraId);
			    	    }
			    	    
			    	    
			    	    var vgrid = Ext.getCmp('volume-grid');
            			var vstore = vgrid.getStore();
    	               	var vproxy = vstore.getProxy();
    	               	vproxy.extraParams.jiraList = data;
    	               	vstore.load();
			    	    
        			}
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
        
        
//        this.dockedItems = [{
//        	xtype : 'toolbar',
//        	dock : 'top',
//        	items :[
//				{
//				    name: 'team',
//				    xtype: Org._getOrgCombo('TEAM', '팀', false, 'team-param', {labelWidth:50, labelAlign : 'right', width: 180}, ComboAction._module),
//				    allowBlank: false
//				},
//				{
//				    name: 'module',
//				    xtype: Org._getOrgCombo('MODULE', '모듈', false, 'module-param', {labelWidth:100, labelAlign : 'right', width: 250}),
//				    allowBlank: false
//				}
//        	]
//        }];
        
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
//	               	var team = Ext.getCmp('team-param');
////	               	var module = Ext.getCmp('module-param');
//	               	if (team.getValue() != null && team.getValue() != '') {
//	               		proxy.extraParams.team = team.getValue()
//	               	} else {
//	               		proxy.extraParams.team = null;
//	               	}
//	               	if (module.getValue() != null && module.getValue() != '') {
//	               		proxy.extraParams.module = module.getValue();
//	               	} else {
//	               		proxy.extraParams.module = null;
//	               	}
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
           }
        ];
        
        this.callParent(arguments);
    },
    listeners : {
    	resize : function (self, width, height) {
    	}
    }
});
