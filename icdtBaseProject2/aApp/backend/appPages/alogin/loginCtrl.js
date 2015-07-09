app.controller('LoginCtrl', ['$scope', '$rootScope', 'User', '$state', '$global',function ($scope, $rootScope, User, $state, $global) {

    $scope.vm = {};
    $scope.vm.user = {};
    //$scope.vm.user = {
    //    UserName: 'manager',
    //    Password: 'manager',
    //    PersistData: ''
    //};

    $scope.vm.goToRegister = function () {
        $state.go('register');
    };

    $scope.vm.login = function () {
        if ($scope.vm.user.UserName == null || 
            $scope.vm.user.Password == null ||
            typeof $scope.vm.user.UserName == 'undefined' ||
            typeof $scope.vm.user.Password == 'undefined') {
            alert("請輸入帳號密碼");
            return;
        }
        debugger;
        User.authenticate($scope.vm.user.UserName, $scope.vm.user.Password, onSuccess, onFail, $scope.vm.user.PersistData);

    };

    function onSuccess() {
        $rootScope.loginUser = User.getUserData();
        $global.loginUser = User.getUserData();
        $state.go('m.Home.index');
    }

    function onFail(err) {
        console.log(err);
        alert('登入失敗');
    }


}]);