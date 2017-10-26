Ext.define('Ext.programvf.view.ProgramGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.programgrid',
    autoScroll: true,
    background: 'none',
    border: false,
    id : 'program-grid',
    minHeight : 430,
    maxHeight : 430,
    initComponent: function() {

        this.store = 'ProgramListJira';
        
        this.plugins = [];
        
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'no',
			width: 60
		}),
		{ 
		    header: 'CR구분',
		    dataIndex: 'mode',
		    width: 80,
		    align:'center',
		    renderer : function(value) {
		    	return value == 'M' ? '변경' : value == 'I' ? '신규' : '삭제';
		    }
		},
		{
			header: '체크 유형',
            dataIndex: 'logType',
            align:'center',
            width: 100
		},
		{
			header: '체크 내용',
            dataIndex: 'logMessage',
            width: 200
		},
        { 
            header: 'Task',
            dataIndex: 'task',
            width: 150
        },
        { 
            header: '업무명',
            dataIndex: 'taskDetail',
            width: 150
        },
        { 
            header: 'Program명(영문)',
            dataIndex: 'programId',
            width: 200
        },
        { 
            header: 'Program(한글)',
            dataIndex: 'programName',
            width: 200
        },
        { 
            header: '인터페이스ID',
            dataIndex: 'interfaceId',
            width: 150
        },
        { 
            header: '대분류',
            dataIndex: 'programType',
            width: 100,
            align:'center'
        },
        { 
            header: '소분류',
            dataIndex: 'programSmallType',
            width: 100,
            align:'center'
        },
        { 
            header: '개발자',
            dataIndex: 'developer',
            width: 120
        },
        { 
            header: '원본시작일자',
            dataIndex: 'oldStartDateStr',
            width: 120,
            align:'center'
        },
        { 
            header: '원본완료일자',
            dataIndex: 'oldDueDateStr',
            width: 120,
            align:'center'
        },
        { 
            header: '변경시작일자',
            dataIndex: 'startDateStr',
            width: 120,
            align:'center'
        },
        { 
            header: '변경완료일자',
            dataIndex: 'dueDateStr',
            width: 120,
            align:'center'
        },
        { 
            header: 'Phase',
            dataIndex: 'phase',
            width: 100,
            align:'center'
        },
        { 
            header: 'Iteration',
            dataIndex: 'iteration',
            width: 100,
            align:'center'
        },
        { 
            header: 'SR 여부',
            dataIndex: 'srFlag',
            width: 100,
            align:'center'
        },
        { 
            header: 'SR번호',
            dataIndex: 'srNo',
            width: 100
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
            header: '서브모듈',
            dataIndex: 'subModule',
            width: 100,
            align:'center'
        },{ 
            header: '완료율',
            dataIndex: 'doneRatio',
            width: 80,
            align:'center'
        },{ 
            header: 'IssueID',
            dataIndex: 'issueId',
            width: 80
        },{ 
            header: '요청 사유',
            dataIndex: 'crReason',
            width: 100
        }
		];
        
        
        this.tbar = [
			{
			 	xtype : 'label',
			 	width : '100%',
			 	html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;유효성 검증 결과 상세</span></div>'
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
