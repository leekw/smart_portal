/**
 * @author v.lugovsky
 * created on 03.05.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('baSidebarToggleMenu', baSidebarToggleMenu)
      .directive('baSidebarCollapseMenu', baSidebarCollapseMenu)
      .directive('baSidebarTogglingItem', baSidebarTogglingItem)
      .controller('BaSidebarTogglingItemCtrl', BaSidebarTogglingItemCtrl)
      .directive('baUiSrefTogglingSubmenu', baUiSrefTogglingSubmenu)
      .directive('baUiSrefToggler', baUiSrefToggler);

  /** @ngInject */
  function baSidebarToggleMenu(baSidebarService) {
    return {
      restrict: 'A',
      link: function(scope, elem) {
        elem.on('click', function($evt) {
          $evt.originalEvent.$sidebarEventProcessed = true;
          scope.$apply(function() {
            baSidebarService.toggleMenuCollapsed();
          });
        });
      }
    };
  }

  /** @ngInject */
  function baSidebarCollapseMenu(baSidebarService) {
    return {
      restrict: 'A',
      link: function(scope, elem) {
        elem.on('click', function($evt) {
          $evt.originalEvent.$sidebarEventProcessed = true;
          if (!baSidebarService.isMenuCollapsed()) {
            scope.$apply(function() {
              baSidebarService.setMenuCollapsed(true);
            });
          }
        });
      }
    };
  }

  /** @ngInject */
  function baSidebarTogglingItem() {
    return {
      restrict: 'A',
      controller: 'BaSidebarTogglingItemCtrl'
    };
  }
  
  function addSubMenu(parentResourceId, vm, $scope, $element, $attrs, $state, $http, baSidebarService) {
	  var dataObject =
	  {
			  maxRowSize : 0, 
			  parentResourceId : parentResourceId
	  };
	  $http({
		method: 'POST', //방식
		url: G_PATH + '/resource/list/get.json', /* 통신할 URL */
		data: dataObject, /* 파라메터로 보낼 데이터 */
		headers: {'Content-Type': 'application/json; charset=utf-8', 'X-CSRF-Token' : G_TOKEN } //헤더
	})
	.success(function(data, status, headers, config) {
		if( data ) {
			if (data.error != null) {
				if (data.error.code == "NOTLOGIN" || data.error.code == "NOTAUTH") {
					if (parent != null) {
						parent.document.location.href = G_PATH + '/login.do';
					} else {
						document.location.href = G_PATH + '/login.do';
					}
				}
			} else {
    			/* 성공적으로 결과 데이터가 넘어 왔을 때 처리 */
				
    			for (var i=0;i < data.resources.length;i++) {
    				var menu = data.resources[i].resourceName;
    				var menuId = data.resources[i].resourceId;
    				vm.$$menuItem.subMenu.push({
  	    		      title: menu,
  	    		      menuId : menuId,
  	    		      subMenu: []
    				});
    			}
    			var menuItem = vm.$$menuItem;
    			iniMenuItem(vm, menuItem, $scope, $element, $attrs, $state, $http, baSidebarService);
			}
		}
		else {
			/* 통신한 URL에서 데이터가 넘어오지 않았을 때 처리 */
		}
	})
	.error(function(data, status, headers, config) {
		/* 서버와의 연결이 정상적이지 않을 때 처리 */
		console.log(status);
	});
  }
  
  function iniMenuItem(vm, menuItem, $scope, $element, $attrs, $state, $http, baSidebarService) {

	  if (menuItem && menuItem.subMenu && menuItem.subMenu.length) {
	      vm.$$expandSubmenu = function() { console.warn('$$expandMenu should be overwritten by baUiSrefTogglingSubmenu') };
	      vm.$$collapseSubmenu = function() { console.warn('$$collapseSubmenu should be overwritten by baUiSrefTogglingSubmenu') };

	      var subItemsStateRefs = baSidebarService.getAllStateRefsRecursive(menuItem);

	      vm.$expand = function() {
	        vm.$$expandSubmenu();
	        $element.addClass('ba-sidebar-item-expanded');
	      };

	      vm.$collapse = function() {
	        vm.$$collapseSubmenu();
	        $element.removeClass('ba-sidebar-item-expanded');
	      };

	      vm.$toggle = function() {
	        $element.hasClass('ba-sidebar-item-expanded') ?
	            vm.$collapse() :
	            vm.$expand();
	      };

	      if (_isState($state.current)) {
	        $element.addClass('ba-sidebar-item-expanded');
	      }

	      $scope.$on('$stateChangeStart', function (event, toState) {
	        if (!_isState(toState) && $element.hasClass('ba-sidebar-item-expanded')) {
	          vm.$collapse();
	          $element.removeClass('ba-sidebar-item-expanded');
	        }
	      });

	      $scope.$on('$stateChangeSuccess', function (event, toState) {
	        if (_isState(toState) && !$element.hasClass('ba-sidebar-item-expanded')) {
	          vm.$expand();
	          $element.addClass('ba-sidebar-item-expanded');
	        }
	      });
	    }

	    function _isState(state) {
	      return state && subItemsStateRefs.some(function(subItemState) {
	            return state.name.indexOf(subItemState) == 0;
	          });
	    }
	    
  }

  /** @ngInject */
  function BaSidebarTogglingItemCtrl($scope, $element, $attrs, $state, $http, baSidebarService) {
	  
    var vm = this;
    var menuItem = vm.$$menuItem = $scope.$eval($attrs.baSidebarTogglingItem);
    if (menuItem && menuItem.subMenu && menuItem.subMenu.length == 0) {
    	vm.$$menuItem.subMenu.push({
    		title: 'aaaa'
    	});
    	iniMenuItem(vm, menuItem, $scope, $element, $attrs, $state, $http, baSidebarService);
//    	addSubMenu(vm.$$menuItem.menuId, vm, $scope, $element, $attrs, $state, $http, baSidebarService);
    } else {
    	iniMenuItem(vm, menuItem, $scope, $element, $attrs, $state, $http, baSidebarService);
    }
    
  }

  /** @ngInject */
  function baUiSrefTogglingSubmenu($state) {
    return {
      restrict: 'A',
      require: '^baSidebarTogglingItem',
      link: function(scope, el, attrs, baSidebarTogglingItem) {
        baSidebarTogglingItem.$$expandSubmenu = function() { el.slideDown(); };
        baSidebarTogglingItem.$$collapseSubmenu = function() { el.slideUp(); };
      }
    };
  }

  /** @ngInject */
  function baUiSrefToggler(baSidebarService) {
    return {
      restrict: 'A',
      require: '^baSidebarTogglingItem',
      link: function(scope, el, attrs, baSidebarTogglingItem) {
        el.on('click', function() {
           baSidebarTogglingItem.$$menuItem.subMenu.push({
        	  title : 'bbbb' 
           });
          if (baSidebarService.isMenuCollapsed()) {
            // If the whole sidebar is collapsed and this item has submenu. We need to open sidebar.
            // This should not affect mobiles, because on mobiles sidebar should be hidden at all
            scope.$apply(function() {
              baSidebarService.setMenuCollapsed(false);
            });
            baSidebarTogglingItem.$expand();
          } else {
            baSidebarTogglingItem.$toggle();
          }
        });
      }
    };
  }

})();
