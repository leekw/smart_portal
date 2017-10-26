Ext.define('Overrides.list.TreeItem', {
	override : 'Ext.list.TreeItem',
	
	updateNode : function(node) {
		var qtip = node && node.get('qtip');
		
		this.callParent(arguments);
		qtip && this.element.dom.setAttribute('data-qtip', qtip);
	}
});
Ext.define('Ext.nlayoutm.view.Viewport', {
	extend: 'Ext.container.Viewport',
    xtype: 'mainviewport',

    requires: [
        'Ext.list.Tree',
        'Ext.nlayoutm.view.MainContainerWrap',
        'Ext.nlayoutm.view.ViewportController',
        'Ext.nlayoutm.view.ViewportModel',
        'Ext.nlayoutm.view.FileGrid'
    ],
    controller : 'mainviewport',
    viewModel: {
        type: 'mainviewport'
    },

    cls: 'sencha-dash-viewport',
    id : 'mainView',
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
            padding:'0 3px 0 10px',
//            cls: 'sencha-dash-dash-headerbar toolbar-btn-shadow',
            height: 64,
            width : '100%',
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    html: '<div class="main-logo2" style=""><img src="/int/resources/images/logo_1.jpg" width="66px" height="64px" onclick="UserInfo._main();"  style="cursor:pointer;cursor:hand;"></div>',
                    width: 66
                },
                {
                	xtype: 'component',
                	width: 100,
                	align:'center',
                	html : '<div style="width:100%;font-size:12px;font-weight:800;text-align:-webkit-center;">Cut-Over<br>Dashboard</div>',
                	id : 'top-panel',
                	flex: 1
                },
//                {
//                    xtype: 'tbspacer',
//                    flex: 1
//                },
//                {
//				    cls: 'delete-focus-bg',
//				    iconCls:'x-fa fa-pie-chart',
//				    width : 32,
//				    scale : 'medium',
//				    handler : 'onCutOverRouteChange'
//				    
//				},
                {
                    xtype: 'image',
                    cls: 'header-right-profile-image',
                    height: 30,
                    padding : '0 2 0 0',
                    width: 30,
                    src: G_PATH + '/resources/images/pie-chart-1.png',
                    listeners : {
                    	render : function() {
                    		this.imgEl.on('click', this.onClick, this);
                    	}
                    },
                    onClick : function(e, t) {
                    	var view = Ext.getCmp('mainView');
                    	view.controller.onCutOverRouteChange();
                    }
                },
                {
                    xtype: 'image',
                    cls: 'header-right-profile-image',
                    height: 30,
                    padding : '0 2 0 0',
                    width: 30,
                    src: G_PATH + '/resources/images/presentation-7-2.png',
                    listeners : {
                    	render : function() {
                    		this.imgEl.on('click', this.onClick, this);
                    	}
                    },
                    onClick : function(e, t) {
                    	var view = Ext.getCmp('mainView');
                    	view.controller.onStabilizationRouteChange();
                    }
                },
                {
                    xtype: 'image',
                    cls: 'header-right-profile-image',
                    height: 38,
                    width: 38,
                    src: G_PATH + '/resources/images/user-23-2.png',
                    listeners : {
                    	render : function() {
                    		this.imgEl.on('click', this.onClick, this);
                    	}
                    },
                    onClick : function(e, t) {
                    	Ext.MessageBox.confirm('Confirm', '로그아웃 하시겠습니까?', UserInfo._logout);
                    }
                }
//				{
//				    cls: 'delete-focus-bg',
//				    iconCls:'x-fa fa-line-chart',
//				    width : 32,
//				    scale : 'medium',
//				    handler : 'onStabilizationRouteChange'
//				},
//				{
//				    cls: 'delete-focus-bg',
//				    iconCls:'x-fa fa-user',
//				    width : 32,
//				    scale : 'medium',
//				    handler : function() {
//				    	Ext.MessageBox.confirm('Confirm', '로그아웃 하시겠습니까?', UserInfo._logout);
//				    }
//				}
                
            ]
        },
        {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            scrollable: 'y',
            flex: 1,
            items: [
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