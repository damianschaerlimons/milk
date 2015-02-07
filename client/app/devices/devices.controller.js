'use strict';

angular.module('milkApp')
  .controller('DevicesCtrl', function ($scope, $http, $location) {
    $scope.message = 'Hello';

    $scope.loadDevice = function(){
    $http.get('api/devices').success(function(data){
      console.log(data);
      $scope.devices = data;
    });
  };

  $scope.loadDevice();

  $scope.placeholder = 'New Device Name';
  $scope.newVal = '';


  $scope.add= function(){
    $http.post('api/devices', {name: $scope.newVal}).success(function(){
      console.log(' working');
      $scope.loadDevice();
      $scope.toggleAdd();

      $scope.newVal = '';
    }).error(function(){
      console.log('somethings wrong');
    });
  };

$scope.addLog = function(dev){
  $http.post('api/logs', {device: dev, temperature: Math.random()}).success(function(){
  }).error(function(){
  });
};

$scope.removeDevice = function(dev){

  $http.delete('api/devices/'+dev).success(function(){
    $scope.loadDevice();
  }).error(function(){

  });
};


$scope.addingPossible = false;
$scope.toggleAdd = function(){
  $scope.addingPossible = !$scope.addingPossible ;
};



$scope.goDevice = function(val){
  $location.path('/device/'+val);
};
});
