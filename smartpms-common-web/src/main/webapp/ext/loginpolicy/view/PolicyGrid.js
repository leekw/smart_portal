Ext.define('Ext.loginpolicy.view.PolicyGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.policygrid',    
    minHeight: 500,
    initComponent: function() {
    	
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            pluginId: 'rowEditing'
        });
    	
        this.store = 'LoginPolicy';
        
        this.plugins = [rowEditing];
       
        this.columns = [{
            header: '로그인정책아이디',
            dataIndex: 'loginPolicyId',
            width: 120,
            editor: {
                allowBlank: false
            }
        }, { 
            header: '로그인정책명',
            dataIndex: 'loginPolicyName',
            flex: 1,
            editor: {
                allowBlank: false
            }
        }, {
            xtype: 'datecolumn',
            header: '로그인정책유효일시',
            id :'loginPolicyEffectiveDate',
            dataIndex: 'loginPolicyEffectiveDate',
            width: 130,
            editor: {
                xtype: 'datefield',
                allowBlank: true,
                format: 'Y/m/d'
            }
        }, {
        	xtype: 'datecolumn',
            header: '로그인정책만료일시',
            id :'loginPolicyExpirationDate',
            dataIndex: 'loginPolicyExpirationDate',
            width: 130,
            editor: {
                xtype: 'datefield',
                allowBlank: true,
                format: 'Y/m/d'
            }
        }];
        
        this.tbar = [{
            text: '추가',
            action: 'add-login-policy'
        }, {
            itemId: 'removeLoginPolicy',
            text: '삭제',
            action: 'remove-login-policy',
            disabled: true
        },{
            text: '저장',
            action:'save-grid-record'
        },{
            text: '새로고침',
            action:'reload-grid-record'
        }];
        
        this.callParent(arguments);
    }
});    
