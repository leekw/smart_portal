Ext.define('Ext.admin.view.SelectedUserGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.selectedusergrid',    
    title : '선택된 사용자',    
    minHeight: 300,
    initComponent: function() {
    	
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'no',
			width: 40
		}), { 
            header: '사용자 아이디',
            dataIndex: 'userId',
            width: 100
        }, { 
            header: '사용자 이름',
            dataIndex: 'userName',
            width: 100,
            flex: 1
        }
        ];
        
        this.tbar = [];
        
        this.callParent(arguments);
    }
});    
