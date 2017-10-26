Ext.define('Ext.programvf.view.VerifyGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.verifygrid',
    autoScroll: true,
    background: 'none',
    border: false,
    id : 'verify-grid',
    minHeight : 120,
    maxHeight : 120,
    initComponent: function() {

        this.store = 'Verify';
        
        this.plugins = [];
        
        this.columns = [		
        { 
            header: '정상',
            dataIndex: 'verifyCount',
            width: 150,
            align:'center',
            renderer : function(value) {
            	return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;"><b>' + value + '</b></span>'
            }
        },{ 
            header: '기간 체크대상',
            dataIndex: 'dateCount',
            width: 150,
            align:'center',
            renderer : function(value) {
            	return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;"><b>' + value + '</b></span>'
            }
        },
        { 
            header: '오 입력',
            dataIndex: 'formatCount',
            width: 150,
            align:'center',
            renderer : function(value) {
            	return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;"><b>' + value + '</b></span>'
            }
        },
        { 
            header: '필수값 누락',
            dataIndex: 'reqCount',
            width: 150,
            align:'center',
            renderer : function(value) {
            	return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;"><b>' + value + '</b></span>'
            }
        },
        { 
            header: '프로그램 중복(신규)',
            dataIndex: 'newCount',
            width: 150,
            flex:1,
            align:'center',
            renderer : function(value) {
            	return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;"><b>' + value + '</b></span>'
            }
        },
		{ 
            header: '기타',
            dataIndex: 'etcCount',
            width: 150,
            align:'center',
            renderer : function(value) {
            	return '<span style="text-decoration:underline;cursor:pointer;cursor:hand;"><b>' + value + '</b></span>'
            }
        }];
        
        
        this.tbar = [
             {
             	xtype : 'label',
             	width : '100%',
             	html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;유효성 검증 결과 현황</span></div>'
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
