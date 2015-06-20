(function () {
    'use strict';
    var controllerId = 'searchsController';
    angular.module('app').controller(controllerId, ['common', 'searchService', '$location', searchsController]);

    function searchsController(common, searchService, $location) {
        $location.search()[0];
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.tweets = [];
        vm.title = 'Searchs';
        vm.inputString = '';
        vm.busyMessage = 'Searching ...';
        vm.isBusy = false;
        vm.spinnerOptions = {
            radius: 40,
            lines: 7,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: '#F58A00'
        };

        activate();

        function activate() {
            //var promises = [searchHashTag(vm.inputString)];
            //common.activateController(promises, controllerId)
            common.activateController(controllerId)
                .then(function () { log('Activated Searchs View'); });
        }
        vm.toggleSpinner = function (on) { vm.isBusy = on; }

        vm.searchHashTag = function () {
            vm.toggleSpinner(true);
            return searchService.searchHashTag(vm.inputString).then(function(d) {
                vm.tweets = d.data;
                vm.toggleSpinner(false);
                return vm.tweets;
            })
            //    .then(function () {
            //    new CBPGridGallery(document.getElementById('grid-gallery'));
            //});
        }
       
       
    }
})();
