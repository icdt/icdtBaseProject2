app.factory('icdtdataFactory', ['$http', 'UrlHelper', function ($http, UrlHelper) {
    
    return{
        // checklist, select選項
        allLocationOptions:[{},{},{}],
                        
        // crud
        getAll: function () {
            var url = UrlHelper.prepareUrl('api/icdtdata');
            return $http.get(url);
        },
        getOne: function (ppId) {
            var url = UrlHelper.prepareUrl('api/icdtdata/' + ppId);
            return $http.get(url);
        },
        getByKeyword: function (ppStr) {
            var url = UrlHelper.prepareUrl('api/icdtdata?q=' + ppStr);
            return $http.get(url);
        },
        getByDate: function (ppDate) {
            var url = UrlHelper.prepareUrl('api/icdtdata?date' + ppDate);
            return $http.get(url);
        },
        getByDateInterval: function (ppStart, ppEnd) {
            var url = UrlHelper.prepareUrl('api/icdtdata?start=' + ppDappStartte + '&end=' + ppEnd);
            return $http.get(url);
        },
        getByName: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/icdtdata?name=' + ppObj.Name);
            return $http.get(url);
        },
        create: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/icdtdata');
            return $http.post(url, ppObj);
        },
        update: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/icdtdata/' + ppObj.Id);
            return $http.put(url, ppObj);
        },
        remove: function (ppId) {
            var url = UrlHelper.prepareUrl('api/icdtdata/' + ppId);
            return $http.delete(url);
        }
    };

}]);

