
app.controller('CrudListCtrl', ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {

    // 宣告vm
    $scope.vm = {};

    //動作
    //ui-grid修改訂單按鈕事件
    $scope.edit = function (obj) {
        $rootScope.selectedCompany = obj;
        $state.go("m.customerCompany.edit");
    };

    // 轉到新增頁面
    $scope.vm.goToCreateForm = function () {
        $state.go('m.customerCompany.create');
    };

    
    // ui grid
    $scope.gridOptions = {};
    $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: true };
    $scope.gridOptions.columnDefs = [
       { name: 'EditOrder', displayName: '修改', cellTemplate: '<button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.edit(row.entity)" helf= >編輯訂單</button> ', width: 100, pinnedLeft: true },
       { name: 'CompanyName', displayName: '公司/單位名稱', width: 150 },
       { name: 'Aliases', displayName: '別名', width: 120 },
       { name: 'VATnumber', displayName: '統一編號', width: 120 },
       { name: 'CompanyAddress', displayName: '地址', width: 220 },
       { name: 'CompanyTel1', displayName: '電話', width: 120 },
       { name: 'CompanyFax', displayName: '傳真', width: 120 }
    ];

    // 取得所有公司
    $scope.gridOptions.data = [];


}]);