Ext.define('Ext.programcr.view.WBSCRForm' ,{
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
	    	xtype : 'textfield',
	    	name : 'jiraId',
	    	hidden:true
	     },
	     {
	    	xtype : 'textfield',
	    	name : 'team',
	    	hidden:true
	     },
	     {
	    	xtype : 'textfield',
	    	name : 'module',
	    	hidden:true
	     },
	     {
	    	xtype : 'textarea',
	    	fieldLabel : '요청내용',
	    	height: 180,
	    	id : 'jiraDescreiption',
	    	name : 'jiraDescreiption',
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
	        		jiraId : formData.jiraId,
	        		team : formData.team,
	        		module : formData.module,
	        		jiraSummary : formData.jiraSummary,
	        		jiraDescription : Ext.getCmp('jiraDescreiption').getValue()
	        	};
	        	
	        	Ext.Ajax.request({
	        	    url: G_PATH + '/changerequest/add.json',
	        	    method: 'POST',
	        	    jsonData: Ext.encode(param),
	        	    success: function(response){
	        	    	var data = JSON.parse(response.responseText);
	        	    	Ext.getBody().unmask();
	        	    	if (data.error != null) {
	        	    		Ext.Msg.alert('Error', 'WBS-CR 요청 중 오유가 발생되엇습니다.');
	        	    	} else {
	        	    		Ext.Msg.alert('Complete', 'WBS-CR 요청 완료되었습니다.');
	        	    	}
	        	    },
	        	    failure: function(){
	        	    	Ext.getBody().unmask();
	        	    	
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
