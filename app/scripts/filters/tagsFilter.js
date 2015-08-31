/**
 * Created by vmatusevic on 31/08/2015.
 */
'use strict';

angular.module('jstestApp')
  .filter('tagsFilter', function () {
    return function (items, type) {
      if (type !== 'tags') {
        return [];
      }

      return items.map(function (item) {
        if (item.substring(0, 7) !== '#course') {
          if (item.indexOf(':') !== -1) {
            return item.substring(item.indexOf(':') + 1);
          } else {
            return item;
          }
        }
      });
    };
  });
