Ext.define('Ext.stabilization.view.QuestionGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.questiongrid',
    id : 'que-grid',
    border : false,
    multiSelect : true,
    minHeight: 250 ,
    autoScroll:true,
    initComponent: function() {
    	
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            pluginId: 'rowEditing'
        });
    	
        this.store = 'Question';
        
        this.plugins = [rowEditing];
       
        this.columns = [
            {
	            header: '유형',
	            dataIndex: 'channel',
	            flex:1,
	            editor: {
	                allowBlank: false
	            },
	            autoSizeColumn: true
	        }, { 
	            header: '건수',
	            dataIndex: 'data1',
	            width:80,
	            editor: {
	                allowBlank: false
	            },
	            align : 'center',
	            renderer : function(value) {
	            	if(value == null)
	            		return value;
	            	else 
	            		return Ext.util.Format.number(value,'0,000');
	            },
	            autoSizeColumn: true
	        }];
        
        this.tbar = [
			{
				xtype : 'label',
				width : '100%',
				html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800 !important"><i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;문의 유형 TOP5</span></div>'
					  + (G_IS_HADNS == 'Y' ? '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._add(\'que-grid\')"><i class="x-fa fa-plus" style="padding-right:5px;"></i></span>'
					  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._remove(\'que-grid\')"><i class="x-fa fa-trash" style="padding-right:5px;"></i></span>'
					  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._saveGrid(\'que-grid\')"><i class="x-fa fa-save" style="padding-right:5px;"></i></span></div>'
					  : '')
					  + '</div>'
			 }
        ];
        
        this.callParent(arguments);
    },
    listeners : {
    	load : function(store, records) {
    		Ext.getCmp('que-grid').storeInitialCount = records.length;
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
	    	},{
	    		key: 'v',
	    		ctrl : true,
	    		fn : function(keyCode, e) {
	    			var ta = document.createElement('textarea');
	    			ta.id = 'cliparea';
	    			ta.style.position = 'absolute',
	    			ta.style.left = '-1000px';
	    			ta.style.toop = '-1000px';
	    			ta.value = '';
	    			
	    			document.body.appendChild(ta);
	    			document.designMode = 'off';
	    			
	    			setTimeout(function() {
	    				Ext.getCmp('que-grid').getRecsFromCsv(grid, ta);
	    			}, 100);
	    			//ta.focus();
	    			ta.select();
	    		}
	    	}]
	    	);
	     }
    },
    getRecsFromCsv : function(grid, ta) {
    	var store = Ext.getCmp('que-grid').getStore();
    	document.body.removeChild(ta);
    	var del = '';
    	if (ta.value.indexOf("\r\n")) {
    		del = "\r\n";
    	} else if(ta.value.indexOf("\n")) {
    		del = "\n";
    	}
    	var sel = grid.getSelectionModel().getSelection();
    	if(sel != null){
    		var rw = grid.store.indexOf(sel[0]);
    		grid.gRow = rw;
    	}
    	var rows = ta.value.split("\n");
    	for (var i=0;i < rows.length;i++) {
    		var cols = rows[i].split("\t");
    		
    		var columns = grid.columns;
    		if(cols.length >  columns.length) {
    			cols = cols.slice(0, columns.length);
    		}
    		if (grid.gRow === -1) {
    			Ext.Msg.alert('Info', 'Select a cell before pasting and try again!');
    			return ;
    		}
    		var cfg = {};
    		var tmpRec = store.getAt(grid.gRow);
    		var existing = false;
    		if (tmpRec) {
    			cfg = tmpRec.data;
    			existing = true;
    		}
    		var l = cols.length;
    		if(cols.length > columns.length) {
    			l = columns.length;
    		}
    		for (var j=0;j < l;j++) {
    			if (cols[j] === "") {
    				return ;
    			}
    			cfg[columns[j].dataIndex] = cols[j];
    		}
    		grid.storeInitialCount++;
    		var tmpRow = grid.gRow;;
    		grid.getSelectionModel().clearSelections(true);
    		var tmpRec = Ext.create('Ext.stabilization.model.Statistic', cfg);
    		if(existing) {
    			store.removeAt(tmpRow);
    		}
    		tmpRec.dirty = true;
    		store.insert(tmpRow, tmpRec);
    		grid.gRow = ++tmpRow;
    	}
    	if(grid.gRow === store.getCount()) {
    		var RowRec = Ext.create('Ext.stabilization.model.Statistic', {});
    		store.add(RowRec);
    	}
    	grid.gRow = 0;
    },
    getCsvDataFromRecs : function(records) {
    	var clipText = '';
    	var store = Ext.getCmp('que-grid').getStore();
    	var curRow = store.find('channel', records[0].data.channel);
    	for (var i=0;i < records.length;i++) {
    		var index = store.find('channel', records[i].data.channel);
    		var r = index;
    		var rec = records[i];
    		var cv = this.columns;
    		for (var j=0;j < cv.length;j++) {
    			var val = rec.data[cv[j].dataIndex];
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
