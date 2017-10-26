Ext.define('Ext.admin.view.SessionUserGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.sessionusergrid',    
    minHeight: 300,
    initComponent: function() {
    	
        this.store = 'SessionUser';
       
        this.columns = [{
            header: '번호',
            dataIndex: 'rowId',
            width: 50
        }, { 
            header: '접속자 아이디',
            dataIndex: 'userId',
            align:'center',
            width: 100
        }, { 
            header: '접속자 이름',
            dataIndex: 'userName',
            width: 200,
            flex: 1
        }, { 
            header: '접속자 IP주소',
            dataIndex: 'ip',
            align:'center',
            width: 120
        }, { 
            header: '로그인 일시',
            align:'center',
            dataIndex: 'loginDate',
            width: 150
        }, { 
            header: '세션 아이디',
            dataIndex: 'sessionId',
            width: 280
        }
        
        ];
        
        this.tbar = [{
            text: 'Reload',
            action:'reload-session-record',
            ui:'gray'
        }];
        
        this.callParent(arguments);
    }
});    
