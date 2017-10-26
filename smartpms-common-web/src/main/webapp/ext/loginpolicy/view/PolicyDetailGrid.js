Ext.define('Ext.loginpolicy.view.PolicyDetailGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.policydetailgrid',    
    minHeight: 300,
    initComponent: function() {
    	
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            pluginId: 'rowEditing'
        });
    	    	
    	this.store = 'LoginPolicyDetail';
    	
    	this.plugins = [rowEditing];
       
        this.columns = [{
            header: '로그인정책아이디',
            dataIndex: 'loginPolicyId',
            width: 120
        }, { 
            header: '로그인정책요소아이디',
            dataIndex: 'loginPolicyFactorId',
            width: 120
        }, {
            header: '로그인정책요소명',
            dataIndex: 'loginPolicyFactorName',
            width: 100
        },{
            header: '로그인정책요소유형',
            dataIndex: 'loginPolicyFactorTypeName',
            width: 100
        }, {
            header: '로그인정책요소값',
            dataIndex: 'loginPolicyFactorValue',
            flex: 1
        }];
        
        this.tbar = [{
            text: '저장',
            action: 'save-policy-factor'
        },{
            itemId: 'removePolicyFactor',
            text: '삭제',
            action: 'remove-policy-factor',
            disabled: true
        }];
        
        this.callParent(arguments);
    }
});    
