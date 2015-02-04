(function () {
  'use strict';

  var _ = require('underscore'),
    Repository = require('./repository');

  module.exports = Repository.Model.extend(_.extend({
    tableName: 'users',
    initialize: function () {
      this.on('updating', function (model, attrs, options) {
        return this.deepChanged('name', 'email', options)
          .then(function (hasDeepChanged) {
            if (hasDeepChanged[0]) {
              this.set('name_changed_at', new Date());
            }
            if (hasDeepChanged[1]) {
              this.set('email_changed_at', new Date());
            }
          });
      });
    }
  }, require('../index')));
}());
