
angular.module('app', []).controller('CreateGroupsCtrl', [
    '$scope', '$state', '$rootScope', 'GroupsFactory', 'PermissionsFactory',
    function ($scope, $state, $rootScope, GroupsFactory, PermissionsFactory) {

    // 可取代Groups為對應model名稱，例: Groups --> Order

    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.group = {};
    $scope.vm.allPermissions = [];
    $scope.vm.theOptions = [];

    // 動作
    $scope.vm.save = function () {
        GroupsFactory.create($scope.vm.group).success(function (data) {
            debugger;
            if ($scope.vm.theOptions.length != 0) {
                data.RolesInGroup = $scope.vm.theOptions;
                GroupsFactory.update(data).success(function (data) {
                    $state.go('m.Groups.list');
                }).error(function (err) {
                    console.log(err);
                });
            } else {
                 $state.go('m.Groups.list');
            }
        }).error(function (err) {
            console.log(err);
        });

    };
    // 使用者介面基本設定
    $scope.vm.isEdit = false;

    PermissionsFactory.getAll().success(function (data) {
        $scope.vm.allPermissions = data;
    }).error(function (err) {
        console.log(err);
    });
    
}]);