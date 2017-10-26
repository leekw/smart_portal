Ext.define('Ext.loginpolicy.view.PolicyDetailTabPanel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.policydetailtab',
	minHeight: 200,
	bodyPadding : 5,
	fieldDefaults : {
		labelAlign : 'left',
		msgTarget : 'side'
	},
	items : [{
		title : '신규추가',
		items : [{
			xtype:'fieldset',
			title: '로그인 정책요소 입력',
			collapsible: true,
	        defaultType: 'textfield',
	        id : 'newLoginPolicyFactor',
	        defaults: {
	        	anchor: '100%',
	            labelWidth : 120
	        },
	        layout: 'anchor',
	        items :[{
	        	xtype : 'policyfactorcombobox',
	            fieldLabel: '로그인정책요소',
	            name: 'loginPolicyFactorId'
	        }, {
	            fieldLabel: '로그인정책아이디',
	            name: 'loginPolicyId',
	            readOnly : true,
	            hidden: true
	            
	        }, {
	            fieldLabel: '로그인정책요소유형',
	            name: 'loginPolicyFactorType',
	            readOnly : true,
	            hidden: true
	        }]
		}],
		buttons : [{
            text:'추가',
            action: 'add-policy-factor'
        },{
            text: '초기화',
            action: 'reset-policy-factor'
        }]
	}]
});