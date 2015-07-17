angular.module('icdt.states.m', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider

	.state('m', {
	    abstract: true,
	    url: '/m',
	    views: {
	        '@': {
	            templateUrl: 'appPages/m/main.html',
                controller:''
	        }
	    },
	    resolve: {
	        bodyClass: ['$rootScope', function ($rootScope) {
	            $rootScope.bodyClass = 'skin-blue layout-boxed sidebar-mini fixed';
	            //$rootScope.wrapperClass = 'wrapper';
	        }],
	        user: 'User',
	        authenticationRequired: ['user', function (user) {
	            user.isAuthenticated();
	        }]
	    }
	})
    ;

}]);