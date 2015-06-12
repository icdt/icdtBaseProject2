var app = angular.module('app', [
    'ui.router',
    'oc.lazyLoad',
    'ngToast',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'UIGRID',
    'icdt.settings',
    'utility',
    'checklist-model',

    //state
    'icdt.states.m',
    'icdt.states.m.CRUD',
    'icdt.states.m.Groups'

]);

app.run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            // 一進站新看localStorage內有沒有登入資訊
            try {
                User.isAuthenticated();
                $rootScope.loginUser = User.getUserData();
            } catch (e) {
                // do nothing with this error
            }

            // 若未驗證成功會有stateChangeError, 判斷error名字，轉到登入會面
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                if (error.name === 'AuthenticationRequired') {
                    //User.setNextState(toState.name, 'You must login to access this page');
                    //alert("Login error, pls check user/pass");
                    $state.go('login', {}, { reload: true });
                }
            });

            //今天日期
            $rootScope.newDate = function () {
                var date = new Date();
                return date;
            }

            //增加指定天數
            $rootScope.addDate = function (obj) {
                var date = addDays(new Date(), obj);
                return date;
            }

            //定義時間格式
            $rootScope.formatDate = function getFormattedDate(date) {
                var year = date.getFullYear();
                var month = (1 + date.getMonth()).toString();
                month = month.length > 1 ? month : '0' + month;
                var day = date.getDate().toString();
                day = day.length > 1 ? day : '0' + day;
                return year + '-' + month + '-' + day;
            }

            //定義增加天數
            function addDays(theDate, days) {
                return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
            }
            //訂單明細
            $rootScope.orderlist = "";

            //編輯訂單
            $rootScope.editOrderitem = "";


        }
]);


app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'ngToastProvider',
function ($stateProvider, $urlRouterProvider, $httpProvider, ngToastProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('login', {
        url: '/',
        templateUrl: 'appPages/login/index.html',
        controller: 'LoginCtrl',
        resolve: {
            bodyClass: ['$rootScope', function ($rootScope) {
                $rootScope.bodyClass = 'login-page';
                //$rootScope.wrapperClass = 'login-box';
            }]
        }
    })
    ;

    ngToastProvider.configure({
        animation: 'slide' // or 'fade'
        //verticalPosition: 'bottom',
        //horizontalPosition:'center'
    });

}]);

angular.module('UIGRID', ['ui.grid', 'ui.grid.selection', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.cellNav', 'ui.grid.autoResize']);