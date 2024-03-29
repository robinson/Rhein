﻿(function () {
    'use strict';

    var app = angular.module('app');

    app.directive('ccImgPerson', ['config', function (config) {
        //Usage:
        //<img data-cc-img-person="{{s.speaker.imageSource}}"/>
        var basePath = config.imageSettings.imageBasePath;
        var unknownImage = config.imageSettings.unknownPersonImageSource;
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$observe('ccImgPerson', function (value) {
                value = basePath + (value || unknownImage);
                attrs.$set('src', value);
            });
        }
    }]);


    app.directive('ccSidebar', function () {
        // Opens and clsoes the sidebar menu.
        // Usage:
        //  <div data-cc-sidebar>
        // Creates:
        //  <div data-cc-sidebar class="sidebar">
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var $sidebarInner = element.find('.sidebar-inner');
            var $dropdownElement = element.find('.sidebar-dropdown a');
            element.addClass('sidebar');
            $dropdownElement.click(dropdown);

            function dropdown(e) {
                var dropClass = 'dropy';
                e.preventDefault();
                if (!$dropdownElement.hasClass(dropClass)) {
                    hideAllSidebars();
                    $sidebarInner.slideDown(350);
                    $dropdownElement.addClass(dropClass);
                } else if ($dropdownElement.hasClass(dropClass)) {
                    $dropdownElement.removeClass(dropClass);
                    $sidebarInner.slideUp(350);
                }

                function hideAllSidebars() {
                    $sidebarInner.slideUp(350);
                    $('.sidebar-dropdown a').removeClass(dropClass);
                }
            }
        }
    });


    app.directive('ccWidgetClose', function () {
        // Usage:
        // <a data-cc-widget-close></a>
        // Creates:
        // <a data-cc-widget-close="" href="#" class="wclose">
        //     <i class="fa fa-remove"></i>
        // </a>
        var directive = {
            link: link,
            template: '<i class="fa fa-remove"></i>',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$set('href', '#');
            attrs.$set('wclose');
            element.click(close);

            function close(e) {
                e.preventDefault();
                element.parent().parent().parent().hide(100);
            }
        }
    });

    app.directive('ccWidgetMinimize', function () {
        // Usage:
        // <a data-cc-widget-minimize></a>
        // Creates:
        // <a data-cc-widget-minimize="" href="#"><i class="fa fa-chevron-up"></i></a>
        var directive = {
            link: link,
            template: '<i class="fa fa-chevron-up"></i>',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            //$('body').on('click', '.widget .wminimize', minimize);
            attrs.$set('href', '#');
            attrs.$set('wminimize');
            element.click(minimize);

            function minimize(e) {
                e.preventDefault();
                var $wcontent = element.parent().parent().next('.widget-content');
                var iElement = element.children('i');
                if ($wcontent.is(':visible')) {
                    iElement.removeClass('fa fa-chevron-up');
                    iElement.addClass('fa fa-chevron-down');
                } else {
                    iElement.removeClass('fa fa-chevron-down');
                    iElement.addClass('fa fa-chevron-up');
                }
                $wcontent.toggle(500);
            }
        }
    });

    app.directive('ccScrollToTop', ['$window',
        // Usage:
        // <span data-cc-scroll-to-top></span>
        // Creates:
        // <span data-cc-scroll-to-top="" class="totop">
        //      <a href="#"><i class="fa fa-chevron-up"></i></a>
        // </span>
        function ($window) {
            var directive = {
                link: link,
                template: '<a href="#"><i class="fa fa-chevron-up"></i></a>',
                restrict: 'A'
            };
            return directive;

            function link(scope, element, attrs) {
                var $win = $($window);
                element.addClass('totop');
                $win.scroll(toggleIcon);

                element.find('a').click(function (e) {
                    e.preventDefault();
                    // Learning Point: $anchorScroll works, but no animation
                    //$anchorScroll();
                    $('body').animate({ scrollTop: 0 }, 500);
                });

                function toggleIcon() {
                    $win.scrollTop() > 300 ? element.slideDown() : element.slideUp();
                }
            }
        }
    ]);

    app.directive('ccSpinner', ['$window', function ($window) {
        // Description:
        //  Creates a new Spinner and sets its options
        // Usage:
        //  <div data-cc-spinner="vm.spinnerOptions"></div>
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.spinner = null;
            scope.$watch(attrs.ccSpinner, function (options) {
                if (scope.spinner) {
                    scope.spinner.stop();
                }
                scope.spinner = new $window.Spinner(options);
                scope.spinner.spin(element[0]);
            }, true);
        }
    }]);

    app.directive('ccWidgetHeader', function () {
        //Usage:
        //<div data-cc-widget-header title="vm.map.title"></div>
        var directive = {
            link: link,
            scope: {
                'title': '@',
                'subtitle': '@',
                'rightText': '@',
                'allowCollapse': '@'
            },
            templateUrl: '/app/layout/widgetheader.html',
            restrict: 'A',
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$set('class', 'widget-head');
        }
    });

    //masonry 
    app.directive("masonry", function () {
        var NGREPEAT_SOURCE_RE = '<!-- ngRepeat: ((.*) in ((.*?)( track by (.*))?)) -->';
        return {
            compile: function (element, attrs) {
                // auto add animation to brick element
                var animation = attrs.ngAnimate || "'masonry'";
                var $brick = element.children();
                $brick.attr("ng-animate", animation);

                // generate item selector (exclude leaving items)
                var type = $brick.prop('tagName');
                var itemSelector = type + ":not([class$='-leave-active'])";

                return function (scope, element, attrs) {
                    var options = angular.extend({
                        itemSelector: itemSelector
                    }, scope.$eval(attrs.masonry));

                    // try to infer model from ngRepeat
                    if (!options.model) {
                        var ngRepeatMatch = element.html().match(NGREPEAT_SOURCE_RE);
                        if (ngRepeatMatch) {
                            options.model = ngRepeatMatch[4];
                        }
                    }

                    // initial animation
                    element.addClass('masonry');

                    // Wait inside directives to render
                    setTimeout(function () {
                        element.masonry(options);

                        element.on("$destroy", function () {
                            element.masonry('destroy')
                        });

                        if (options.model) {
                            scope.$apply(function () {
                                scope.$watchCollection(options.model, function (_new, _old) {
                                    if (_new == _old) return;

                                    // Wait inside directives to render
                                    setTimeout(function () {
                                        element.masonry("reload");
                                    });
                                });
                            });
                        }
                    });
                };
            }
        };
    })

    app.directive('pieChart', function ($timeout) {
        return {
            restrict: 'EA',
            scope: {
                title: '@title',
                width: '@width',
                height: '@height',
                data: '=data',
                selectFn: '&select'
            },
            link: function ($scope, $elm, $attr) {

                // Create the data table and instantiate the chart
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Label');
                data.addColumn('number', 'Value');
                var chart = new google.visualization.PieChart($elm[0]);

                draw();

                // Watches, to refresh the chart when its data, title or dimensions change
                $scope.$watch('data', function () {
                    draw();
                }, true); // true is for deep object equality checking
                $scope.$watch('title', function () {
                    draw();
                });
                $scope.$watch('width', function () {
                    draw();
                });
                $scope.$watch('height', function () {
                    draw();
                });

                // Chart selection handler
                google.visualization.events.addListener(chart, 'select', function () {
                    var selectedItem = chart.getSelection()[0];
                    if (selectedItem) {
                        $scope.$apply(function () {
                            $scope.selectFn({
                                selectedRowIndex: selectedItem.row
                            });
                        });
                    }
                });

                function draw() {
                    if (!draw.triggered) {
                        draw.triggered = true;
                        $timeout(function () {
                            draw.triggered = false;
                            var label, value;
                            data.removeRows(0, data.getNumberOfRows());
                            angular.forEach($scope.data, function (row) {
                                label = row[0];
                                value = parseFloat(row[1], 10);
                                if (!isNaN(value)) {
                                    data.addRow([row[0], value]);
                                }
                            });
                            var options = {
                                'title': $scope.title,
                                'width': $scope.width,
                                'height': $scope.height
                            };
                            chart.draw(data, options);
                            // No raw selected
                            $scope.selectFn({
                                selectedRowIndex: undefined
                            });
                        }, 0, true);
                    }
                }
            }
        };
    });

})();