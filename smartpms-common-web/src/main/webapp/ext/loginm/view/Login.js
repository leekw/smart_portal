Ext.define('Ext.loginm.view.Login', {
    extend: 'Ext.loginm.view.LockingWindow',
    xtype: 'pageslogin',

    requires: [
        'Ext.loginm.view.Dialog',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    title: '통합 Dashboard Log In',
    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well

    items: [
        {
            xtype: 'authdialog',
            defaultButton : 'loginButton',
            autoComplete: true,
            bodyPadding: '20 20',
            cls: 'auth-dialog-login',
            header: false,
            width: '70%',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            defaults : {
                margin : '5 0'
            },

            items: [
                {
                    xtype: 'label',
                    text: '로그인 할 계정을 입력하십시오.'
                },
                {
                    xtype: 'label',
                    text: '아이디와 패스워드는 JIRA와 동일합니다.'
                },
                {
                    xtype: 'label',
                    text: 'JIRA 접속 정보를 입력하십시오.'
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    name: 'userid',
                    id : 'userid',
                    bind: '{userid}',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    emptyText: 'user id',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    },
                    listeners : {
				    	afterrender : function(field) {
				    		if (!Cookies._getCookie("SAVED_USER"))
				    			field.focus(false, 1000);	
				    	}
				    }
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    emptyText: 'Password',
                    inputType: 'password',
                    id : 'password',
                    name: 'password',
                    bind: '{password}',
                    allowBlank : false,
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-password-trigger'
                        }
                    },
                    listeners : {
				    	afterrender : function(field) {
				    		if (Cookies._getCookie("SAVED_USER"))
				    			field.focus(false, 1000);	
				    	},
				    	specialkey : function(f, e) {
				    		if (e.getKey() == e.ENTER) {
				    			'onLoginButton'
				    		}
				    	}
				    }
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            flex : 1,
                            cls: 'form-panel-font-color rememberMeCheckbox',
                            height: 30,
                            bind: '{persist}',
                            boxLabel: 'Remember me',
                            listeners : {
                            	change : function( obj, newValue, oldValue, eOpts ) {
                            		if (newValue) {
                            			var userId  = Ext.getCmp('userid').getValue();
                            			Cookies._setCookie("SAVED_USER", userId, -1);
                            		} else {
                            			Cookies._delCookie("SAVED_USER");
                            		}
                            	}
                            }
                        }
                    ]
                },
                {
                    xtype: 'button',
                    reference: 'loginButton',
                    scale: 'large',
                    ui: 'soft-green',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Login',
                    formBind: true,
                    listeners: {
                        click: 'onLoginButton'
                    }
                }
            ]
        }
    ],

    initComponent: function() {
        this.addCls('user-login-register-container');
        this.callParent(arguments);
    }
});
