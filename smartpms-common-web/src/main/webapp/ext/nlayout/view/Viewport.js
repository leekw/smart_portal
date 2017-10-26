Ext.define('Overrides.list.TreeItem', {
	override : 'Ext.list.TreeItem',
	
	updateNode : function(node) {
		var qtip = node && node.get('qtip');
		
		this.callParent(arguments);
		qtip && this.element.dom.setAttribute('data-qtip', qtip);
	}
});
Ext.define('Ext.nlayout.view.Viewport', {
	extend: 'Ext.container.Viewport',
    xtype: 'mainviewport',

    requires: [
        'Ext.list.Tree',
        'Ext.nlayout.view.MainContainerWrap',
        'Ext.nlayout.view.ViewportController',
        'Ext.nlayout.view.ViewportModel',
        'Ext.nlayout.view.FileGrid'
    ],
    controller : 'mainviewport',
    viewModel: {
        type: 'mainviewport'
    },

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar toolbar-btn-shadow',
            height: 64,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    html: '<div class="main-logo"><img src="' + G_PATH + '/angular/assets/img/favicon-32x32.png"><span style="font-family: Brush script MT;font-size:45px;color: #209e91;">S</span><span style="color: #209e91;">mart</span>PMS</div>',
                    width: 250
                },
                {
                    margin: '0 0 0 8',
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },
                {
                	xtype: 'tbtext',
                	id : 'main-navigation-path',
                	html :''
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                },
                {
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-search',
                    href: '#search',
                    hrefTarget: '_self',
                    tooltip: 'See latest search'
                },
                {
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-envelope',
                    href: '#email',
                    hrefTarget: '_self',
                    tooltip: 'Check your email'
                },
                {
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-bell'
                },
                {
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-th-large',
                    href: '#profile',
                    hrefTarget: '_self',
                    tooltip: 'See your profile'
                },
                {
                    xtype: 'tbtext',
                    text: G_LOGIN_NAME,
                    cls: 'top-user-name'
                },
                {
                    xtype: 'image',
                    cls: 'header-right-profile-image',
                    height: 35,
                    width: 35,
                    alt:'current user image',
                    src: G_PATH + '/resources/images/Nasta.png',
                    listeners : {
                    	render : function() {
                    		this.imgEl.on('click', this.onClick, this);
                    	}
                    },
                    onClick : function(e, t) {
                    	Ext.MessageBox.confirm('Confirm', '로그아웃 하시겠습니까?', UserInfo._logout);
                    }
                }
            ]
        },
        {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    ui: 'navigation',
                    store: 'NavigationTree',
                    id : 'sub-menu',
                    style : {
                    	'padding-top' : '10px !important;',
                     	'margin-left' : '22px !important;'
                    },
                    width: 250,
                    expanderFirst: false,
                    expanderOnly: false,
                    singleExpand : true,
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange',
                        render : 'onNavigationTreeRender'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    }
                }
            ]
        }
    ]
});
var FileUpload = {
		_openFileUploadForm : function() {
			var win2 = Ext.getCmp('main-upload-info');
			if (win2 == null) {
				win2 = Ext.create('Ext.window.Window', {
					id : 'main-upload-info',
		    	    title: '파일 목록',
		    	    resizable : true,
		    	    autoScroll: true,
		    	    maximizable : true,
		    	    closeAction : 'hide',
		    	    height: 420,
		    	    width: 550,
		    	    layout: 'fit',
		    	    animateTarget:this,
		    	    border : false,
		    	    items : [{
		    	    	xtype : 'form',
		    			labelWidth: 80,
		    			labelAlign: 'right',
		    			margin: '10 10 10 10',
		    			maxHeight : 330,
		    			bodyPadding: 10,
		    			border : false,
		    			items :[
		    			{
		    				xtype : 'filegrid'
		    			},{
		    				xtype : 'form',
		    				id : 'file-down-form',
		    				maxHeight : 0,
		    				defaultType: 'hiddenfield',
		    				items: [{
		    					name : 'fileName'
		    				},{
		    					name : 'filePath'
		    				},{
		    					name : 'filePath'
		    				}]
		    			}]
		    	    }
		    	    ],
					listeners : {
						beforeshow : function() {
				    		if (IMG_RESOURCE != '') {
				        		var grid = Ext.getCmp('main-file-grid');
				        		var store = grid.getStore(); 
				            	var proxy = store.getProxy();
				            	proxy.extraParams.resourceId = IMG_RESOURCE;
				            	store.load();
				    		}
						}
					}
		    	});
			}
			win2.show();
		}
	};
var UserInfo = {
	_logout : function(btn) {
		if (btn == "yes") {
			Ext.Ajax.request({
				url: G_PATH + '/logout/process.json',
				method : 'POST',
				headers : {'Content-Type' : 'application/json'},
				params : (Ext.JSON.encode({})),
				success: function(res, eOtps) {
					if (parent != null) {
						parent.document.location.href = G_PATH + '/nlayout/app/view.do';
					} else {
						document.location.href = G_PATH + '/nlayout/app/view.do';
					}
				},
				failure: function(res, eOtps) {
				}
				
			});
		}
	},
	_main : function() {
		document.location.href = G_PATH + '/nlayout/app/view.do';
	}
};