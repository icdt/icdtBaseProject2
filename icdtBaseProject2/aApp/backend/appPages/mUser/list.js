
angular.module('app', []).controller('ListGroupsCtrl', [
    '$scope', '$state', '$rootScope', 'GroupsFactory',
    function ($scope, $state, $rootScope, GroupsFactory) {

    // 可取代Groups為對應model名稱，例: Groups --> Order

    // 宣告vm
    $scope.vm = {};

    // 動作
    // 轉到新增頁面
    $scope.vm.goToCreateForm = function () {
        $state.go('m.Groups.create');
    };
    // ui-grid修改按鈕事件, 寫在columnDefs中, 似乎無法用vm
    $scope.goToUpdateForm = function (obj) {
        $rootScope.selectedObj = obj;
        $state.go("m.Groups.update");
    };
    $scope.goToDeleteForm = function (obj) {
        $rootScope.selectedObj = obj;
        $state.go("m.Groups.delete");
    };

    // 取得data填充ui grid
    GroupsFactory.getAll().success(function (data) {
        $scope.gridOptions.data = data;
    }).error(function (err) {
        console.log(err);
    });

    // 使用者介面基本設定
    $scope.gridOptions = {};
    $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: true };
    $scope.gridOptions.columnDefs = [
       { name: 'Edit', displayName: '修改', cellTemplate: '<button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.goToUpdateForm(row.entity)" helf= >編輯</button> ', width: 100, pinnedLeft: true },
       { name: 'Delete', displayName: '刪除', cellTemplate: '<button type="button" class="btn btn-small btn-danger btn-flat" ng-click="grid.appScope.gotToDeleteForm(row.entity)" helf= >刪除</button> ', width: 100, pinnedLeft: true },
       { name: 'CompanyName', displayName: '公司/單位名稱', width: 150 },
       { name: 'Aliases', displayName: '別名', width: 120 },
       { name: 'VATnumber', displayName: '統一編號', width: 120 },
       { name: 'CompanyAddress', displayName: '地址', width: 220 },
       { name: 'CompanyTel1', displayName: '電話', width: 120 },
       { name: 'CompanyFax', displayName: '傳真', width: 120 }
    ];


}]);