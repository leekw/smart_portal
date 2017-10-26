Ext.define('Ext.qualityhist.view.DeveloperRankGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.developerrankgrid',
    background: 'none',
    requires : [
         'Ext.grid.column.Action',
         'Ext.slider.Widget',
         'Ext.sparkline.*'
    ],
    border: false,
    id : 'developer-rank-grid',
    minHeight : 650,
    maxHeight : 650,
    columnLines : true,
    initComponent: function() {

        this.store = 'DeveloperRank';
        
        this.plugins = ['gridfilters'];
        
        this.selModel = {
            selType: 'checkboxmodel',
            checkOnly : true,
            listeners : {
            	deselect : function(check, record, index, eOpts ) {
            		var grid2 = Ext.getCmp('developer-win-grid');
	    			var store2 = grid2.getStore();
	               	var proxy2 = store2.getProxy();
	               	proxy2.extraParams.team = _team;
	               	if (_module != null)
	               		proxy2.extraParams.module = _module;
	               	else 
	               		proxy2.extraParams.module = null;
	               	
	               	if (_func != null)
	               		proxy2.extraParams.function = _func;
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
            	},
	            select : function(check, record, index, eOpts ) {
	            	var grid2 = Ext.getCmp('developer-win-grid');
	    			var store2 = grid2.getStore();
	               	var proxy2 = store2.getProxy();
	               	proxy2.extraParams.team = _team;
	               	if (_module != null)
	               		proxy2.extraParams.module = _module;
	               	else 
	               		proxy2.extraParams.module = null;
	               	
	               	if (_func != null)
	               		proxy2.extraParams.function = _func;
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
			width: 65
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
            tooltip : '팀 또는 모듈의 전체 물량 중 개발자에게 할당된 개밞물량비율',
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
            width: 80,
            align:'center',
            renderer : function(value) {
            	var temp2 = value == 0 ? 'normal' : 'bold';
            	return '<span style="color:black;font-weight:'+ temp2 + '">' + value.toFixed(2) + '</span>';
            }
        },{ 
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
        },{ 
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
        	  id : 'rank-title',
        	  html : '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;개발자 전체 순위</span></div>'
        		    + '</div>'
          }    
        ];
        
        this.callParent(arguments);
    },
    listeners : {
    	resize : function (self, width, height) {
    	},
    	viewready : function(grid) {
	    	var map  = new Ext.KeyMap(grid.getEl(), [
	    	   {
	    	    key: 'c',
	    		ctrl : true,
	    		fn : function(keyCode, e){
	    			var recs = grid.getSelectionModel().getSelection();
	    			if ( recs && recs.length != 0) {
	    				var clipText = grid.getCsvDataFromRecs(recs);
	    				var ta = document.createElement('textarea');
	    				ta.id = 'cliparea';
	    				ta.style.position = 'absolute';
	    				ta.style.left = '-1000px';
	    				ta.style.top = '-1000px';
	    				ta.value = clipText;
	    				
	    				document.body.appendChild(ta);
	    				document.designMode = 'off';
	    				
	    				ta.focus();
	    				ta.select();
	    				
	    				setTimeout(function(){
	    					document.body.removeChild(ta);
	    				}, 100);
	    				
	    			}
	    		}
	    	}]
	    	);
	     }
    },
    getCsvDataFromRecs : function(records) {
    	var clipText = '';
    	var store = Ext.getCmp('developer-rank-grid').getStore();
    	var curRow = store.find('developer', records[0].data.developer);
    	for (var i=0;i < records.length;i++) {
    		var index = store.find('developer', records[i].data.developer);
    		var r = index;
    		var rec = records[i];
    		var cv = this.columns;
    		for (var j=0;j < cv.length;j++) {
    			var val = rec.data[cv[j].dataIndex];
    			if (typeof val == "undefined") continue;
    			if (r === curRow) {
    				clipText = clipText.concat(val, "\t");
    			} else {
    				curRow = r;
    				clipText = clipText.concat("\n", val, "\t");
    			}
    		}
    	}
    	return clipText;
    }
});

