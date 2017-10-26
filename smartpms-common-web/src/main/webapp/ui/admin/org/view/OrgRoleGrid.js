Ext.define('Ui.admin.org.view.OrgRoleGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.orgrolegrid',
    id : 'org-role-grid',
    maxHeight: 585,
    minHeight: 585,
    multiSelect: true,
    initComponent: function() {
    	
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            pluginId: 'rowEditing',
            listeners : {
            	beforeedit : function( editor, context, eOpts ) {
            		if (context.record.data.mode == 'R') {
            			return false;
            		}
            	},
            	edit : function(editor, e) {
            		
            	}
            }
        });
    	
    	this.plugins = [rowEditing];
    	
        this.store = 'OrgRole';
       
        this.columns = [
        new Ext.grid.RowNumberer({
			header : 'no',
			align:'center',
			width: 40
		}),
        { 
            header: '역할 아이디',
            dataIndex: 'roleId',
            width : 120,
            align:'center',
            editor: {
            	xtype : 'usercombobox',
		        allowBlank: false
		    }
        }, { 
            header: '역할명',
            align:'center',
            dataIndex: 'roleName',
            flex:1
        }
        ];
        
        this.bbar = this.paging= Ext.create('Ext.toolbar.Paging',
		{
			store : this.store,
			displayInfo: false
		});
        
        this.tbar = [
        {
			xtype : 'label',
			width : '100%',
			html: '<div><div style="float:left;font-size:15px;font-weight:600"></div>'
				  + '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="GridAction._addRole()"><i class="x-fa fa-plus" style="padding-right:5px;"></i></span>'
				  + '<span style="cursor:pointer;cursor:hand;" onclick="GridAction._removeRole()"><i class="x-fa fa-trash" style="padding-right:5px;"></i></span>'
				  + '</div>'
				  + '</div>'
		 }
        ];
        
        this.callParent(arguments);
    }
});    
