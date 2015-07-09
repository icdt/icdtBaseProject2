app.controller('UserChangePasswordCtrl', ['$scope', '$state', '$rootScope', 'UsersFactory', function ($scope, $state, $rootScope, UsersFactory) {

    $scope.vm = {}

    $scope.vm.Member = {
        Email: "",
        UserName:"",
        NewPassword: "",
        OldPassword: "",
        ConfirmPassword:""
    };

    $scope.vm.changePass = function () {
        debugger; 
        UsersFactory.changePass($scope.vm.Member).success(function () {
            alert('更改成功');
            $state.go('login');
        }).error(function () {
            alert('請確認您輸入的資料是否正確');
        });
    };
}]);