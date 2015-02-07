'use strict';

angular.module('milkApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('milk', {
        url: '/milk',
        templateUrl: 'app/milk/milk.html',
        controller: 'MilkCtrl'
      });
  });