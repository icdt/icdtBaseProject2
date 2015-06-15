angular.module('icdt.states.m.Users', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.Users', {
            abstract: true,
            url: '/Users',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.Users.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mUsers/list.html',
	                controller: 'ListUsersCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mUsers/list.js');
	            }]
	        }
	    })
//--------Create----------------------------------------------
    	.state('m.Users.create', {
    	    url: '/create',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mUsers/form.html',
    	            controller: 'CreateUsersCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mUsers/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.Users.edit', {
        	url: '/edit',
        	views: {
        	    'content@m': {
        	        templateUrl: 'appPages/mUsers/form.html',
        	        controller: 'EditUsersCtrl'
        	    }
        	},
        	resolve: {
        	    loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        	        // you can lazy load files for an existing module
        	        return $ocLazyLoad.load('appPages/mUsers/edit.js');
        	    }]
        	}
        })
    ;

}]);