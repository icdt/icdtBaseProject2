app.controller('ChecklistModelCtrl', ['$scope', function ($scope) {

    $scope.vm = {};

    // 所有的選項
    $scope.vm.allOptions = [
        {
            id: 1,
            text: 'apple'
        },
        {
            id: 2,
            text: 'banana'
        },
        {
            id: 3,
            text: 'car'
        },
        {
            id: 4,
            text: 'duck'
        }
    ];

    // 使用者的選擇
    $scope.vm.theOptions = [];

}]);