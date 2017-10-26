Ext.define('Ext.qualityhist.view.ProgramGrid' ,{
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
            header: '품질상태',
            width: 110,
            align:'center',
            filter: {
            	type: 'list'
            },
            dataIndex: 'devStatus',
            renderer : function(value) {
            	var temp  = value == '정상' ? 'black' : 'red';
            	return '<span style="color:' + temp + ';font-weight:bold">' + value + '</span>';
            }
        },
        { 
            header: '팀',
            dataIndex: 'team',
            width: 100,
            align:'center'
        },
        { 
            header: '모듈',
            dataIndex: 'module',
            width: 100,
            align:'center'
        },
        { 
            header: '기능',
            dataIndex: 'function',
            width: 100,
            align:'center',
            filter: {
            	type: 'list'
            }
        },
        { 
            header: '개발자',
            dataIndex: 'developer',
            width: 100,
            align:'center',
            filter: {
            	type: 'string'
            }
        },
        { 
            header: '프로그램유형',
            dataIndex: 'programType',
            width: 100,
            align:'center',
            filter: {
            	type: 'list'
            }
        },
        { 
            header: '프로그램 한글명',
            dataIndex: 'programName',
            width: 150,
            filter: {
            	type: 'string'
            }
        },
        { 
            header: '전체 경로',
            dataIndex: 'filename',
            width: 150,
            filter: {
            	type: 'string'
            }
        },
        { 
            header: '프로그램 영문명',
            dataIndex: 'programId',
            width: 200,
            renderer : function(value) {
            	return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;">' + value + '</span>';
            },
            filter: {
            	type: 'string'
            }
        },
        { 
            header: 'Size(KB)',
            dataIndex: 'fileSize2',
            width: 100,
            align:'center',
            renderer : function(value) {
            	return value.toFixed(2);
            }
        },
        { 
            header: '최근변동일',
            dataIndex: 'lastCommitDate',
            width: 100,
            align:'center'
        },
        { 
            header: '시작일자',
            dataIndex: 'startDate',
            width: 100,
            align:'center'
        },
        { 
            header: '완료기한',
            dataIndex: 'dueDate',
            width: 100,
            align:'center'
        },
        { 
            header: '진척율',
            dataIndex: 'doneRatio',
            width: 100,
            align:'center'
        },
        { 
            header: 'LOC',
            dataIndex: 'loc',
            width: 100,
            align:'center',
            renderer : function(value) {
            	return '<span style="color:black;font-weight:bold">' + value + '</span>';
            }
        },
        { 
            header: 'SVN등록 여부',
            dataIndex: 'svnRegYn',
            width: 100,
            align:'center',
            renderer : function(value) {
            	var temp  = value != 'N' ? 'black' : 'red';
            	return '<span style="color:' + temp + ';font-weight:bold">' + value + '</span>';
            },
            filter: {
            	type: 'list'
            }
        },
        { 
            header: '의심 소스 여부',
            dataIndex: 'checkTargetYn',
            width: 100,
            align:'center',
            renderer : function(value) {
            	var temp  = value != 'Y' ? 'black' : 'red';
            	return '<span style="color:' + temp + ';font-weight:bold">' + value + '</span>';
            },
            filter: {
            	type: 'list'
            }
        },
        { 
            header: '의심 소스 내용',
            dataIndex: 'checkMessage',
            width: 250,
            filter: {
            	type: 'string'
            }
        },
        { 
            header: '호출관계누락 여부',
            dataIndex: 'unusedYn',
            width: 100,
            align:'center',
            renderer : function(value) {
            	var temp  = value != 'Y' ? 'black' : 'red';
            	return '<span style="color:' + temp + ';font-weight:bold">' + value + '</span>';
            },
            filter: {
            	type: 'list'
            }
        },
        { 
            header: 'UT정보',
            dataIndex: 'utCaseType',
            width: 100,
            align:'center',
            renderer : function(value) {
            	var temp  = value != 'UT누락' ? 'black' : 'red';
            	return '<span style="color:' + temp + ';font-weight:bold">' + value + '</span>';
            },
            filter: {
            	type: 'list'
            }
        },
        { 
            header: 'SIT정보',
            dataIndex: 'sitCaseType',
            width: 100,
            align:'center',
            renderer : function(value) {
            	var temp  = value != 'SIT누락' ? 'black' : 'red';
            	return '<span style="color:' + temp + ';font-weight:bold">' + value + '</span>';
            },
            filter: {
            	type: 'list'
            }
        },
        { 
            header: 'Run수행여부-UT',
            dataIndex: 'runYn',
            width: 120,
            align:'center',
            renderer : function(value) {
            	var temp  = value != 'N' ? 'black' : 'red';
            	return '<span style="color:' + temp + ';font-weight:bold">' + value + '</span>';
            },
            filter: {
            	type: 'list'
            }
        },
        { 
            header: 'Run수행여부-SIT',
            dataIndex: 'sitRunYn',
            width: 120,
            align:'center',
            renderer : function(value) {
            	var temp  = value != 'N' ? 'black' : 'red';
            	return '<span style="color:' + temp + ';font-weight:bold">' + value + '</span>';
            },
            filter: {
            	type: 'list'
            }
        },
        { 
            header: 'SIT RUN포함 여부',
            dataIndex: 'sitIncludeYn',
            width: 120,
            align:'center',
            renderer : function(value) {
            	var temp  = value != 'N' ? 'black' : 'red';
            	return '<span style="color:' + temp + ';font-weight:bold">' + value + '</span>';
            },
            filter: {
            	type: 'list'
            }
        },
        { 
            header: '전체 Method',
            dataIndex: 'totalFunction',
            width: 100,
            align:'center',
            renderer : function(value, meta, record, rowIndex) {
            	var result;
            	if (record.get('programType') == 'SO'
            		|| record.get('programType') == 'JO'
            	    || record.get('programType') == 'BO'
            	    || record.get('programType') == 'BOC') {
            		result = value;
            	} else {
            		result = '비대상';
            	}
            	var temp2 = result == '비대상' ? 'normal' : 'bold';
            	return '<span style="color:black;font-weight:' + temp2 + '">' + result + '</span>';
            }
        },
        { 
            header: '실행 Method',
            dataIndex: 'runFunction',
            width: 100,
            align:'center',
            renderer : function(value, meta, record, rowIndex) {
            	var result;
            	if (record.get('programType') == 'SO'
            		|| record.get('programType') == 'JO'
            	    || record.get('programType') == 'BO'
            	    || record.get('programType') == 'BOC') {
            		result = value;
            	} else {
            		result = '비대상';
            	}
            	var temp2 = result == '비대상' ? 'normal' : 'bold';
            	return '<span style="color:black;font-weight:' + temp2 + '">' + result + '</span>';
            }
        },
        { 
            header: 'UT커버리지',
            dataIndex: 'statement',
            width: 100,
            align:'center',
            renderer : function(value) {
            	var temp  = value >= 65 ? 'black' : 'red';
            	return '<span style="color:' + temp + ';font-weight:bold">' + value + '</span>';
            }
        },
        { 
            header: 'SIT커버리지',
            dataIndex: 'sitStatement',
            width: 100,
            align:'center',
            renderer : function(value) {
            	var temp  = value >= 65 ? 'black' : 'red';
            	return '<span style="color:' + temp + ';font-weight:bold">' + value + '</span>';
            }
        },
        { 
            header: 'UT JIRA',
            dataIndex: 'utJiraId',
            width: 100,
            align:'center',
            renderer : function(value) {
            	return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;">' + value + '</span>';
            },
            filter: {
            	type: 'string'
            }
        },
        { 
            header: 'SIT JIRA',
            dataIndex: 'sitJiraId',
            width: 100,
            align:'center',
            renderer : function(value) {
            	return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;">' + value + '</span>';
            },
            filter: {
            	type: 'string'
            }
        }
        ];
        
        this.bbar = this.paging= Ext.create('Ext.toolbar.Paging',
		{
			store : this.store,
			displayInfo: true
		});
        
        
        this.tbar = [
            {
            	xtype : 'label',
            	text : '프로그램 현황:'
            },
            {
            	xtype : 'segmentedbutton',
            	defaultUI : 'default',
            	items : [
				    {
				       text : '전체',
					   value : 'ALL',
					   id : 'ALL'
				   },
            	   {
            		   text : 'UI',
            		   value : 'UI',
            		   id : 'UI'
            	   },
            	   {
            		   text : 'ESB',
            		   value : 'ESB',
            		   id : 'ESB'
            	   },
            	   {
            		   text : 'SO',
            		   value : 'SO',
            		   id : 'SO'
            	   },
            	   {
            		   text : 'JO',
            		   value : 'JO',
            		   id : 'JO'
            	   },
            	   {
            		   text : 'BO',
            		   value : 'BO',
            		   id : 'BO'
            	   },
            	   {
            		   text : 'BOC',
            		   value : 'BOC',
            		   id : 'BOC'
            	   },
            	   {
            		   text : 'DO',
            		   value : 'DO',
            		   id : 'DO'
            	   },
            	   {
            		   text : 'DTO',
            		   value : 'DTO',
            		   id : 'DTO'
            	   },
            	   {
            		   text : 'ETC',
            		   value : 'ETC',
            		   id : 'ETC'
            	   },
            	   {
            		   text : 'SVN 미동록',
            		   value : 'nosvn',
            		   id : 'SVN'
            	   }
            	],
            	listeners : {
	            	toggle : function(container, button, pressed) {
	            		var programType = button.value == 'ALL' ? null : button.value;
	            		var grid = Ext.getCmp('program-grid');
	            		var store = grid.getStore();
	            		var proxy = store.getProxy();
	            		proxy.extraParams.page = 1;
	            		if (button.value != 'nosvn') {
	            			proxy.extraParams.programType = programType;
	            		} else {
	            			proxy.extraParams.searchFilter = 'nosvn';
	            		}
	            		store.load();
	      		    }
            	}
            },
            {
                xtype: 'tbspacer',
                width : 10
            },
            {
            	xtype : 'checkbox',
            	width : 180,
            	labelWidth : 150,
            	fieldLabel : '전주 개발완료대상 확인',
            	listeners : {
            		change : function( box, newValue, oldValue, eOpts ) {
	            		var grid = Ext.getCmp('program-grid');
	            		var store = grid.getStore();
	            		var proxy = store.getProxy();
	            		proxy.extraParams.page = 1;
	            		proxy.extraParams.searchFilter = newValue ? 'qualityTarget' : null;
	            		store.load();
            		}
            	}
            },
            {
            	xtype : 'checkbox',
            	width : 180,
            	labelWidth : 120,
            	fieldLabel : '품질 비정상 대상',
            	listeners : {
            		change : function( box, newValue, oldValue, eOpts ) {
	            		var grid = Ext.getCmp('program-grid');
	            		var store = grid.getStore();
	            		var proxy = store.getProxy();
	            		proxy.extraParams.page = 1;                 
	            		proxy.extraParams.searchOption = newValue ? 'noQuality' : null;
	            		store.load();
            		}
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
