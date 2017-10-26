/**
 * @author v.lugovsky
 * created on 16.12.2015
 */

(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

    'BlurAdmin.pages.ui',
    'BlurAdmin.pages.ui.notifications'
  ])
      .provider('refs', ReferencesProvider).config(routeConfig).controller(AppController).run(['$rootScope', '$http', 'refs', function($rootScope, $http, refs) {
    	  let baSidebarServiceProvider = refs.get('baSidebarServiceProvider');
    	  var dataObject =
	    	  {
	    			  maxRowSize : 0, 
	    			  parentResourceId : 'TOP'
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
		    				baSidebarServiceProvider.addStaticItem({
		  	    		      title: menu,
		  	    		      menuId : menuId,
		  	    		      icon: 'ion-android-laptop',
		  	    		      subMenu: []
		    				});
		    			}
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
      }]);
  
  	const refs = {};
	
	function ReferencesProvider() {
	    this.$get = function () {
		        return {
		            get: function (name) {
		              return refs[name];
		        }
		    };
		};
	
		this.injectRef = function (name, ref) {
	        refs[name] = ref;
	    };
	}
  
  function AppController($http) {
  }

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider, refsProvider) {
    $urlRouterProvider.otherwise('/dashboard');
    
    refsProvider.injectRef('$urlRouterProvider', $urlRouterProvider);
    refsProvider.injectRef('baSidebarServiceProvider', baSidebarServiceProvider);
    
//    alert($http);

//    baSidebarServiceProvider.addStaticItem({
//      title: 'Etc Page',
//      icon: 'ion-document',
//      subMenu: [{
//        title: 'Sign In',
//        fixedHref: 'auth.html',
//        blank: true
//      }, {
//        title: 'Sign Up',
//        fixedHref: 'reg.html',
//        blank: true
//      }, {
//        title: 'User Profile',
//        stateRef: 'profile'
//      }, {
//        title: '404 Page',
//        fixedHref: '404.html',
//        blank: true
//      }]
//    });
//    baSidebarServiceProvider.addStaticItem({
//      title: 'Menu Level 1',
//      icon: 'ion-ios-more',
//      subMenu: [{
//        title: 'Menu Level 1.1',
//        disabled: true
//      }, {
//        title: 'Menu Level 1.2',
//        subMenu: [{
//          title: 'Menu Level 1.2.1',
//          disabled: true
//        }]
//      }]
//    });
  }

})();
