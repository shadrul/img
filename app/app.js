'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.version',
  'angular-loading-bar'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
  
}]);
