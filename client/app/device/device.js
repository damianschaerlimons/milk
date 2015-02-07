'use strict';

angular.module('milkApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('device', {
        url: '/device/:id',
        templateUrl: 'app/device/device.html',
        controller: 'DeviceCtrl'
      });
  });
