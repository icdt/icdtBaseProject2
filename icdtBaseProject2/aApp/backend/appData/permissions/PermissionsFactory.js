app.factory('GroupsFactory', ['$http', function ($http) {

    return {
       
        // crud
        getAll: function () {
            var url = UrlHelper.prepareUrl('api/groups');
            return $http.get(url);
        },
        getByName: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/groups?name=' + ppObj.Name);
            return $http.get(url);
        },
        create: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/groups');
            return $http.post(url, ppObj);
        },
        update: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/groups/' + ppObj.Id);
            return $http.put(url, ppObj);
        },
        remove: function (ppId) {
            var url = UrlHelper.prepareUrl('api/groups/' + ppId);
            return $http.delete(url);
        },
        setUserGroups: function (ppUserId, ppGroups) {
            var url = UrlHelper.prepareUrl('api/user/' + ppUserId + '/userGroups');
            return $http.delete(url, ppGroups);
        }
    };
}]);

app.factory('PermissionsFactory', ['$http', 'UrlHelper', function ($http, UrlHelper) {

    
    return {

        getAll: function () {
            var url = UrlHelper.prepareUrl('api/permissions');
            return $http.get(url);
        }


    };
}]);