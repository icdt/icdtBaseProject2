
angular.module('app', []).controller('ListPermissionsCtrl', [
    '$scope', '$state', '$rootScope', 'PermissionsFactory',
    function ($scope, $state, $rootScope, PermissionsFactory) {

    // 可取代Permissions為對應model名稱，例: Permissions --> Order

    // 宣告vm
    $scope.vm = {};

    // 動作
    // 轉到新增頁面
    $scope.vm.goToCreateForm = function () {
        $state.go('m.Permissions.create');
    };
    // ui-grid修改按鈕事件, 寫在columnDefs中, 似乎無法用vm
    $scope.goToUpdateForm = function (obj) {
        $rootScope.selectedObj = obj;
        $state.go("m.Permissions.update");
    };
    $scope.goToDeleteForm = function (obj) {
        $rootScope.selectedObj = obj;
        $state.go("m.Permissions.delete");
    };

    // 取得data填充ui grid
    PermissionsFactory.getAll().success(function (data) {
        $scope.gridOptions.data = data;
    }).error(function (err) {
        console.log(err);
    });

    // 使用者介面基本設定
    $scope.gridOptions = {};
    $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: true };
    $scope.gridOptions.columnDefs = [
       { name: 'Edit', displayName: '編輯', cellTemplate: '<button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.goToUpdateForm(row.entity)" helf= >編輯</button> ', width: 100, pinnedLeft: true },
       { name: 'Delete', displayName: '刪除', cellTemplate: '<button type="button" class="btn btn-small btn-danger btn-flat" ng-click="grid.appScope.gotToDeleteForm(row.entity)" helf= >刪除</button> ', width: 100, pinnedLeft: true },
       { name: 'Name', displayName: '群組名稱', width: 150 },
       { name: 'Description', displayName: '描述', width: 200 }
    ];


}]);