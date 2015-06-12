angular.module('icdt.states.m.Groups', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.Groups', {
            abstract: true,
            url: '/Groups',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.Groups.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mGroups/list.html',
	                controller: 'ListGroupsCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mGroups/list.js');
	            }]
	        }
	    })
//--------Create----------------------------------------------
    	.state('m.Groups.create', {
    	    url: '/create',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mGroups/form.html',
    	            controller: 'CreateGroupsCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mGroups/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.Groups.edit', {
        	url: '/edit',
        	views: {
        	    'content@m': {
        	        templateUrl: 'appPages/mGroups/form.html',
        	        controller: 'EditGroupsCtrl'
        	    }
        	},
        	resolve: {
        	    loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        	        // you can lazy load files for an existing module
        	        return $ocLazyLoad.load('appPages/mGroups/edit.js');
        	    }]
        	}
        })
    ;

}]);