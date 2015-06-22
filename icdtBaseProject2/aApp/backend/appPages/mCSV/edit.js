
angular.module('app', []).controller('EditCSVCtrl', [
    '$scope', '$state', '$rootScope', 'CSVFactory',
    function ($scope, $state, $rootScope, CSVFactory) {

    // 可取代CSV為對應model名稱，例: CSV --> Order

    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.singleObj = {};

    // 動作
    // 儲存
    $scope.vm.save = function () {
        CSVFactory.update($scope.vm.singleObj).success(function (data) {

            $state.go('m.CSV.list');
        }).error(function (err) {
            console.log(err);
        });
    };
    // 刪除
    $scope.vm.remove = function () {
        CSVFactory.remove($scope.vm.singleObj).success(function (data) {

            $state.go('m.CSV.list');
        }).error(function (err) {
            console.log(err);
        });
    };

    // 使用者介面基本設定
    $scope.vm.isEdit = true;
    $scope.vm.singleObj = $rootScope.selectedObj;


}]);