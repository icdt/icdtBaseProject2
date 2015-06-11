angular.module('utility',
    [
        'utility.config',
        'utility.UrlHelper'
    ]);


angular.module('utility.config', [])
.service('config', function () {

    return {

        baseUrl: 'http://localhost:1131/'

    };

});

angular.module('utility.UrlHelper', ['utility.config'])
.service('UrlHelper', ['config', function (config) {

    return {
        prepareUrl: function (uriSegments) {
            return config.baseUrl + '/' + uriSegments;
        }

        //prepareSiteUrl: function (uriSegments) {
        //    return config.websiteUrl + '/' + uriSegments;
        //},
        //prepareDataUrl: function (uriSegments) {
        //    return config.resourceUrl + '/' + uriSegments;
        //},
        //prepareApiUrl: function (uriSegments) {
        //    return config.resourceUrl + '/api/' + uriSegments;
        //},
        //prepareTokenUrl: function (uriSegments) {
        //    return config.resourceUrl + '/' + uriSegments;
        //},
        //prepareSignalrUrl: function (uriSegments) {
        //    return config.resourceUrl + '/signalr';
        //}
    };
}]);