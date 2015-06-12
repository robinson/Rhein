(function () {
    'use strict';
    var controllerId = 'associateController'
    angular.module('app').controller(controllerId, ['common','$scope', '$location', '$timeout', 'authService', function (common,$scope, $location, $timeout, authService) {

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Associate';

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Associate View'); });
        }
        $scope.savedSuccessfully = false;
        $scope.message = "";

        $scope.registerData = {
            userName: authService.externalAuthData.userName,
            provider: authService.externalAuthData.provider,
            externalAccessToken: authService.externalAuthData.externalAccessToken
        };

        $scope.registerExternal = function () {

            authService.registerExternal($scope.registerData).then(function (response) {

                $scope.savedSuccessfully = true;
                $scope.message = "User has been registered successfully, you will be redicted to orders page in 2 seconds.";
                startTimer();

            },
              function (response) {
                  var errors = [];
                  for (var key in response.modelState) {
                      errors.push(response.modelState[key]);
                  }
                  $scope.message = "Failed to register user due to:" + errors.join(' ');
              });
        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/');//HL: redirect to current path, not home page
            }, 2000);
        }

    }]);
})();
