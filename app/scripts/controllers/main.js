'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jstestApp
 */
angular.module('jstestApp')
  .controller('MainCtrl', function ($scope, $rootScope, MenuService) {
    $scope.menu = {};
    MenuService.get('/data/menu.json').success(function (data) {
      $scope.menu = data;
    });

    $scope.addProduct = function () {
      $rootScope.$emit('addMealToBasket', {meal: this.meal});
    };

  });
