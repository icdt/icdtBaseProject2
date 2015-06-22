
angular.module('app', []).controller('ListCSVCtrl', [
    '$scope', '$state', '$rootScope', 
    function ($scope, $state, $rootScope) {

    // 宣告vm
    $scope.vm = {};

    // 動作
    $scope.vm.uploadCSV = function () {
        // file upload

    };


    // 取得data填充ui grid
    

    // 使用者介面基本設定
    $scope.gridOptions = {};
    $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: true };
    $scope.gridOptions.columnDefs = [
       //{ name: 'Edit', cellTemplate: '<button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.goToUpdateForm(row.entity)" helf= >編輯</button> ', width: 100, pinnedLeft: true },
       //{ name: 'Delete', cellTemplate: '<button type="button" class="btn btn-small btn-danger btn-flat" ng-click="grid.appScope.gotToDeleteForm(row.entity)" helf= >刪除</button> ', width: 100, pinnedLeft: true },
       { name: 'CompanyName', width: 100 },
       { name: 'Aliases',  width: 100 },
       { name: 'VATnumber', width: 100 },
       { name: 'CompanyAddress', width: 100 },
       { name: 'CompanyTel1', width: 100 },
       { name: 'CompanyFax', width: 100 }
    ];


}]);