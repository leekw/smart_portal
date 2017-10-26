Ext.define('Ext.program.view.WBSCRForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.wbscrform',
    bodyPadding: 10,
    id : 'wbscr-form',
    defaults: {
        labelWidth: 120
    },
    border: false,
    defaultType: 'textfield',
    items: [
      {
	  xtype : 'fieldset',
	  title : 'WBS-CR 요청 정보',
	  margin : 1,
	  layout : {
		  type: 'vbox',
	      align: 'stretch'
	  },
	  defaults : {
		labelWidth : 70,
		labelAlign : 'right'
	  },
	  items : [
	     {
	    	xtype : 'textfield',
	    	fieldLabel : '제목',
	    	name : 'jiraSummary',
	    	width : '48%'
	     },
	     {
	    	layout : {
				type: 'hbox',
			    align: 'stretch'
			}, 
			defaults : {
				labelWidth : 70,
				labelAlign : 'right'
			},
			bodyStyle : {
				'background-color' : '#f6f6f6'
			},
			border: false,
			items :[
			     {
			    	xtype : Org._getOrgCombo('TEAM', '팀', false, 'teamReq', {labelWidth:70, labelAlign : 'right', width: '30%'}, ComboAction._module),
			    	name : 'teamReq',
			    	readOnly : true,
			    	width : '30%'
			     },{
			    	xtype : Org._getOrgCombo('MODULE', '모듈', false, 'moduleReq', {labelWidth:70, labelAlign : 'right', width: '30%'}),
			    	name : 'moduleReq',
			    	width : '30%'
			     },{
			    	xtype : CommonCode._getCombo('12612', 'Component/s', true, 'jiraComponent', {labelWidth:100, labelAlign : 'right', width: '30%'}),
			    	name : 'jiraComponent',
			    	width : '30%'
			     }
			]
	     },
	     {
	    	xtype : 'textarea',
	    	fieldLabel : '요청내용',
	    	height: 180,
	    	id : 'jiraDescription',
	    	name : 'jiraDescription',
	    	width : '48%'
	     }
	    ]
      }
    ],
    buttons: [
           {
	        text:'CR 요청',
	        ui : 'gray',
	        handler : function() {
	        	Ext.getBody().mask("Processing...");
	        	var form = Ext.getCmp('wbscr-form');
	        	var formData = form.getForm().getValues();
	        	var targets = [];
	        	var grid = Ext.getCmp('program-grid');
	        	var store = grid.getStore();
	        	var records = store.getRange();
	        	var vaild = true;
	        	for (var i=0;i < records.length; i++) {
	        		var rec = records[i];
	        		targets.push(rec.getData());
	        	}
	        	var param = {
	        		targets : targets,
	        		jiraSummary : formData.jiraSummary,
	        		team : Ext.getCmp('teamReq').getValue(),
	        		module : Ext.getCmp('moduleReq').getValue(),
	        		jiraDescription : Ext.getCmp('jiraDescreiption').getValue(),
	        		componets : Ext.getCmp('jiraComponent').getValue()
	        	};
	        	
	        	Ext.Ajax.request({
	        	    url: G_PATH + '/changerequest/add.json',
	        	    method: 'POST',
	        	    jsonData: Ext.encode(param),
	        	    success: function(response){
	        	    	Ext.getBody().unmask();
	        	    	Ext.Msg.alert('Complete', 'WBS-CR 요청 완료되었습니다.');
	        	    },
	        	    failure: function(){
	        	    	Ext.getBody().unmask();
	        	    	Ext.Msg.alert('Error', 'WBS-CR 요청 중 오유가 발생되엇습니다.');
	        	    }
	        	});
	        }
	    },
	    {
	        text:'취소',
	        ui : 'gray',
	        handler : function() {
	        	var win = Ext.getCmp('wbscr-info');
	    	     if (win != null)
	    	    	 win.close();
	        }
	    }
    ],
    listeners : {
    }
});
