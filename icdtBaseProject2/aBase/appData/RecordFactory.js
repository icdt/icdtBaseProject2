app.factory('RecordFactory', ['$q', '$http', function ($q, $http) {

    //總體路徑api
    var api = "http://sinchanapitest.azurewebsites.net/api";

    return {

        //取得所有訂單項目
        getRecordAll: function (start, end) {

            var deferred = $q.defer();

            $http.get(api + "/orders/customer/drivertype?start={*0}&end={*1}".replace("{*0}", start).replace("{*1}", end)).success(function (data) {

                return deferred.resolve(data);

            }).error(function (err) {
                return deferred.reject(err);
            });

            return deferred.promise;

        }

    }
}]);
