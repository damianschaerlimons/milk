'use strict';

angular.module('milkApp')
  .controller('MilkCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

      $scope.loadDevice = function(){
        $http.get('api/devices').success(function(data){
          $scope.devices = data;
          console.log(data);
          $scope.loadLogs();
        });
      };

    $scope.loadDevice();

    // $scope.deviceName = '';
    //
    // $scope.add= function(){
    //   $http.post('api/devices', {name: $scope.deviceName}).success(function(){
    //     console.log(" working");
    //     $scope.loadDevice();
    //   }).error(function(){
    //     console.log("somethings wrong");
    //   });
    // };

    var logInterval;
    $scope.startTime = '';
    $scope.stopTime = '';

    $scope.startTesting = function(){
        $scope.startTime = new Date();
        logInterval = setInterval(function(){
          for (var index = 0; index < $scope.devices.length; ++index) {
              $scope.addLog($scope.devices[index]._id);
          }

        }, 100);
    };

    $scope.stopTesting = function(){
      $scope.stopTime = new Date();
      clearInterval(logInterval);
    };



    $scope.addLog = function(dev){
      $http.post('api/logs', {device: dev, temperature: Math.random(), timestamp: new Date()}).success(function(){
      }).error(function(){
      });
    };

    $scope.logs = [];
    $scope.loadLogs = function(){
      $scope.logs = [];
      for (var index = 0; index < $scope.devices.length; ++index) {
        $http.get('api/devices/'+$scope.devices[index]._id+'/logs/count').success(function(data){

          $scope.logs.push(data);
        });
      };


      //
      // $http.get('api/logs').success(function(data){
      //   console.log(data);
      //   $scope.logs = data;
      // });
    };
    // $scope.loadLogs();


  });
