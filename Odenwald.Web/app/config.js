(function () {
    'use strict';

    var app = angular.module('app');

    // Configure Toastr
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';

    // For use with the HotTowel-Angular-Breeze add-on that uses Breeze
    var remoteServiceName = 'breeze/Breeze';

    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
        spinnerToggle: 'spinner.toggle'
    };

    var config = {
        appErrorPrefix: '[HT Error] ', //Configure the exceptionHandler decorator
        docTitle: 'HotTowel: ',
        events: events,
        remoteServiceName: remoteServiceName,
        version: '2.1.0'
    };

    app.value('config', config);

    app.config(['$logProvider', function ($logProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);

    //#region Configure the common services via commonConfig
    app.config(['commonConfigProvider', function (cfg) {
        cfg.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
        cfg.config.spinnerToggleEvent = config.events.spinnerToggle;
    }]);
    //#endregion
    //#region Configure for auth provider
    app.config(['$authProvider', function ($authProvider) {
        $authProvider.httpInterceptor = true; // Add Authorization header to HTTP request
        $authProvider.loginOnSignup = true;
        $authProvider.baseUrl = '/' // API Base URL for the paths below.
        $authProvider.loginRedirect = '/';
        $authProvider.logoutRedirect = '/';
        $authProvider.signupRedirect = '/login';
        $authProvider.loginUrl = '/auth/login';
        $authProvider.signupUrl = '/auth/signup';
        $authProvider.loginRoute = '/login';
        $authProvider.signupRoute = '/signup';
        $authProvider.tokenRoot = false; // set the token parent element if the token is not the JSON root
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = 'odenwald'; // Local Storage name prefix
        $authProvider.unlinkUrl = '/auth/unlink/';
        $authProvider.unlinkMethod = 'get';
        $authProvider.authHeader = 'Authorization';
        $authProvider.authToken = 'Bearer';
        $authProvider.withCredentials = true;
        $authProvider.platform = 'browser'; // or 'mobile'
        $authProvider.storage = 'localStorage'; // or 'sessionStorage'

        // Facebook
        $authProvider.facebook({
            url: '/auth/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.3/dialog/oauth',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host + '/',
            scope: 'email',
            scopeDelimiter: ',',
            requiredUrlParams: ['display', 'scope'],
            display: 'popup',
            type: '2.0',
            popupOptions: { width: 481, height: 269 }
        });
        // Google
        $authProvider.google({
            url: '/auth/google',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            scope: ['profile', 'email'],
            scopePrefix: 'openid',
            scopeDelimiter: ' ',
            requiredUrlParams: ['scope'],
            optionalUrlParams: ['display'],
            display: 'popup',
            type: '2.0',
            popupOptions: { width: 580, height: 400 }
        });

        // LinkedIn
        $authProvider.linkedin({
            url: '/auth/linkedin',
            authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            requiredUrlParams: ['state'],
            scope: [],
            scopeDelimiter: ' ',
            state: 'STATE',
            type: '2.0',
            popupOptions: { width: 527, height: 582 }
        });

        // Twitter
        $authProvider.twitter({
            url: '/auth/twitter',
            type: '1.0',
            popupOptions: { width: 495, height: 645 }
        });
        // GitHub
        $authProvider.github({
            url: '/auth/github',
            authorizationEndpoint: 'https://github.com/login/oauth/authorize',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            scope: [],
            scopeDelimiter: ' ',
            type: '2.0',
            popupOptions: { width: 1020, height: 618 }
        });
        // Windows Live
        $authProvider.live({
            url: '/auth/live',
            authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            scope: ['wl.basic'],
            scopeDelimiter: ' ',
            requiredUrlParams: ['display', 'scope'],
            display: 'popup',
            type: '2.0',
            popupOptions: { width: 500, height: 560 }
        });
        // Yahoo
        $authProvider.yahoo({
            url: '/auth/yahoo',
            authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            scope: [],
            scopeDelimiter: ',',
            type: '2.0',
            popupOptions: { width: 559, height: 519 }
        });

        // OAuth 2.0
        $authProvider.oauth2({
            url: null,
            name: null,
            scope: null,
            scopeDelimiter: null,
            clientId: null,
            redirectUri: null,
            popupOptions: null,
            authorizationEndpoint: null,
            responseParams: null,
            requiredUrlParams: null,
            optionalUrlParams: null,
            defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
            responseType: 'code'
        });
        // OAuth 1.0
        $authProvider.oauth1({
            url: null,
            name: null,
            popupOptions: null
        });
        //$authProvider.facebook({
        //    clientId: '603122136500203'
        //});

        //$authProvider.google({
        //    clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com'
        //});

        //$authProvider.github({
        //    clientId: '45ab07066fb6a805ed74'
        //});

        //$authProvider.linkedin({
        //    clientId: '77cw786yignpzj'
        //});

        //$authProvider.yahoo({
        //    clientId: 'dj0yJmk9SDVkM2RhNWJSc2ZBJmQ9WVdrOWIzVlFRMWxzTXpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yYw--'
        //});

        //$authProvider.twitter({
        //    url: '/auth/twitter'
        //});

        //$authProvider.live({
        //    clientId: '000000004C12E68D'
        //});

        //$authProvider.oauth2({
        //    name: 'foursquare',
        //    url: '/auth/foursquare',
        //    clientId: 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K',
        //    redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
        //    authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate'
        //});
    }]);
    //#endregion
})();