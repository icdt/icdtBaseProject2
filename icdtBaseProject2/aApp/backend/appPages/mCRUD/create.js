
angular.module('app', []).controller('CreateicdtdataCtrl', [
    '$scope', '$state', '$rootScope', 'icdtdataFactory',
    function ($scope, $state, $rootScope, icdtdataFactory) {

    // 可取代icdtdata為對應model名稱，例: icdtdata --> Order

    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.icdtdata = {};

    // 動作
    $scope.vm.save = function () {
        icdtdataFactory.create($scope.vm.icdtdata).success(function (data) {
            $state.go('m.CRUD.list');
        }).error(function (err) {
            console.log(err);
        });

    };
    // 使用者介面基本設定
    $scope.vm.isEdit = false;

    
}]);