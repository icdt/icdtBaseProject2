
angular.module('app', []).controller('EditGroupsCtrl', [
    '$scope', '$state', '$rootScope', 'GroupsFactory', 'PermissionsFactory', 'User',
    function ($scope, $state, $rootScope, GroupsFactory, PermissionsFactory, User) {

        // 可取代Groups為對應model名稱，例: Groups --> Order

        // 宣告vm
        $scope.vm = {};

        // 宣告變數, function, object
        $scope.vm.group = {};
        $scope.vm.allPermissions = [];
        $scope.vm.theOptions = [];

        // 動作
        // 儲存
        $scope.vm.save = function () {
            GroupsFactory.update($scope.vm.group).success(function (data) {

                $state.go('m.Groups.list');
            }).error(function (err) {
                console.log(err);
            });
        };
        // 刪除
        $scope.vm.remove = function () {
            GroupsFactory.remove($scope.vm.group).success(function (data) {

                $state.go('m.Groups.list');
            }).error(function (err) {
                console.log(err);
            });
        };

        // 使用者介面基本設定
        $scope.vm.isEdit = true;
        $scope.vm.group = $rootScope.selectedObj;
        debugger;
        PermissionsFactory.getAll().success(function (data) {
            $scope.vm.allPermissions = data;
        }).error(function (err) {
            console.log(err);
        });
        debugger;
        $scope.vm.theOptions = $scope.vm.group.RolesInGroup;


    }]);