'use strict';

angular.module('milkApp')
  .controller('DeviceCtrl', function ($scope, $stateParams, $http) {

    $scope.lineData= [];

    //$scope.start = new Date();
    //$scope.end = new Date(new Date().getTime()-24*60*60*1000);

    $scope.startDate;
    $scope.endDate;




    $http.get('api/devices/'+$stateParams.id).success(function(data){

      $scope.device = data;
      console.log(data);
    }).error(function(data){
      console.log(data);
    });

    $scope.getData = function(){


        $http.get('api/devices/'+$stateParams.id+'/logs?start='+$scope.startDate.getTime()+'&end='+$scope.endDate.getTime()).success(function(data){
          $scope.logs = data;
          console.log(data);
          $scope.lineData= [];
          for (var index = 0; index < data.length; ++index) {

            var date = new Date(data[index].timestamp);
            var tmp = date.getFullYear() + '-' + date.getMonth() +'-' + date.getDay()+'T'+date.getHours() + ':'+date.getMinutes();
            $scope.lineData[index]= [ tmp ,  data[index].temperature];

          };
          $scope.renderSVG();
        });
    };

    //$scope.todayActive = true;
    //$scope.yesterDayActive = false;
    //$scope.weekActive = false;
    //
    //$scope.yesterday = function(){
    //
    //  $scope.todayActive = false;
    //  $scope.yesterDayActive = true;
    //  $scope.weekActive = false;
    //
    //  $scope.start = $scope.end;
    //  $scope.end = new Date($scope.start.getTime()-24*60*60*1000);
    //  $scope.getData();
    //}
    //
    //$scope.week = function(){
    //
    //  $scope.todayActive = false;
    //  $scope.yesterDayActive = false;
    //  $scope.weekActive = true;
    //
    //  $scope.start = new Date();
    //  $scope.end = new Date($scope.start.getTime()-24*60*60*1000*7);
    //  $scope.getData();
    //}
    //
    //$scope.today = function(){
    //
    //  $scope.todayActive = true;
    //  $scope.yesterDayActive = false;
    //  $scope.weekActive = false;
    //
    //  $scope.start = new Date();
    //  $scope.end = new Date(new Date().getTime()-24*60*60*1000);
    //  $scope.getData();
    //}
    //$scope.today();


    $scope.renderSVG = function(){

            var margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      var parseDate = d3.time.format("%Y-%m-%dT%H:%M").parse;


      var x = d3.time.scale()
          .range([0, width])

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var line = d3.svg.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.temperature); });

      d3.select("#visualisation").select("svg").remove();
      var svg = d3.select("#visualisation").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data = $scope.lineData.map(function(d) {
            return {
               date: parseDate(d[0]),
               temperature: d[1]
            };

        });




        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain(d3.extent(data, function(d) { return d.temperature; }));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Temperature");

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
    };
    var temp = 48;
    $scope.addLog = function(dev){
      $http.post('api/logs', {device: dev, temperature: temp}).success(function(){
        temp = temp-0.3;
        if(temp < 8){
          temp = temp-0.1
        }
        if(temp <5){
          temp = 48;
        }
      }).error(function(){
      });
    };

    var logInterval;
    $scope.startTesting = function(){
        $scope.startTime = new Date();
        logInterval = setInterval(function(){

          $scope.addLog($scope.device._id);
          $scope.today();
        }, 1000*60);
    };

    $scope.stopTesting = function(){
      $scope.stopTime = new Date();
      clearInterval(logInterval);
    };

});
