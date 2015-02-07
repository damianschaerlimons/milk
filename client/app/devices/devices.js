'use strict';

angular.module('milkApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('devices', {
        url: '/devices',
        templateUrl: 'app/devices/devices.html',
        controller: 'DevicesCtrl'
      });
  });