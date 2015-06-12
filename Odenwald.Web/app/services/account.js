(function () {
    'use strict';
    var serviceId = 'Account';
    angular.module('app').factory(serviceId, function($http) {
        return {
            getProfile: function() {
                return $http.get('/api/me');
            },
            updateProfile: function(profileData) {
                return $http.put('/api/me', profileData);
            }
        };
    })
});