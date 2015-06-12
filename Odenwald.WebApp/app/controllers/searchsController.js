(function () {
    'use strict';
    var controllerId = 'searchsController';
    angular.module('app').controller(controllerId, ['common', admin]);

    function admin(common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'searchs';

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated searchs View'); });
        }
    }
})();