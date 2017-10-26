Ext.define('Ext.quality.view.DeveloperRankGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.developerrankgrid',
    autoScroll: true,
    background: 'none',
    border: false,
    id : 'developer-rank-grid',
    minHeight : 650,
    maxHeight : 650,
    initComponent: function() {

        this.store = 'DeveloperRank';
        
        this.plugins = ['gridfilters'];
        
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
	            	var grid2 = Ext.getCmp('developer-win-grid');
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
	               	
	               	var grid3 = Ext.getCmp('developer-rank-grid');
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
        new Ext.grid.RowNumberer({
			header : '순위',
			width: 70
		}),
		{ 
            header: '개발자',
            dataIndex: 'developer',
            width: 120,
            flex:1,
            align:'center',
            filter: {
            	type: 'string'
            }
        },{ 
            header: '물량비율(%)',
            dataIndex: 'adjtRatio',
            tooltip : '팀 또는 모듈의 전체 물량 중 개발자에게 할당된 개발물량비율',
            width: 100,
            flex:1,
            align:'center',
            renderer : function(value) {
            	return value.toFixed(2);
            }
        },{ 
            header: '변동소스',
            dataIndex: 'changeFile',
            tooltip : '금일변동 소스',
            width: 100,
            flex:1,
            align:'center'
        },{ 
            header: '종합점수',
            dataIndex: 'totalScore',
            tooltip : '개발자 단위의 품질 산정 종합점수 * 물량비율의 결과(팀 또는 모듚의 전체에서 개발자가 부여받은 점수)',
            width: 100,
            flex:1,
            align:'center',
            renderer : function(value) {
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:black;font-weight:'+ temp2 + '">' + value.toFixed(2) + '</span>';
            }
        },
        { 
            header: '품질추이',
            dataIndex: 'verifyHistorys',
            tooltip : '개발자별 순위 추이 - 품질추이',
            width: 100,
            flex:1,
            align:'center',
            xtype : 'widgetcolumn',
            widget : {
            	xtype : 'sparklineline',
            	topTpl: 'Value: '
            }
        },
        { 
            header: '생산추이-소스',
            dataIndex: 'sourceHistorys',
            tooltip : '개발자별 소스 생산 추이',
            width: 120,
            flex:1,
            align:'center',
            xtype : 'widgetcolumn',
            widget : {
            	xtype : 'sparklineline',
            	topTpl: 'Value: '
            }
        },
        { 
            header: '산정 점수<br>(100점 기준)',
            dataIndex: 'verifyScore',
            width: 150,
            flex:1,
            hidden:true,
            align:'center'
        }];
        
        
        this.tbar = [
          {
        	  xtype : 'label',
        	  width : '100%',
        	  id : 'rank-title',
        	  html : '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;개발자 전체 순위</span></div>'
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

