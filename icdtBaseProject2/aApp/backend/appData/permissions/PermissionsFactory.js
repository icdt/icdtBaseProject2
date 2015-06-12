app.factory('GroupsFactory', ['$http', 'UrlHelper', function ($http, UrlHelper) {

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
        getGroupRoles: function (groupId) {
            var url = UrlHelper.prepareUrl('api/groups/' + groupId + '/roles');
            return $http.get(url);
        },
        setUserGroups: function (ppUserId, ppGroups) {
            var url = UrlHelper.prepareUrl('api/user/userGroups');
            return $http.delete(url, ppGroups);
        },
        getUserGroups: function () {
            var url = UrlHelper.prepareUrl('api/user/userGroups');
            return $http.get(url);
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