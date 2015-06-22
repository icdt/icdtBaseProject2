angular.module('icdt.states.m.CSV', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.CSV', {
            abstract: true,
            url: '/CSV',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.CSV.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mCSV/list.html',
	                controller: 'ListCSVCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mCSV/list.js');
	            }]
	        }
	    })
//--------Create----------------------------------------------
    	.state('m.CSV.create', {
    	    url: '/create',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mCSV/form.html',
    	            controller: 'CreateCSVCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mCSV/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.CSV.edit', {
        	url: '/edit',
        	views: {
        	    'content@m': {
        	        templateUrl: 'appPages/mCSV/form.html',
        	        controller: 'EditCSVCtrl'
        	    }
        	},
        	resolve: {
        	    loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        	        // you can lazy load files for an existing module
        	        return $ocLazyLoad.load('appPages/mCSV/edit.js');
        	    }]
        	}
        })
    ;

}]);