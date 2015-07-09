app.controller('RegisterCtrl', ['$scope', '$state', '$rootScope', 'UsersFactory', function ($scope, $state, $rootScope, UsersFactory) {

   
    $scope.vm = {}
    $scope.vm.Member = {
        UserName: "",
        Email: "",
        Password: "",
        ConfirmPassword:""
    };

    $scope.vm.CreateUser = function () {
       
        UsersFactory.create($scope.vm.Member).success(function () {
           
            alert('註冊成功');
            $state.go('login');

        }).error(function (err, nrr, grr) {
            debugger;
            alert(err.Message);
        });
    };

}]);