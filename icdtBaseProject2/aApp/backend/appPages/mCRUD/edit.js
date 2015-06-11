
angular.module('app', []).controller('EditicdtdataCtrl', [
    '$scope', '$state', '$rootScope', 'icdtdataFactory',
    function ($scope, $state, $rootScope, icdtdataFactory) {

    // 可取代icdtdata為對應model名稱，例: icdtdata --> Order

    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.icdtdata = {};

    // 動作
    // 儲存
    $scope.vm.save = function () {
        icdtdataFactory.update($scope.vm.icdtdata).success(function (data) {

            $state.go('m.CRUD.list');
        }).error(function (err) {
            console.log(err);
        });
    };
    // 刪除
    $scope.vm.remove = function () {
        icdtdataFactory.remove($scope.vm.icdtdata).success(function (data) {

            $state.go('m.CRUD.list');
        }).error(function (err) {
            console.log(err);
        });
    };

    // 使用者介面基本設定
    $scope.vm.isEdit = true;
    $scope.vm.icdtdata = $rootScope.selectedObj;


}]);