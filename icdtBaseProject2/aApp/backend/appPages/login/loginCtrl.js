app.controller('LoginCtrl', ['$scope', '$rootScope', 'User', '$state', function ($scope, $rootScope, User, $state) {

    $scope.vm = {};

    $scope.vm.user = {
        UserName: 'customer1',
        Password: 'abc123',
        PersistData: ''
    };

    $scope.vm.login = function () {

        User.authenticate($scope.vm.user.UserName, $scope.vm.user.Password, onSuccess, onFail, $scope.vm.user.PersistData);

    };

    function onSuccess() {
        $rootScope.loginUser = User.getUserData();
        $state.go('m.CRUD.list');
    }

    function onFail(err) {
        console.log(err);
        alert('登入失敗');
    }


}]);