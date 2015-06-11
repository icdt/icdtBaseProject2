
angular.module('app', []).controller('CreateOrderCtrl', [
    '$scope', '$state', '$rootScope', 'OrderFactory',
    function ($scope, $state, $rootScope, OrderFactory) {

    // 可取代Order為對應model名稱，例: Order --> Order

    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.Order = {};

    // 動作
    $scope.vm.save = function () {
        OrderFactory.create($scope.vm.Order).success(function (data) {
            $state.go('m.CRUD.list');
        }).error(function (err) {
            console.log(err);
        });

    };
    // 使用者介面基本設定
    $scope.vm.isEdit = false;

    
}]);