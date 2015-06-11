app.factory('DemandFactory', ['$q', '$http', function ($q, $http) {

    //總體路徑api
    var api = "http://sinchanapitest.azurewebsites.net/api";
    //var api = 'http://localhost:56249/api';

    //月份帳項目
    var DebtAll = [
        {
            text: "本月帳",
            value: "0"
        },
        {
            text: "次月帳",
            value: "1"
        },
        {
            text: "前月帳",
            value: "2"
        }
    ];

    //可收件時間區間
    var ReceiveAreaAll = [
        {
            text: "不指定",
            value: "0"
        },
        {
            text: "上午",
            value: "1"
        },
        {
            text: "下午",
            value: "2"
        }
    ];

    //倉儲地點項目
    var WarehousingAll = [
        {
            text: "CA",
            value: "1"
        },
        {
            text: "CW",
            value: "2"
        },
        {
            text: "CV",
            value: "3"
        },
        {
            text: "CS",
            value: "4"
        }
    ];

    return {

        //月份帳項目
        itemDebt: function () {
            return DebtAll;
        },

        //可收件時間區間
        itemReceiveArea: function () {
            return ReceiveAreaAll;
        },

        //倉儲地點項目
        itemWarehousing: function () {
            return WarehousingAll;
        },

        //併車/專車項目
        itemCarT: function () {
            return CarTAll;
        },

        //建立快遞需求單
        createDemand: function (obj) {
            var deferred = $q.defer();

            $http.post(api + "/orders/customer/drivertype", obj).success(function (data) {
                alert('建立成功');
                return deferred.resolve(data);

            }).error(function (err) {
                return deferred.reject(err);
            });

            return deferred.promise;
        },


        //取得所有訂單項目
        getOrderAll: function (type, customerid, start, end) {

            //console.log(type,customerid,start,end);
            //debugger;
            return $http.get(api + "/orders/employee/drivertype?"
                + "customerid=" + customerid + "&"
                + "start=" + start + "&"
                + "end=" + end);


        },



        //取得所有客戶項目
        getCustomerAll: function (companyid) {

            var deferred = $q.defer();

            $http.get(api + "/selector/endcustomers/" + companyid).success(function (data) {

                return deferred.resolve(data);

            }).error(function (err) {
                return deferred.reject(err);
            });

            return deferred.promise;
        },

        //取得司機所帶的訂單資料
        //get /orders/employee/drivertype/:driverid?status={*1}
        getDriverOrder: function (driverid, status) {

            return $http.get(api + "/orders/employee/drivertype/" + driverid + "?status=" + status);

        },



        //取得所有併車/專車項目
        getCarTAll: function () {

            var deferred = $q.defer();

            $http.get(api + "/selector/orderdivertrucks").success(function (data) {

                return deferred.resolve(data);

            }).error(function (err) {
                return deferred.reject(err);
            });

            return deferred.promise;
        },

        //取得不重複項目
        getDistinct: function (data) {
            return _.uniq(data, 'area');
        },

        //取得篩選項目
        getSearch: function (area, data) {

            return _.filter(data, function (item) {
                return item.area == area;
            });

        },

        //建立提貨客戶
        createCustomer: function (companyid, obj) {
            var deferred = $q.defer();

            $http.post(api + "/selector/endcustomers/" + companyid, obj).success(function (data) {
                alert('建立成功');
                return deferred.resolve(data);

            }).error(function (err) {
                return deferred.reject(err);
            });

            return deferred.promise;
        },

        //修改提貨客戶
        updateCustomer: function (obj) {
            var data = [];

            if (localStorage['Customer'] != null) {
                data = JSON.parse(localStorage['Customer']);
            }

            var theIndex = _.findIndex(data, function (item) {
                return item.id == obj.id;
            });

            data[theIndex] = obj;
            localStorage['Customer'] = JSON.stringify(data);

            alert('修改完成');
        },
        //更新訂單
        updateOrder: function (ppId, ppObj) {
            return $http.put(api + '/orders/employee/drivertype/' + ppId, ppObj);
        },

        

    }
}]);
