app.factory('AccountFactory', ['$q', '$http', function ($q, $http) {

    //總體路徑api
    var api = "http://sinchanapitest.azurewebsites.net/api/";

    return {

        //取得所有項目
        getAll: function () {

            var deferred = $q.defer();

            $http.get(api + "account").success(function (data) {

                return deferred.resolve(data);

            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        }

    }
}]);
