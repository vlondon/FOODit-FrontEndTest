/**
 * Created by vmatusevic on 31/08/2015.
 */

'use strict';

angular.module('jstestApp')
  .controller('BasketCtrl', function ($scope, $rootScope, BasketService) {

    $scope.basketVisible = false;

    $scope.showBasket = function(visible) {
      if (typeof visible !== 'undefined') {
        console.log('1. showBasket: ', visible);
        $scope.basketVisible = visible;
      } else {
        console.log('2. showBasket: ', visible);
        $scope.basketVisible = !$scope.basketVisible;
      }
    };

    var refreshBasket = function () {
      $scope.totalPrice = BasketService.getTotalProductsPrice();
      $scope.productsByType = BasketService.productsByType();
      // Total amount of items to show/hide basket
      $scope.totalCount = BasketService.getTotalProductsCount();
      var emptyBasket = $scope.totalCount === 0;
      console.log('$scope.totalCount: ', $scope.totalCount);
      if (emptyBasket) {
        $scope.showBasket(false);
      }
    };

    var addProduct = function(product) {
      BasketService.addProduct(product);
      refreshBasket();
    };

    var removeProduct = function(product) {
      BasketService.removeProduct(product);
      refreshBasket();
    };

    // Initialize Basket for the first time

    refreshBasket();

    // Scope functions

    //$scope.showBasket = showBasket;

    $scope.addProduct = function () {
      addProduct(this.meal);
    };

    $scope.removeProduct = function () {
      removeProduct(this.meal);
    };

    // Listeners

    $rootScope.$on('addMealToBasket', function (event, args) {
      addProduct(args.meal);
    });

  });
