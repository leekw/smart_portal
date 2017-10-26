Ext.define('Ext.role.view.ServiceAuthGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.serviceauthgrid',
    id : 'service-auth-grid',
    minHeight: 755,
    maxHeight: 755,
    initComponent: function() {
    
    	
    	this.plugins = [];
    	
    	
        this.store = 'ServiceAuth';
       
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'no',
			width: 40
		}),
		{ 
            header: '메뉴/화면 명',
            dataIndex: 'parentResourceName',
            width: 200
        },
		{ 
            header: '서비스 명',
            dataIndex: 'resourceName',
            width: 300
        }, { 
            header: 'URL',
            align:'center',
            dataIndex: 'url',
            width: 200,
            flex:1
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
			html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800 !important"><i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;서비스  권한</span></div>'
				  + '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._saveAuth(2)"><i class="x-fa fa-save" style="padding-right:5px;"></i></span>'
				  + '</div>'
				  + '</div>'
		 }
        ];
        
        this.callParent(arguments);
    }
});    
