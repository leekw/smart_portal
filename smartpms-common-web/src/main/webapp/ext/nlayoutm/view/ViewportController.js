var M_TITLE = '';
var IMG_RESOURCE = '';
Ext.define('Ext.nlayoutm.view.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewport',
    
    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'onRouteChange'
            }
        }
    },
    routes: {
        ':node': 'onRouteChange'
    },

    setCurrentView: function(hashTag, _resource) {
        hashTag = (hashTag || '').toLowerCase();
        IMG_RESOURCE = '';
        hashTag = hashTag == 'stabilization' ? 'stabilization' : 'cutover';
        var topPanel = Ext.getCmp('top-panel');
        if (hashTag == 'stabilization') {
        	topPanel.setHtml('<div style="font-size:12px;font-weight:800;text-align:-webkit-center;">안정화<br>Dashboard</div>');
        } else {
        	topPanel.setHtml('<div style="font-size:12px;font-weight:800;text-align:-webkit-center;">Cut-Over<br>Dashboard</div>');
        }
        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            viewModel = me.getViewModel(),
            vmData = viewModel.getData(),
            view = hashTag == 'stabilization' ? '/stabilizationm/app/view.do' : '/ncutoverm/app/view.do',
            lastView = vmData.currentView,
            existingItem = mainCard.child('component[resourceId=' + hashTag + ']'),
            newView;
        // Kill any previously routed window
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        lastView = mainLayout.getActiveItem();
        if (!existingItem) {
        	newView = Ext.create('Ext.Component',{
        		margin: '10 10 10 10',
    			autoEl: { 
		              tag: 'iframe', 
		              width: '98%', 
		              height: '98%', 
		              focusOnLoad: true, 
		              frameborder: 0, 
		              src: G_PATH + '' + view 
			     },
			     hideMode: 'offsets',
                 resourceId: hashTag
    		});
        }

        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem) {
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            }
            else {
                // newView is set (did not exist already), so add it and make it the
                // activeItem.
                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }

//        navigationList.setSelection(node);

        if (newView.isFocusable(true)) {
            newView.focus();
        }

        vmData.currentView = newView;
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        if (node && node.get('resourceId')
        		&& node.get('resourceTypeCode') !== 'MENU') {
        	
            this.redirectTo( node.get("resourceId"));
        }
    },
    
    onNavigationTreeRender : function() {
    },

    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
//            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainerWrap,
//            collapsing = !navigationList.getMicro(),
            new_width = 64;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.senchaLogo.setWidth(new_width);

//            navigationList.setWidth(new_width);
//            navigationList.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();  // ... since this will flush them
        }
        else {
//            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
//                navigationList.setMicro(false);
//            }

            // Start this layout first since it does not require a layout
            refs.senchaLogo.animate({dynamic: true, to: {width: new_width}});

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
//            navigationList.width = new_width;
            wrapContainer.updateLayout({isRoot: true});

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
//            if (collapsing) {
//                navigationList.on({
//                    afterlayoutanimation: function () {
//                        navigationList.setMicro(true);
//                    },
//                    single: true
//                });
//            }
        }
    },

    onMainViewRender:function() {
    	this.redirectTo(M_RESOURCE_ID);
    	this.onToggleNavigationSize();
    },

    onRouteChange:function(id){
    	if (id == 'file') {
    		if(IMG_RESOURCE != '')
    			FileUpload._openFileUploadForm(IMG_RESOURCE);
    	} else {
	    	var me = this;
	    	Ext.getBody().mask("Loading...");
			Ext.Ajax.request({
				url: G_PATH + '/resource/info/get.json',
				method : 'POST',
				headers : {'Content-Type' : 'application/json'},
				params : (Ext.JSON.encode({resourceId : id})),
				success: function(res, eOtps) {
					var result = JSON.parse(res.responseText);
					if (result != null && result.info != null && result.info.resourceId != null
							&& result.info.resourceId != '') {
						me.setCurrentView(id, result.info);
					}
					Ext.getBody().unmask();
				},
				failure: function(res, eOtps) {
					Ext.getBody().unmask();
				}
				
			});
    	}
    },

    onCutOverRouteChange: function () {
        this.setCurrentView('cutover');
    },

    onStabilizationRouteChange: function () {
        this.setCurrentView('stabilization');
    }
});


