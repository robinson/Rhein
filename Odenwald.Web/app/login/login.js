(function () {
    'use strict';
    var controllerId = 'LoginCtrl';
    angular.module('app').controller(controllerId, ['common', '$scope', '$alert', '$auth', login]);

    function login(common, $scope, $alert, $auth) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Login';

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Login View'); });
        }
        $scope.login = function () {
            $auth.login({ email: $scope.email, password: $scope.password })
              .then(function () {
                  $alert({
                      content: 'You have successfully logged in',
                      animation: 'fadeZoomFadeDown',
                      type: 'material',
                      duration: 3
                  });
              })
              .catch(function (response) {
                  $alert({
                      content: response.data.message,
                      animation: 'fadeZoomFadeDown',
                      type: 'material',
                      duration: 3
                  });
              });
        };
        $scope.authenticate = function (provider) {
            $auth.authenticate(provider)
              .then(function () {
                  $alert({
                      content: 'You have successfully logged in',
                      animation: 'fadeZoomFadeDown',
                      type: 'material',
                      duration: 3
                  });
              })
              .catch(function (response) {
                  $alert({
                      content: response.data ? response.data.message : response,
                      animation: 'fadeZoomFadeDown',
                      type: 'material',
                      duration: 3
                  });
              });
        };
    }
})();

//angular.module('app')
//  .controller('LoginCtrl', function ($scope, $alert, $auth) {
//      $scope.login = function () {
//          $auth.login({ email: $scope.email, password: $scope.password })
//            .then(function () {
//                $alert({
//                    content: 'You have successfully logged in',
//                    animation: 'fadeZoomFadeDown',
//                    type: 'material',
//                    duration: 3
//                });
//            })
//            .catch(function (response) {
//                $alert({
//                    content: response.data.message,
//                    animation: 'fadeZoomFadeDown',
//                    type: 'material',
//                    duration: 3
//                });
//            });
//      };
//      $scope.authenticate = function (provider) {
//          $auth.authenticate(provider)
//            .then(function () {
//                $alert({
//                    content: 'You have successfully logged in',
//                    animation: 'fadeZoomFadeDown',
//                    type: 'material',
//                    duration: 3
//                });
//            })
//            .catch(function (response) {
//                $alert({
//                    content: response.data ? response.data.message : response,
//                    animation: 'fadeZoomFadeDown',
//                    type: 'material',
//                    duration: 3
//                });
//            });
//      };
//  });