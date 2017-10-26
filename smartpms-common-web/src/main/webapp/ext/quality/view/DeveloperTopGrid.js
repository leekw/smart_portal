Ext.define('Ext.quality.view.DeveloperTopGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.developertopgrid',
    autoScroll: true,
    background: 'none',
    border: false,
    id : 'developer-top-grid',
    minHeight : 350,
    maxHeight : 350,
    initComponent: function() {

        this.store = 'DeveloperTop';
        
        this.plugins = [];
        
        this.selModel = {
            selType: 'checkboxmodel',
            listeners : {
	            select : function(check, record, index, eOpts ) {
	            	var team = null;
	        		var module = null;
	        		var func = null;
	        		var grid = Ext.getCmp('org-grid');
	        		var sm = grid.getSelectionModel();
	            	var rec = sm.getSelection()[0];
	            	if (rec) {
	            		team = rec.data.originalOrgName;
	            		var temp = Ext.getCmp('quality-summary-grid').getSelectionModel().getSelection()[0];
	            		if (temp) {
	            			module = temp.data.module;
	            			
	            			var temp2 = Ext.getCmp('quality-detail-grid').getSelectionModel().getSelection()[0];
	                		if (temp2) {
	                			func = temp.data.function;
	                		}
	            		} 
	            	}
	            	var grid2 = Ext.getCmp('developer-grid');
	    			var store2 = grid2.getStore();
	               	var proxy2 = store2.getProxy();
	               	proxy2.extraParams.team = team;
	               	if (module != null)
	               		proxy2.extraParams.module = module;
	               	else 
	               		proxy2.extraParams.module = null;
	               	
	               	if (func != null)
	               		proxy2.extraParams.function = func;
	               	else 
	               		proxy2.extraParams.function = null;
	               	
	               	var grid3 = Ext.getCmp('developer-top-grid');
	    		    var sm3 = grid3.getSelectionModel();
	    	        var rec3 = sm3.getSelection();
	    	        var data = new Array();
	    	        for (var i=0;i < rec3.length;i++) {
		    	    	data.push(rec3[i].data.developer);
		    	    }
	    	        
	    	        proxy2.extraParams.developerList = data;
	               	
	               	store2.load();
	               	
	             }
            }
        };
        
        this.columns = [		
        { 
            header: '개발자',
            dataIndex: 'developer',
            width: 120,
            flex:1,
            align:'center'
        },{ 
            header: '물량비율(%)',
            dataIndex: 'adjtRatio',
            tooltip : '팀 또는 모듈의 전체 물량 중 개발자에게 할당된 개밞물량비율',
            width: 100,
            flex:1,
            align:'center'
        },{ 
            header: '종합점수',
            tooltip : '개발자 단위의 품질 산정 종합점수 * 물량비율의 결과',
            dataIndex: 'totalScore',
            width: 100,
            flex:1,
            align:'center',
            renderer : function(value) {
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:black;font-weight:'+ temp2 + '">' + value + '</span>';
            }
        },{ 
            header: '산정 점수<br>(100점 기준)',
            dataIndex: 'verifyScore',
            width: 150,
            hidden:true,
            flex:1,
            align:'center'
        }];
        
        
        this.tbar = [
          {
        	  xtype : 'label',
        	  width : '100%',
        	  html : '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;검토 필요 개발자  TOP 10</span></div>'
        		    + '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="GridAction.allTopDeveloper()"><i class="x-fa fa-group" style="padding-right:5px;"></i></span><span style="cursor:pointer;cursor:hand;" onclick="GridAction.loadTopDeveloper()"><i class="x-fa fa-refresh" style="padding-right:5px;"></i></span>'
        		    + '</div>'
          }    
        ];
        
        this.callParent(arguments);
    },
    listeners : {
    	resize : function (self, width, height) {
    	}
    }
});
var _tm, _md, _fc;
var GridAction = {
	allTopDeveloper : function() {
		_tm = null;
		_md = null;
		_fc = null;
		var grid = Ext.getCmp('org-grid');
		var sm = grid.getSelectionModel();
    	var rec = sm.getSelection()[0];
    	if (rec) {
    		_tm = rec.data.originalOrgName;
    		var temp = Ext.getCmp('quality-summary-grid').getSelectionModel().getSelection()[0];
    		if (temp) {
    			_md = temp.data.module;
    			
    			var temp2 = Ext.getCmp('quality-detail-grid').getSelectionModel().getSelection()[0];
        		if (temp2) {
        			_fc = temp.data.function;
        		}
    		}
    	}
    	
    	var win = Ext.getCmp('developer-info');
		if (win == null) {
			win = Ext.create('Ext.window.Window', {
				id : 'developer-info',
	    	    title: '개발자 정보',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
//	    	    closeAction : 'hide',
	    	    layout: 'fit',
	    	    modal: true,
	    	    animateTarget:this,
	    	    padding : 10,
	    	    width : '90%',
	    	    height : '95%',
	    	    border:false,
	    	    items : [
	    	         {
	    	        	xtype : 'qualitywinpanel'
	    	        }
	    	    ],
	    	    listeners : {
        	    	beforeshow : function() {
        	    		var topGrid = Ext.getCmp('developer-rank-grid');
        	           	var topStore = topGrid.getStore();
        	           	var topProxy = topStore.getProxy();
        	           	topProxy.extraParams.team = _tm;
        	           	var topList = Ext.getCmp('top-list').getValue()["topList"] + "";
        	           	topProxy.extraParams.topList = topList.split(",") ;
        	           	topProxy.extraParams.module = _md;
        	           	topProxy.extraParams.function = _fc;
        	           	topProxy.extraParams.searchMode = 'ALL';
        	           	topStore.load();
        	           	
        	           	Ext.getCmp('developer-win-grid').getStore().removeAll();
        	    	}
	    	    }
			});
		}
		win.show();
	},
	loadTopDeveloper : function() {
		var team = null;
		var module = null;
		var func = null;
		var grid = Ext.getCmp('org-grid');
		var sm = grid.getSelectionModel();
    	var rec = sm.getSelection()[0];
    	if (rec) {
    		team = rec.data.originalOrgName;
    		var temp = Ext.getCmp('quality-summary-grid').getSelectionModel().getSelection()[0];
    		if (temp) {
    			module = temp.data.module;
    			
    			var temp2 = Ext.getCmp('quality-detail-grid').getSelectionModel().getSelection()[0];
        		if (temp2) {
        			func = temp.data.function;
        		}
    		}
    	}
    	var topGrid = Ext.getCmp('developer-top-grid');
       	var topStore = topGrid.getStore();
       	var topProxy = topStore.getProxy();
       	topProxy.extraParams.team = team;
       	var topList = Ext.getCmp('top-list').getValue()["topList"] + "";
       	topProxy.extraParams.topList = topList.split(",") ;
       	topProxy.extraParams.module = module;
       	topProxy.extraParams.function = func;
       	topProxy.extraParams.searchMode = null;
       	topStore.load();
	}
};
