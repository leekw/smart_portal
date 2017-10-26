var ComboAction = {
	_programSmallType : function(parent) {
		var combo = Ext.getCmp('programSmallType');
		var store = combo.getStore();
		var proxy = store.getProxy();
		proxy.extraParams.refValue1 = parent;
		store.load();
	},
	_module : function(parent) {
		var combo = Ext.getCmp('module');
		var store = combo.getStore();
		var proxy = store.getProxy();
		proxy.extraParams.parentOrgId = parent;
		proxy.extraParams.orgDiv = 'MODULE'
		store.load();
	}
};
var ValidAction = {
	_checkFileData : function(fullPath) {
		Ext.Msg.alert('Complete', '파일업로드가 완료되었습니다.파일 Parsing 및 검증을 시작합니다.');
		var grid = Ext.getCmp('cr-grid');
		var sm = grid.getSelectionModel();
    	var rec = sm.getSelection()[0];
    	
		Ext.getBody().mask("Processing...");
		 var param = {
        		jiraId : rec.data.jiraId,
        		targetFilePath : fullPath
        	};
        	
        	Ext.Ajax.request({
        	    url: G_PATH + '/changerequest/file/validate.json',
        	    method: 'POST',
        	    jsonData: Ext.encode(param),
        	    success: function(response){
        	    	var data = JSON.parse(response.responseText);
        	    	Ext.getBody().unmask();
        	    	if (data.error != null) {
        	    		Ext.Msg.alert('Error', '파일 Parsing 및 검증 중 오류가 발생되었습니다.');
        	    	} else {
        	    		Ext.Msg.alert('Complete', '파일 Parsing 및 검증 처리가 완료되었습니다.');
        	    		ValidAction._reload(rec.data.jiraId);
        	    	}
        	    },
        	    failure: function(){
        	    	Ext.getBody().unmask();
        	    	Ext.Msg.alert('Error', '파일 Parsing 및 검증 중 오류가 발생되었습니다.');
        	    }
        	});
	},
	_reload : function(jiraId) {
		var grid = Ext.getCmp('program-grid');
		var store = grid.getStore();
       	var proxy = store.getProxy();
       	proxy.extraParams.jiraId = jiraId;
       	store.load();
       	
       	var vgrid = Ext.getCmp('verify-grid');
       	var vstroe = vgrid.getStore();
       	var vproxy = vstroe.getProxy();
       	vproxy.extraParams.jiraId = jiraId;
       	vstroe.load();
       	
       	var param = {
       		jiraId : jiraId
       	};
       	Ext.Ajax.request({
    	    url: G_PATH + '/changerequest/summary/get.json',
    	    method: 'POST',
    	    jsonData: Ext.encode(param),
    	    success: function(response){
    	    	var temp = JSON.parse(response.responseText);
    	    	var data = temp.summarys;
    	    	if (data.length > 0) {
    	    		var newCount = 0;
    	    		var modCount = 0;
    	    		var delCount = 0;
        	    	for (var i =0;i < data.length; i++) {
        	    		if (data[i].crMode == 'I') newCount = data[i].count;
            			else if (data[i].crMode == 'M') modCount = data[i].count;
            			else if (data[i].crMode == 'D') delCount = data[i].count;
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
    	    	}
    	    },
    	    failure: function(){
    	    	
    	    }
    	});
	}
};
Ext.define('Ext.programvf.view.ProgramPanel', {
	extend: 'Ext.container.Container',
	alias : 'widget.programpanel',
	id : 'program-panel',
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	border: false,
	items : [
	   {
		   xtype : 'crpanel',
		   title : '진행중인 WBS-CR',
		   tools : [
		      {
		    	  xtype : 'tool',
		    	  cls : 'x-fa fa-upload dashboard-tools',
		    	  withd:20,
		    	  height:20,
		    	  handler : function() {
		    		  var grid = Ext.getCmp('cr-grid');
		    		  var sm = grid.getSelectionModel();
		    	      var rec = sm.getSelection()[0];
		    	      if (!rec) {
		    	    	  Ext.Msg.alert('Info', 'WBS-CR을 선택해야 합니다.');
		    	    	  return ;
		    	      } else if (sm.getSelection() > 1) {
		    	    	  Ext.Msg.alert('Info', 'WBS-CR은 하나만 선택해야 합니다.');
		    	    	  return ;
		    	      }
		    	    	
		    		  var win = Ext.getCmp('upload-info');
		           		if (win == null) {
		           			win = Ext.create('Ext.window.Window', {
		           				id : 'upload-info',
		           	    	    title: 'CR 대상 파일 업로드' ,
		           	    	    resizable : true,
		           	    	    autoScroll: true,
		           	    	    maximizable : true,
		           	    	    closeAction : 'hide',
		           	    	    layout: 'fit',
		           	    	    modal: true,
		           	    	    animateTarget:this,
		           	    	    padding : 10,
		           	    	    width : 150,
		           	    	    height : 150,
		           	    	    border:false,
		           	    	    items : [
									{
										xtype : 'form',
										labelWidth: 80,
										labelAlign: 'right',
										margin: '10 10 10 10',
										maxHeight : 50,
										bodyPadding: 10,
										border: false,
										items :[
											{
												xtype : 'filefield',
											    buttonOnly: true,
											    name: 'fileupload',
											    id : 'file-upload',
											    fileInputEl : {
											    	multiple: 'single'
											    },
											    anchor: '10%',
											    buttonText : '파일첨부',
											    listeners: {
											    	afterrender : function(object) {
											    		object.fileInputEl.set({multiple: 'single'});
											    	},
											    	change : function(object, value, eOpts) {
											    		var frm = object.up("form").getForm();
											    		if (frm.isValid()) {
											    			frm.submit({
											    				url : G_PATH + '/file/upload.file',
											    				success : function(ft, res) {
											    					var jsonResult = Ext.JSON.decode(res.response.responseText);
											    					win.close();
											    					ValidAction._checkFileData(jsonResult.success[0].filePath);
											    				},
											    				failure: function(ft, res){
											    					Ext.Msg.alert('Exception', result.error.message);
											    				}
											    			});
											    			
											    		}
											    	}
											    }
											}
										]
									}
		           	    	    ]
		           			});
		           		}
		           		win.show();
		    	  }
		      }
		   ],
		   responsiveCls: 'big-40 small-100'
	   }, 
	   {
		   xtype : 'tabpanel',
		   id : 'program-tab-panel',
		   border: false,
		   items : [
		      {
		    	title : '유효성 검증 결과',
		    	xtype : 'verifyresult',
		    	id : 'verify-tab',
		    	layout: 'responsivecolumn'
		      },
		      {
		    	title : '물량 현황',
		    	id : 'volume-tab',
		    	items : [
		    	   {
		    		   xtype : 'volumegrid'
		    	   }
		    	]
		      }
		   ],
		   responsiveCls: 'big-60 small-100'
	   }
	]
});
