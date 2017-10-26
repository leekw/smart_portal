Ext.define('Ext.meta.view.MetaGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.metagrid',
    autoScroll: true,
    background: 'none',
    border: false,
    id : 'meta-grid',
    minHeight : 800,
    maxHeight : 800,
    columnLines : true,
    initComponent: function() {

        this.store = 'Meta';
        
        this.plugins = ['gridfilters',
                        
                         {
				        	ptype : 'rowexpander',
				        	rowBodyTpl : new Ext.XTemplate(
				        	   '<p><b>내용:</b> {metaDescription}</p>'
				        	)
				         }
                        
                        ];
        
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'no',
			width: 60
		}),            
        { 
            header: '유형',
            dataIndex: 'metaType',
            align:'center',
            locked : true,
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: '구분',
            dataIndex: 'metaDiv',
            align:'center',
            locked : true,
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: '용어',
            dataIndex: 'metaName',
            locked : true,
            filter: {
            	type: 'string'
            },
            width: 100
        },
        { 
            header: '용어 전체명',
            dataIndex: 'metaFullName',
            align:'center',
            filter: {
            	type: 'string'
            },
            width: 200
        },
        { 
            header: '설명',
            dataIndex: 'metaDescription',
            filter: {
            	type: 'string'
            },
            flex:1,
            width: 100
        },
        { 
            header: '시스템/서비스',
            dataIndex: 'sysInfo',
            align:'center',
            filter: {
            	type: 'list'
            },
            width: 100
        },
        { 
            header: '비고',
            dataIndex: 'remark',
            filter: {
            	type: 'string'
            },
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
