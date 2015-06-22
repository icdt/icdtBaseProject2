
angular.module('app', []).controller('CreateCSVCtrl', [
    '$scope', '$state', '$rootScope', 'CSVFactory',
    function ($scope, $state, $rootScope, CSVFactory) {

    // 可取代CSV為對應model名稱，例: CSV --> Order

    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.SingleObj = {};

    // 動作
    $scope.vm.save = function () {
        CSVFactory.create($scope.vm.SingleObj).success(function (data) {
            $state.go('m.CSV.list');
        }).error(function (err) {
            console.log(err);
        });

    };
    // 使用者介面基本設定
    $scope.vm.isEdit = false;

    
}]);