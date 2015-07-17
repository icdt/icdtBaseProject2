app.factory('icdtdatasFactory', ['$http', 'UrlHelper', '$q', 'DatetimeService', '$timeout', 'OptionService', function ($http, UrlHelper, $q, DatetimeService, $timeout, OptionService) {

    return{
                        
        // crud
        getAll: function () {
            var url = UrlHelper.prepareUrl('api/icdtdatas');
            return $http.get(url);
        },
        getOne: function (ppId) {
            var url = UrlHelper.prepareUrl('api/icdtdatas/' + ppId);
            return $http.get(url);
        },
        getByKeyword: function (ppStr) {
            var url = UrlHelper.prepareUrl('api/icdtdatas?q=' + ppStr);
            return $http.get(url);
        },
        getByDate: function (ppDate) {
            var url = UrlHelper.prepareUrl('api/icdtdatas?date' + ppDate);
            return $http.get(url);
        },
        getByDateInterval: function (ppStart, ppEnd) {
            var url = UrlHelper.prepareUrl('api/icdtdatas?start=' + ppDappStartte + '&end=' + ppEnd);
            return $http.get(url);
        },
        create: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/icdtdatas');
            return $http.post(url, ppObj);
        },
        update: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/icdtdatas/' + ppObj.Id);
            return $http.put(url, ppObj);
        },
        remove: function (ppId) {
            var url = UrlHelper.prepareUrl('api/icdtdatas/' + ppId);
            return $http.delete(url);
        },

        // 轉換datetime格式
        transformData: function (objs) {

            angular.forEach(objs, function (item) {
                item.StartDate = DatetimeService.formatDate(new Date(item.StartDate), "/");
                item.EndDate = DatetimeService.formatDate(new Date(item.EndDate), "/");
                item.Checklist = OptionService.arrayToChecklist(item.Checklist, OptionService.INVO_TYPE);
            });

            return objs;
        },

        // autocomplete
        getAutoCompleteOptions: function (data, i) {
            var moviedata = $q.defer();
            var movies;
            var moreMovies = [];

            for (var j = 0; j < data.length; j++) {
                moreMovies.push(data[j].CUST_NAME);
            }

            if (i && i.indexOf('T') != -1)
                movies = moreMovies;
            else
                movies = moreMovies;

            $timeout(function () {
                moviedata.resolve(movies);
            }, 1000);

            return moviedata.promise
        },
    };

}]);

