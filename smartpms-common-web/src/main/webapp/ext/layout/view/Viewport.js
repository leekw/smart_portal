/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */


Ext.define('Ext.layout.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',   
    requires: [
        'Ext.layout.view.Header',
        'Ext.layout.view.Center'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
        	layout: {
                type: 'border',
                padding: '0 2 2 2'
            },
            items: [{
            	region: 'west',
            	title: 'Menu',
            	layout: 'fit',
            	animCollapse: true,
            	width: 260,
                split: true,
                collapsed: true,
                collapsible: true,
                autoScroll:true,
            	items : [{
                	xtype: 'panel',
                	bodyPadding : 10,
                	maxHeight: 35,
                	buttonAlign: 'center',
                	buttons:[{
    	    			text : G_LOGIN_NAME,
    	    			handler : function() {
    	    				Ext.MessageBox.confirm('Confirm', '로그아웃 하시겠습니까?', UserInfo._logout);
    	    			}
    	    			}
                	]
    			},{
            		xtype : 'submenu'
            	}],
            	listeners : {
	            	beforeexpand : function(p, animate, options) {
	            		Ext.Ajax.request({
	    					url: G_PATH + '/connection/get.json',
	    					method : 'POST',
	    					headers : {'Content-Type' : 'application/json'},
	    					params : (Ext.JSON.encode({})),
	    					success: function(res, eOtps) {
	    						var temp = res.responseText;
	    						p.setTitle("Menu - 접속자 :" + Ext.JSON.decode(temp).info.currentConnectionCount + "명");
	    					},
	    					failure: function(res, eOtps) {
	    					}
	    					
	    				});
	    			},
	    			 beforecollapse: function(p, animate, options) {
	    				 p.setTitle("Menu");
	    			 }
            	}
            },{
            	xtype: 'container',
                region: 'center',
                layout: 'fit',
                items: [
                    {
                    xtype : 'tabpanel',
                    id : 'center-tab',
              		items : [
              		    MainPage._viewMain()
              		]
                }] 
            }]
        });
                
        me.callParent(arguments);
    },
    listeners : {
    	afterrender : function(v, eOpts) {
    		Ext.Ajax.request({
				url: G_PATH + '/notice/main/get.json',
				method : 'POST',
				headers : {'Content-Type' : 'application/json'},
				params : (Ext.JSON.encode({})),
				success: function(res, eOtps) {
					var temp = res.responseText;
					var data = Ext.JSON.decode(temp);
					MainPopup._openPopup(data);
				},
				failure: function(res, eOtps) {
				}
				
			});
    	}
    }
});

var UserInfo = {
	_logout : function(btn) {
		if (btn == "yes") {
			Ext.Ajax.request({
				url: G_PATH + '//logout/process.json',
				method : 'POST',
				headers : {'Content-Type' : 'application/json'},
				params : (Ext.JSON.encode({})),
				success: function(res, eOtps) {
					if (parent != null) {
						parent.document.location.href = G_PATH + '/layout/app/view.do';
					} else {
						document.location.href = G_PATH + '/layout/app/view.do';
					}
				},
				failure: function(res, eOtps) {
				}
				
			});
		}
	}	
};

var MainPage = {
	_viewMain : function() {
		if (M_RESOURCE_TYPE == 'PAGE') {
			return {
      			title : M_RESOURCE_NAME,
      			id : M_RESOURCE_ID,
      			items : [{ 
			      xtype: 'component', 
			      title: 'content',
			      autoEl: { 
			              tag: 'iframe', 
			              width: '100%', 
			              height: '100%', 
			              focusOnLoad: true, 
			              frameborder: 0, 
			              src: G_PATH + '' + M_URL 
			      } 
				}]
      		};
		} else if (M_RESOURCE_TYPE == 'IMAGE') {
			return {
				title : M_RESOURCE_NAME,
				id : M_RESOURCE_ID,
				autoScroll : true,
				html: '<div style="padding: 20px 20px 20px 20px;">' + M_RESOURCE_CONTENT + '</div>',
				closable : true
			};
		}
	}	
};

var MainPopup = {
	_openPopup : function(data) {
		if (data != null && data.notices != null && data.notices.length > 0
				&& !Cookies._getCookie('NOTICE_' + data.notices[0].noticeId)) {
			var win = Ext.getCmp('main-notice');
			if (win != null) win.close();
			win = Ext.create('Ext.window.Window', {
				id : 'main-notice',
	    	    title: '메인 공지 알림',
	    	    titleAlign : 'center',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
	    	    height: '65%',
	    	    width: '65%',
	    	    layout: 'fit',
	    	    animateTarget:this,
	    	    items: [{ 
	    	    	maxHeight : 30,
	    	    	xtype : 'panel',
	    	    	html : MainPopup._getCloseContent(data.notices[0])
	    	    },{
	    	    	xtype : 'panel',
	    	    	html : MainPopup._getContent(data.notices[0])
	    	    }
	    	    ],
	    	    listeners: {
	    	    	show: function (w) {
	    	             w.el.slideIn('t', {
	    	            	    easing: 'easeIn',
	    	            	    duration: 1500
	    	            	});
	    	        }
	    	    }
	    	});
			win.show();
		}
	},
	_getCloseContent : function(data) {
		var result = "";
		
		result += '<input type="checkbox" name="notice" onClick="MainPopup._close(' + data.noticeId + ')">오늘 하루 동안 열지 않음';
		return result;
	},
	_getContent : function(data) {
		var result = "";
		
		result += '<center><h2>' + data.noticeTitle + '</h2><br></center>';
		result += '<center><div style="padding: 10 10 10 10;"><p>' + data.noticeDescription + '</h2><div></center>';
		return result;
	},
	_close : function(noticeId) {
		noticeId = "NOTICE_" + noticeId;
		Cookies._setCookie(noticeId, noticeId, 1);
		var win = Ext.getCmp('main-notice');
		win.close();
	}
};