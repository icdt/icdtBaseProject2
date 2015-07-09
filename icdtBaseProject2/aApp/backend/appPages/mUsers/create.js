
angular.module('app', []).controller('CreateUsersCtrl', [
    '$scope', '$state', '$rootScope', 'ngToast', 'UsersFactory', 'ngToast',
    function ($scope, $state, $rootScope, ngToast, UsersFactory, ngToast) {

    // 可取代Users為對應model名稱，例: Users --> Order

    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.theUser = {};

    // 動作
    $scope.vm.save = function () {

        ngToast.create({
            className: 'danger',
            content: '新增使用者帳號中...'
        });

        UsersFactory.create($scope.vm.theUser).success(function (data) {
            
            ngToast.create({
                className: 'success',
                content: '新增帳號成功'
            });

            $state.go('m.Users.list');
        }).error(function (err) {

            var modelState = err['ModelState'][''];
            var str = '';
            angular.forEach(modelState, function(item){
                str += item + '<br/>';
            });
            str += '新增失敗';
            ngToast.create({
                className: 'warning',
                //additionalClasses: 'toast_text_left',
                content: str,
                timeout: 7000
            });

        });

    };
    // 使用者介面基本設定
    $scope.vm.isEdit = false;

    
}]);