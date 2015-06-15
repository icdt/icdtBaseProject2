
angular.module('app', []).controller('CreateUsersCtrl', [
    '$scope', '$state', '$rootScope', 'UsersFactory',
    function ($scope, $state, $rootScope, UsersFactory) {

    // 可取代Users為對應model名稱，例: Users --> Order

    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.theUser = {};

    // 動作
    $scope.vm.save = function () {
        User.create($scope.vm.theUser).success(function (data) {
            $state.go('m.Users.list');
        }).error(function (err) {
            console.log(err);
        });

    };
    // 使用者介面基本設定
    $scope.vm.isEdit = false;

    
}]);