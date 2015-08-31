/**
 * Created by vmatusevic on 31/08/2015.
 */

'use strict';

angular.module('jstestApp')
  .service('BasketService', function ($cookieStore) {

    var self = this;
    var basket = $cookieStore.get('fooditStorage') || {};

    this.saveBasket = function () {
      $cookieStore.put('fooditStorage', basket);
    };

    // Basket Product

    this.addProduct = function (meal) {
      if (basket[meal.id]) {
        basket[meal.id].count += 1;
      } else {
        basket[meal.id] = meal;
        var type = 'other';
        meal.tags.forEach(function (tag) {
          if (tag.substring(0, 7) === '#course') {
            type = tag.substring(tag.indexOf(':') + 1);
          }
        });
        basket[meal.id].type = type;
        basket[meal.id].count = 1;
      }
      this.saveBasket();
    };

    this.removeProduct = function (meal) {
      if (basket[meal.id]) {
        basket[meal.id].count -= 1;
        if (basket[meal.id].count <= 0) {
          delete basket[meal.id];
        }
        this.saveBasket();
      }
    };

    this.getProductTotalPrice = function (key) {
      return basket[key].count * basket[key].price;
    };

    // Basket Total

    this.productsByType = function () {
      var products = {};
      Object.keys(basket).forEach(function (key) {
        var type = basket[key].type;
        products[type] = products[type] || {};
        products[type].meals = products[type].meals || {};
        // set total count of meals
        var totalCount = products[type].total || 0;
        totalCount += basket[key].count;
        products[type].total = totalCount;
        // set meals
        products[type].meals[key] = basket[key];
      });
      return products;
    };

    this.getTotalProductsPrice = function () {
      var totalCost = 0;
      Object.keys(basket).forEach(function (key) {
        totalCost += self.getProductTotalPrice(key);
      });
      return totalCost;
    };

    this.getTotalProductsCount = function () {
      var total = 0;
      Object.keys(basket).forEach(function (key) {
        total += basket[key].count;
      });
      return total;
    };

    return this;
  });
