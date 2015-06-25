(function () {
    'use strict';
    var controllerId = 'searchsController';
    angular.module('app').controller(controllerId, ['common', 'searchService', '$location', '$scope', searchsController]);

    function searchsController(common, searchService, $location, $scope) {
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
            return searchService.searchHashTag(vm.inputString).then(function (d) {
                vm.tweets = d.data;
                vm.toggleSpinner(false);
                var neg = 0;
                var pos = 0;
                var neu = 0;
                $.each(vm.tweets, function (index) {
                    var sentiment = vm.tweets[index].score.sentiment;
                    console.log(sentiment);
                    if (sentiment < 0) {
                        neg += 1//(-1) * value.score.sentiment;
                    }
                    else if (sentiment > 0) {
                        pos += 1//value.score.sentiment;
                    }
                    else {
                        neu +=1
                    }
                });
                
                DrawChart(neg,pos,neu);
                return vm.tweets;
            })
        }
        function DrawChart(neg,pos,neu) {
            //chart:
            // Initial chart data
           
            $scope.chartTitle = "Sentiment";
            $scope.chartWidth = 500;
            $scope.chartHeight = 320;
            $scope.chartData = [
              ['positive :-)', pos],
              ['negative :-(', neg],
              ['neutral :-|', neu]
            ];

            $scope.deleteRow = function (index) {
                $scope.chartData.splice(index, 1);
            };
            $scope.addRow = function () {
                $scope.chartData.push([]);
            };
            $scope.selectRow = function (index) {
                $scope.selected = index;
            };
            $scope.rowClass = function (index) {
                return ($scope.selected === index) ? "selected" : "";
            };
        }
    }
})();
