(function () {
    'use strict';
    var serviceId = 'searchService';
    angular.module('app').factory(serviceId, ['common', '$http', 'ngAuthSettings', searchService]);

    function searchService(common, $http, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var $q = common.$q;

        var service = {
            searchHashTag: searchHashTag
        };

        return service;

        var tweets = [];
        function searchHashTag(inputString) {
            var promise =  $http.get(serviceBase + 'api/searchs/searchhashtag?q=' + inputString).success(function (response) {
                return response;
            }).error(function(err, status){
                //do something here
            })
            return promise;
        }
    }
})();