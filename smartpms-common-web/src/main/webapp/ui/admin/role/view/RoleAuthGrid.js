Ext.define('Ui.admin.role.view.RoleAuthGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.roleauthgrid',
    id : 'role-auth-grid',
    minHeight: 570,
    maxHeight: 570,
    initComponent: function() {
    	
        this.store = 'RoleAuth';
       
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'no',
			width: 40
		}),
		{ 
		    header: '리소스 Depth',
		    dataIndex: 'resourceDepth',
		    align:'center',
		    width: 120
		}, { 
            header: '상위 리소스명',
            dataIndex: 'parentResourceName',
            width: 150
        },
		{ 
            header: '리소스 명',
            dataIndex: 'resourceName',
            width: 150,
            flex: 1
        }, { 
            header: '리소스 유형',
            align:'center',
            dataIndex: 'resourceTypeCode',
            width: 200
        }, { 
            header: '권한 포함',
            dataIndex: 'include',
            columnHeaderCheckbox : true,
            xtype:'checkcolumn',
            width: 100,
            listeners : {
            	checkchange : function ( checkbox, rowIndex, checked, eOpts ) {
            		
            	}
            }
        }, { 
            header: '권한 제외',
            dataIndex: 'exclude',
            columnHeaderCheckbox : true,
            xtype:'checkcolumn',
            width: 100,
            listeners : {
            	checkchange : function ( checkbox, rowIndex, checked, eOpts ) {
            		
            	}
            }
        }
        ];
        
        this.tbar = [
        {
			xtype : 'label',
			width : '100%',
			html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800 !important"><i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;메뉴/화면 권한</span></div>'
				  + '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._saveAuth(1)"><i class="x-fa fa-save" style="padding-right:5px;"></i></span>'
				  + '</div>'
				  + '</div>'
		 }
        ];
        
        this.callParent(arguments);
    }
});    
