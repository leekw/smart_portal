Ext.define('Ext.qualitytest.view.ProgramGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.programgrid',
    autoScroll: true,
    background: 'none',
    border: false,
    id : 'program-grid',
    minHeight : 730,
    maxHeight : 730,
    enableLocking : false,
    columnLines : true,
    initComponent: function() {

        this.store = 'Program';
        
        this.plugins = ['gridfilters'];
        
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'no',
			width: 60
		}),
		{ 
            header: '호출 상태',
            width: 100,
            align:'center',
            renderer : function(value, meta, record, rowIndex) {
            	var color = null;
            	var item = null;
            	if (record.get('sourceOperationRunYn') == 'Y' && record.get('targetOperationRunYn') == 'Y') {
            		color = 'green';
            		item = '<i class="x-fa fa-circle"></i>';
            	} else if (record.get('sourceOperationRunYn') == 'Y' && record.get('targetOperationRunYn') != 'Y') {
            		color = 'blue';
            		item = '◐';
            	} else if (record.get('sourceOperationRunYn') != 'Y' && record.get('targetOperationRunYn') == 'Y') {
            		color = 'blue';
            		item = '◑';
            	} else {
            		color = 'red';
            		item = '<i class="x-fa fa-circle"></i>';
            	}
            	return '<span style="color:' + color + ';font-weight:bold">' + item + '</span>';
            }
        },
        { 
            header: '연동 팀/모듈',
            dataIndex: 'sourceTeam',
            width: 100,
            align:'center',
            renderer : function(value, meta, record, rowIndex) {
            	var result = null;
            	if (record.get('relationType') == 'SERVICE') {
            		result = record.get('sourceModule');
            	} else {
            		result = value + '-' + record.get('sourceModule');
            	}
            	meta.style = "background-color:#ffd13e;";
            	return result;
            }
        },
        { 
            header: '연동Pg실행',
            dataIndex: 'sourceRunYn',
            align:'center',
            width: 90,
            filter: {
            	type: 'list'
            },
            renderer : function(value, meta, record, rowIndex) {
		    	var color = value == 'Y' ? 'black' : 'red';
            	return '<span style="color:' + color + ';font-weight:bold">' + value + '</span>';
            }
        },
        { 
            header: '연동 Pg Coverage',
            dataIndex: 'sourceFileStatement',
            align:'center',
            hidden:true,
            width: 150,
            filter: {
            	type: 'list'
            },
            renderer : function(value, meta, record, rowIndex) {
		    	var color = value >= 65 ? 'black' : 'red';
            	return '<span style="color:' + color + ';font-weight:bold">' + value + '</span>';
            }
        },
        { 
            header: '연동Op실행',
            dataIndex: 'sourceOperationRunYn',
            align:'center',
            width: 100,
            filter: {
            	type: 'list'
            },
            renderer : function(value, meta, record, rowIndex) {
		    	var color = value == 'Y' ? 'black' : 'red';
            	return '<span style="color:' + color + ';font-weight:bold">' + value + '</span>';
            }
        },
        { 
            header: '연동방향',
            dataIndex: 'linkWay',
            width: 160,
            align:'center',
            renderer : function(value, meta, record, rowIndex) {
		    	var item = value == 'source' ? 'right' : 'left';
		    	var color = value == 'source' ? 'blue' : 'red';
		    	var data = record.get('relationName').split('-');
		    	var first = value == 'source' ? data[0] : data[1];
		    	var last  = value == 'source' ? data[1] : data[0];    		
            	return first + '&nbsp;<i class="x-fa fa-arrow-' + item + '" style="color:' + color +'"></i>&nbsp;' + last;
            }
        },
        { 
            header: '대상 팀/모듈',
            dataIndex: 'targetTeam',
            width: 100,
            align:'center',
            renderer : function(value, meta, record, rowIndex) {
            	var result = null;
            	if (record.get('relationType') == 'SERVICE') {
            		result = record.get('targetModule');
            	} else {
            		result = value + '-' + record.get('targetModule');
            	}
            	meta.style = "background-color:#ffd13e;";
            	return result;
            }
        },
        { 
            header: '대상Pg실행',
            dataIndex: 'targetRunYn',
            width: 90,
            align:'center',
            filter: {
            	type: 'list'
            },
            renderer : function(value, meta, record, rowIndex) {
		    	var color = value == 'Y' ? 'black' : 'red';
            	return '<span style="color:' + color + ';font-weight:bold">' + value + '</span>';
            }
        },
        { 
            header: '대상 Pg Coverage',
            dataIndex: 'targetFileStatement',
            align:'center',
            hidden:true,
            width: 150,
            filter: {
            	type: 'list'
            },
            renderer : function(value, meta, record, rowIndex) {
		    	var color = value >= 65 ? 'black' : 'red';
            	return '<span style="color:' + color + ';font-weight:bold">' + value + '</span>';
            }
        },
        { 
            header: '대상Op실행',
            dataIndex: 'targetOperationRunYn',
            width: 100,
            align:'center',
            filter: {
            	type: 'list'
            },
            renderer : function(value, meta, record, rowIndex) {
		    	var color = value == 'Y' ? 'black' : 'red';
            	return '<span style="color:' + color + ';font-weight:bold">' + value + '</span>';
            }
        },
        { 
            header: '연동 Program',
            dataIndex: 'sourceFilePath',
            width: 400,
            filter: {
            	type: 'string'
            }
        },
        { 
            header: '연동 Operation',
            dataIndex: 'sourceOperation',
            width: 250,
            filter: {
            	type: 'string'
            },
            renderer : function(value,  meta, record) {
		    	return value == 'ALL' ? '' : value;
		    }
        },
        { 
            header: '대상 Program',
            dataIndex: 'targetFilePath',
            width: 400,
            filter: {
            	type: 'string'
            }
        },
        { 
            header: '대상 Operation',
            dataIndex: 'targetOperation',
            width: 250,
            filter: {
            	type: 'string'
            },
            renderer : function(value,  meta, record) {
		    	return value == 'ALL' ? '' : value;
		    }
        },
        
        ];
        
        this.bbar = this.paging= Ext.create('Ext.toolbar.Paging',
		{
			store : this.store,
			displayInfo: true
		});
        
        
        this.tbar = [
            
        ];
        
        this.callParent(arguments);
    },
    listeners : {
    	resize : function (self, width, height) {
    	}
    }
});
