angular.module('icdt.states.m.CRUD', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.CRUD', {
            abstract: true,
            url: '/CRUD',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.CRUD.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mCRUD/list.html',
	                controller: 'ListicdtdataCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mCRUD/list.js');
	            }]
	        }
	    })
//--------Create----------------------------------------------
    	.state('m.CRUD.create', {
    	    url: '/create',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mCRUD/form.html',
    	            controller: 'CreateicdtdataCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mCRUD/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.CRUD.edit', {
        	url: '/edit',
        	views: {
        	    'content@m': {
        	        templateUrl: 'appPages/mCRUD/form.html',
        	        controller: 'EditicdtdataCtrl'
        	    }
        	},
        	resolve: {
        	    loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        	        // you can lazy load files for an existing module
        	        return $ocLazyLoad.load('appPages/mCRUD/edit.js');
        	    }]
        	}
        })
    ;

}]);