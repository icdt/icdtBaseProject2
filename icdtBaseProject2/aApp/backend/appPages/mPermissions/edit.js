
angular.module('app', []).controller('EditPermissionsCtrl', [
    '$scope', '$state', '$rootScope', 'PermissionsFactory',
    function ($scope, $state, $rootScope, PermissionsFactory) {

    // 可取代Permissions為對應model名稱，例: Permissions --> Order

    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.Permissions = {};

    // 動作
    // 儲存
    $scope.vm.save = function () {
        PermissionsFactory.update($scope.vm.Permissions).success(function (data) {

            $state.go('m.Permissions.list');
        }).error(function (err) {
            console.log(err);
        });
    };
    // 刪除
    $scope.vm.remove = function () {
        PermissionsFactory.remove($scope.vm.Permissions).success(function (data) {

            $state.go('m.Permissions.list');
        }).error(function (err) {
            console.log(err);
        });
    };

    // 使用者介面基本設定
    $scope.vm.isEdit = true;
    $scope.vm.Permissions = $rootScope.selectedObj;


}]);