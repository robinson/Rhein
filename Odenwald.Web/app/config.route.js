(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());

    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
   
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }, {
                url: '/admin',
                config: {
                    title: 'admin',
                    templateUrl: 'app/admin/admin.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Admin'
                    }
                }
            }, {
                url: '/login',
                config: {
                    title: 'login',
                    templateUrl: 'app/partials/login.html',
                    settings: {
                        nav: 0,
                        content: ''
                    }
                }
            }, {
                url: '/signup',
                config: {
                    title: 'signup',
                    templateUrl: 'app/partials/signup.html',
                    settings: {
                        nav: 0,
                        content: ''
                    }
                }
            }, {
                url: '/logout',
                config: {
                    title: 'logout',
                    templateUrl: null,
                    settings: {
                        nav: 0,
                        content: ''
                    }
                }
            }, {
                url: '/profile',
                config: {
                    title: 'profile',
                    templateUrl: 'app/partials/profile.html',
                    settings: {
                        nav: 0,
                        content: ''
                    },
                    resolve: {
                        authenticated: function ($q, $location, $auth) {
                            var deferred = $q.defer();

                            if (!$auth.isAuthenticated()) {
                                $location.path('/login');
                            } else {
                                deferred.resolve();
                            }

                            return deferred.promise;
                        }
                    }
                }
            }
        ];
    }
})();