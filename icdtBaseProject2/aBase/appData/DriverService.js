

app.factory('DriverService', ['$http', function ($http) {

    var api = "http://sinchanapitest.azurewebsites.net/api";

    return {
        getAll: function () {
            return $http.get(api + '/driver/employeetype');
        },
        getOne: function (objId) {
            return $http.get(api + '/driver/employeetype/' + objId);
        },
        create: function (ppObj) {
            return $http.post(api + '/driver/employeetype', ppObj);
        },
        update: function (ppId, ppObj) {
            return $http.put(api + '/driver/employeetype/' + ppId, ppObj);
        },
        remove: function (ppId) {
            return $http.delete(api + '/driver/employeetype/' + ppId);
        }
    };
}]);


//app.factory('DriverService', ['$http', function ($http) {


//    var api = "http://sinchanapitest.azurewebsites.net/api";


//    // check if order exist in localStorage
//    var _order;
//    if (localStorage['driver'] == null) {
//        // have some order 
//        _order = [
//        {
//            DriverId: '張三風'
//        },
//        {
//            DriverId: '張五紀'
//        },
//        {
//            DriverId: '郭進'
//        },
//        {
//            DriverId: '黃榕'
//        },
//        {
//            DriverId: '郭芙'
//        },
//        {
//            DriverId: '洪漆公'
//        },
//        {
//            DriverId: '段芋'
//        },
//        {
//            DriverId: '歐陽豐'
//        }


//        ];
//        localStorage['driver'] = JSON.stringify(_order);
//    } else {

//    }

//    return {

//        getAll: function () {
//            //return an array
//            //var returnorder = JSON.parse(localStorage['driver']);
//            //return returnorder;
//            var data= $http.get(api + "/driver/employeetype");

//            return data;
//        },
//        getOne: function (ppId) {
//            //return single obj
//            var order = JSON.parse(localStorage['driver']);
//            var returnorder = _find(order, function (itme) { item.id == order.id });
//            return returnorder;
//        },

//        //建立司機
//        createDriver: function (obj) {
//            return $http.post(api + "/driver/employeetype", obj);
//        },

//        // post /drivers

//        create: function (ppObj) {

//            var order = JSON.parse(localStorage['driver']);

//            // generate uuid for new obj
//            var newId = $uuid.newuuid();
//            ppObj.id = newId;

//            order.push(ppObj);
//            localStorage['driver'] = JSON.stringify(order);

//            return newId;



//        },
//        update: function (ppObj) {

//            var order = JSON.parse(localStorage['driver']);

//            // find index of ppObj in array
//            var theIndex = _findIndex(order, function (item) {
//                return item.id == ppObj.id;
//            });

//            // apply ppObj by array index
//            order[theIndex] = ppObj;
//            localStorage['driver'] = JSON.stringify(order);

//            return 'OK';
//        },

//        remove: function (ppId) {

//            var order = JSON.parse(localStorage['driver']);

//            // remove corresponding obj from array
//            _.remove(order, function (item) {
//                return item.id == ppId;
//            });

//            localStorage['driver'] = JSON.stringify(order);

//            return 'OK';
//        }
//    };
//}])


//app.factory("$uuid", function () {
//    return {
//        newuuid: function () {
//            // http://www.ietf.org/rfc/rfc4122.txt
//            // 41979d3-0376-4da5-9087-535df803b721
//            var s = [];
//            var hexDigits = "0123456789abcdef";
//            for (var i = 0; i < 8; i++) {
//                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
//            }
//            //s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
//            //s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
//            //s[8] = s[13] = s[18] = s[23] = "-";
//            return s.join("");
//        }
//    }
//});