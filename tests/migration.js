(function () {
  'use strict';

  var _ = require('underscore'),
    Promise = require('bluebird'),
    drops = [
      'users'
    ];

  module.exports = function (Bookshelf) {
    return function () {
      var schema = Bookshelf.knex.schema;

      return Promise.all(_.map(drops, function (val) {
        return schema.dropTableIfExists(val);
      }))
        .then(function () {
          return schema.createTable('users', function (table) {
            table.increments('id');
            table.string('name');
            table.timestamp('name_changed_at');
            table.string('email');
            table.timestamp('email_changed_at');
          });
        });
    };
  };
}());
