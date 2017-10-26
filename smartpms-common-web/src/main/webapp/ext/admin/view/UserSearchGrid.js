Ext.define('Ext.admin.view.UserSearchGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.usersearchgrid',    
    title : '사용자 목록',    
    minHeight: 400,
    initComponent: function() {
    	
        this.store = 'UserSearch';
       
        this.columns = [{
            header: '번호',
            dataIndex: 'userNo',
            width: 50
        }, { 
            header: '사용자 아이디',
            dataIndex: 'userId',
            width: 150
        }, { 
            header: '사용자 이름',
            dataIndex: 'userName',
            width: 150,
            flex: 1
        }
        
        ];
        
        this.tbar = [{
        	type : 'textfield',
        	name : 'userId',
        	fieldLabel: '사용자 아이디'
         },{
        	type : 'textfield',
        	name : 'userName',
        	fieldLabel: '사용자 명'
         },
         {
            text: '조회',
            action:'search-user-record'
        }];
        
        this.callParent(arguments);
    }
});    
