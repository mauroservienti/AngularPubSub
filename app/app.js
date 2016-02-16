/* global angular */
(function () {

    'use strict';

    angular.module('app.controllers', []);
    angular.module('app.services', []);

    var app = angular.module('app', [
                'app.controllers',
                'app.services',
                'app.templates'
    ]);
    
    app.config(['$locationProvider', '$logProvider',
            function ($locationProvider, $logProvider) {
                $logProvider.debugEnabled(true);
                $locationProvider.html5Mode(false);
                
                console.debug('app config.');
            }]);

    app.run(['$log', '$rootScope',
        function ($log, $rootScope) {
            $rootScope.$log = $log;
            
            console.debug('app run.');
        }]);

}())