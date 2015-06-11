angular.module('icdt.states.m.order', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.order', {
            abstract: true,
            url: '/order',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.order.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mOrder/list.html',
	                controller: 'ListOrderCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mOrder/list.js');
	            }]
	        }
	    })
//--------Create----------------------------------------------
    	.state('m.order.create', {
    	    url: '/:id',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mOrder/form.html',
    	            controller: 'CreateOrderCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mOrder/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.order.edit', {
        	url: '/edit',
        	views: {
        	    'content@m': {
        	        templateUrl: 'appPages/mOrder/form.html',
        	        controller: 'EditOrderCtrl'
        	    }
        	},
        	resolve: {
        	    loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        	        // you can lazy load files for an existing module
        	        return $ocLazyLoad.load('appPages/mOrder/edit.js');
        	    }]
        	}
        })
    ;

}]);