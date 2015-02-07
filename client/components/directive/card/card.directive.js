'use strict';

angular.module('milkApp')
  .directive('card', function () {
    return {
      templateUrl: 'components/directive/card/card.html',
      scope: {
        title : '=',
        titelditable: '=',
        placeholder: '=',
        description : '=',
        action: '&',
        actiondesc: '@',
        action2: '&',
        action2desc: '@',
        action3: '&',
        action3desc: '@'
      },
      restrict: 'EA',
      link: function (scope) {
          console.log(scope);

      }
    };
  });
