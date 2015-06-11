
var app = angular.module('app', [
    'ui.router',
    'ui.grid',
    'ui.grid.selection',
    'ui.grid.edit',
    'ui.grid.resizeColumns',
    'ui.grid.cellNav',
    'ui.grid.autoResize',
    'checklist-model'
]);

app.run(['$rootScope', '$state', '$stateParams',
function ($rootScope, $state, $stateParams) {

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

}
]);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/welcome');

    $stateProvider
      .state('main', {
          abstract: true,
          url: '',
          templateUrl: '/aBase/appPages/aMain/main.html',
          controller: 'MainCtrl'
      })



    .state('main.welcome', {
        url: '/welcome',
        templateUrl: '/aBase/appPages/aMain/welcome.html',
        controller: ''
    })
    .state('main.codeStandard', {
        abstract: true,
        url: '/codeStandard',
        template: '<div ui-view></div>',
        controller: ''
    })
            .state('main.codeStandard.aspnet', {
                url: '/aspnet',
                templateUrl: '/aBase/appPages/aCodeStardard/aspnet.html',
                controller: ''
            })
            .state('main.codeStandard.entityframework', {
                url: '/entityframework',
                templateUrl: '/aBase/appPages/aCodeStardard/entityframework.html',
                controller: ''
            })
            .state('main.codeStandard.angular', {
                url: '/angular',
                templateUrl: '/aBase/appPages/aCodeStardard/angular.html',
                controller: ''
            })
    .state('main.codeStandard.crud', {
        abstract: true,
        url: '/crud',
        templateUrl: '/aBase/appPages/aCodeStardard//crud/layout.html'
    })
    .state('main.codeStandard.crud.content', {
        url: '/content',
        views: {
            list: {
                templateUrl: '/aBase/appPages/aCodeStardard//crud/list.html',
                controller: 'CrudListCtrl'
            },
            form: {
                templateUrl: '/aBase/appPages/aCodeStardard//crud/form.html',
                controller: ''
            },
            api: {
                templateUrl: '/aBase/appPages/aCodeStardard//crud/api.html',
                controller: ''
            }
        }
    })
    .state('main.checkListModel', {
        url: '/checkListModel',
        templateUrl: '/aBase/appPages/bForm/checkbox/index.html',
        controller: 'ChecklistModelCtrl'
    })

    ;
}]);