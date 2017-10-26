Ext.define('Ext.dlog.view.DLogDetailGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.dlogdetailgrid',
    autoScroll: true,
    background: 'none',
    border: false,
    id : 'dlog-detail-grid',
    minHeight : 800,
    maxHeight : 800,
    columnLines : true,
    initComponent: function() {

        this.store = 'DLogDetail';
        
        this.plugins = ['gridfilters'];
        
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'no',
			width: 60
		}),            
        { 
            header: '팀',
            dataIndex: 'team',
            align:'center',
            locked : true,
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: '모듈',
            dataIndex: 'module',
            align:'center',
            locked : true,
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: 'Team+Module 약어',
            dataIndex: 'tmValue',
            locked : true,
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: 'Open Phase',
            dataIndex: 'openPhase',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: 'DBT Phase',
            dataIndex: 'dbtPhase',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: 'Phase ID',
            dataIndex: 'phaseId',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: 'Task Grouping Key',
            dataIndex: 'taskGroupKey',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: '통합 Doc.ID',
            dataIndex: 'intDocId',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: '산출물명',
            dataIndex: 'docName',
            width: 100,
		    filter: {
            	type: 'string'
            }
        },
        { 
            header: '추가계약 / 기능명 (CR)',
            dataIndex: 'docDescription',
            width: 150,
		    filter: {
            	type: 'string'
            }
        },
        { 
            header: 'Task 수행기간',
            dataIndex: 'taskRunRange',
            align:'center',
            width: 100
        },
        { 
            header: 'Review 및 Sign-Off 수행 기간',
            align:'center',
            dataIndex: 'reviewTerm',
            width: 100
        },
        { 
            header: 'Due Date(V1.0)',
            dataIndex: 'comDueDate',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: '비고 -Due Date(V1.0)',
            dataIndex: 'comDueDesc',
            width: 100
        },
        { 
            header: 'Due date(Review대상 제출)',
            dataIndex: 'refDueDate',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: '비고-Due date(Review대상 제출)',
            dataIndex: 'refDueDesc',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: 'Sign-Off 유형',
            dataIndex: 'signOffType',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: 'QA 중점 점검 산출물',
            dataIndex: 'qaVerifyYn',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: '추적관리 용',
            dataIndex: 'trakingYn',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: '템플릿 제공',
            dataIndex: 'templateYn',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: 'Checklist 제공',
            dataIndex: 'checklistYn',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: '사업부서 Review 필요',
            dataIndex: 'bizReviewYn',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: 'SM Review 필요',
            dataIndex: 'smReviewYn',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: 'File Type',
            dataIndex: 'fileType',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: 'File Naming Rule',
            dataIndex: 'fileNamingRule',
            width: 100
        },
        { 
            header: '유관팀 Sign-Off 확인필요',
            dataIndex: 'refSignOffYn',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: '다수 산출물 리뷰대상',
            dataIndex: 'multiDocReviewYn',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: '비고',
            dataIndex: 'dlogDescription',
            width: 100
        }
        
        ];
        
        
        this.tbar = [
        ];
        
        this.callParent(arguments);
    },
    listeners : {
    	resize : function (self, width, height) {
    	}
    }
});
