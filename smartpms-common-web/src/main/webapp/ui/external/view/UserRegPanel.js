Ext.define('Ui.external.view.UserRegPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.userregpanel',
	id : 'user-reg-panel',
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	items : [
			{
				xtype:'panel',
				title : '사용자 기본정보',
				style : {
				    'background-color' : '#fff',
				    'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
				},
				minHeight : 630,
				border : false,
				items : [
				    {
				    	xtype : 'form',
				    	id : 'reg-user-form',
				    	defaults: {
				            labelWidth: 120
				        },
				        padding : 5,
				        border : false,
				        bodyStyle : {
				        	'box-shadow' : 'none',
				        	'padding' : '5px'
				        },
				        items :[
				            {
				            	fieldLabel: 'Photo',
				            	xtype : 'fieldcontainer',
							    name: 'photoPath',
							    height : 250,
							    anchor: '0',
							    layout : 'vbox',
							    items : [
							   		{
							        	xtype : 'hidden',
							        	name : 'defaultOrgId',
							        	id : 'defaultOrgId'
							        },
							        {
							        	xtype : 'hidden',
							        	name : 'idCheck',
							        	id : 'idCheck'
							        },
							        {
							        	xtype : 'tbtext',
							        	id : 'userPhoto',
							        	html : '<img id="myPhoto" src="" height="200" width="200">',
							        	height : 210,
							        	width : '40%'
							        },
							        {
							        	xtype : 'hidden',
							        	name : 'photoPath',
							        	id : 'photoPath'
							        },
									{
									    xtype: 'filefield',
									    emptyText: 'Select an image',
									    name: 'photo-path',
									    viewText : 'Photo',
									    allowBlank: false,
									    width : '80%',
									    buttonText: '',
									    buttonConfig: {
									        iconCls: 'fa-picture-o'
									    },
									    listeners : {
									    	change : function() {
									    		var reader = new FileReader();
								    		    reader.onload = function(){
								    		      var output = document.getElementById('myPhoto');
								    		      output.src = reader.result;
								    		      Ext.getCmp('photoPath').setValue(reader.result);
								    		    };
								    		    reader.readAsDataURL(event.target.files[0]);
									    	}
									    }
									}
							    ]
							    
				            },
				            {
				            	xtype : 'fieldcontainer',
							    fieldLabel: 'ID',
							    layout : 'hbox',
							    anchor: "0",
							    items : [
							        {
							        	xtype : 'textfield',
							        	name : 'userId',
							        	viewText : '아이디',
							        	width : '41%',
							        	enforceMaxLength : true,
							        	maxLength : 15,
							        	enableKeyEvents: true,
							        	allowBlank: false,
							        	listeners : {
							        		keyUp : function ( obj , e , eOpts ) {
							        			var params = {
							        				userId : obj.getValue()
							        			};
							        			Ext.Ajax.request({
								    	    	    url: G_PATH + '/based/res/user/get.json',
								    	    	    method: 'POST',
								    	    	    jsonData: Ext.encode(params),
								    	    	    success: function(response){
								    	    	    	var result = JSON.parse(response.responseText);
								    	    	    	if (result.error != null) {
								    	    				Ext.Msg.alert('Exception', result.error.message);
								    	    			} else {
								    	    				if (result.user != null && result.user.userId != null && result.user.userId != '') {
								    	    					Ext.Msg.alert('Error', '이미 등록된 아이디 입니다.');
								    	    					Ext.getCmp('idCheck').setValue('F');
								    	    				} else {
								    	    					Ext.getCmp('idCheck').setValue('T');
								    	    				}
								    	    			}
								    	    	    },
								    	    	    failure: function(){
								    	    	    	Ext.Msg.alert('Error', '조회 중 오류가 발생되었습니다.');
								    	    	    }
								    	    	});
							        		}
							        	}
							        },
							        {
							        	xtype : 'tbtext',
							        	text : ' 영문자 소문자 + 숫자 조합(특수문자, 대문자, 한글 불가) - 최대15자'
							        }
							    ]
							},
							{
							    xtype : 'textfield',
								fieldLabel: '이름',
							    name: 'userName',
							    anchor: '50%',
							    maxLength : 15,
							    enforceMaxLength : true,
							    allowBlank: false,
							    viewText : '이름'
							},
							{
								xtype : 'fieldcontainer',
								fieldLabel: 'Password',
								layout : 'hbox',
								anchor : '0',
								items : [
								     {
								    	 xtype : 'textfield',
								    	 inputType: 'password',
										 name: 'userPassword',
										 id : 'password-first',
										 maxLength : 15,
										 enforceMaxLength : true,
										 allowBlank: false,
										 width : '41%',
										 viewText : '패스워드'
								     },
								     {
								    	 xtype : 'textfield',
								    	 fieldLabel: 'Confirm Password',
								    	 inputType: 'password',
								    	 labelWidth : 150,
										 name: 'confirmPassword',
										 allowBlank: false,
										 maxLength : 15,
										 enforceMaxLength : true,
										 viewText :'패스워드확인',
										 width : '58%',
										 validator: function(value) {
											 var checkValue = Ext.getCmp('password-first').getValue();
											 if (value != checkValue) {
												 return '기 입력된 패스워드와 동일하게 입력해야 합니다.'
											 } else {
												 return true;
											 }
										 }
								     }
								]
							},
							{
								xtype : 'fieldcontainer',
								fieldLabel: 'Email',
								layout : 'hbox',
								anchor : '0',
								items : [
								    {
								    	xtype : 'textfield',
								    	name : 'emailAddress',
								    	vtype : 'email',
								    	maxLength : 30,
								    	enforceMaxLength : true,
								    	width : '41%',
								    	viewText : '이메일',
								    	allowBlank: false
								    },
								    {
								    	xtype : 'tbtext',
							        	text : ' ex)abc@aaa.com'
								    }
								]
							},
							{
								xtype : 'fieldcontainer',
								fieldLabel: '연락처',
								layout : 'hbox',
								anchor : '0',
								items : [
								     {
								    	 xtype : 'textfield',
								    	 name : 'phoneNumber',
								    	 maxLength : 30,
								    	 viewText : '연락처',
								    	 enforceMaxLength : true,
								    	 width : '41%',
								    	 allowBlank: false
								     },
								     {
								    	 xtype : 'tbtext',
								    	 text : ' ex)010-1234-5678'
								     }
								]
							},
							{
							    xtype : CommonCode._getCombo('USER_TYPE', '사용자 유형', false, 'userType', {labelWidth:120, labelAlign : 'right', width: '50%', allowBlank : false}),
							    anchor: '50%'
							}
				        ],
				        buttons :[
				        	{
						        text:'Roll-in 신청',
						        action: 'reg-user'
						    },
						    {
						        text:'취소',
						        ui : 'gray',
						        handler : function() {
						        	document.location.href = G_PATH + '/login.do';
						        }
						    }
				        ]
				    }
				],
				responsiveCls: 'big-60 small-100'
			},
			{
				xtype:'panel',
				style : {
				    'background-color' : '#fff',
				    'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
				},
				title : '사용자 소속조직',
				minHeight : 630,
				border : false,
				items : [
				    {
				    	xtype : 'orgtree'
				    }
				],
				responsiveCls: 'big-40 small-100'
			}
	],
	listeners : {
		afterrender : function(panel) {
    	}
	}
});