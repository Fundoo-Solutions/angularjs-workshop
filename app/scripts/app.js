'use strict';

angular.module('stockMarketApp', ['ngRoute'])
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/list.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
        controllerAs: 'loginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/signup.html',
        controller: 'AuthCtrl',
        controllerAs: 'signupCtrl'
      })
      .when('/mine', {
        templateUrl: 'views/mine.html',
        controller: 'MyStocksCtrl',
        controllerAs: 'myStocksCtrl'
      })
      .otherwise({
        redirectTo: '/all'
      });
  });
