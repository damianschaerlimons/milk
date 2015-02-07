'use strict';

describe('Controller: MilkCtrl', function () {

  // load the controller's module
  beforeEach(module('milkApp'));

  var MilkCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MilkCtrl = $controller('MilkCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
