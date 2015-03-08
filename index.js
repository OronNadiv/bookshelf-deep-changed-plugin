'use strict';

var Promise = require('bluebird'),
  _ = require('underscore');

module.exports = function (Bookshelf) {

  Bookshelf.Model = Bookshelf.Model.extend({
    deepChanged: function () {
      var missing = [],
        hasChanged = [],
        options;

      _.each(arguments, function (arg, index, args) {
        if (!_.isString(arg)) {
          if (index !== args.length - 1) {
            throw new Error('Expecting strings only.  You can pass an \'Options\' parameter as the last argument.  Position: ' + index + ', Given non-string argument: ', arg);
          } else if (_.isObject(arg)) {
            options = arg;
          } else {
            throw new Error('Last argument can either be a string or an options object.  Given last argument: ', arg);
          }
          return;
        }

        if (this.isNew() || !this.hasChanged(arg)) {
          hasChanged.push(false);
        } else {
          var previousValue = this.previous(arg);
          if (_.isUndefined(previousValue)) {
            missing.push({index: index, argument: arg});
            hasChanged.push(undefined); // we do not know.
          } else {
            hasChanged.push(!_.isEqual(previousValue, this.get(arg)));
          }
        }
      }, this);

      if (!missing.length) {
        return Promise.resolve(hasChanged);
      }
      return Promise.bind(this)
        .then(function () {
          return new this.constructor().query({where: {id: this.id}}).fetch(options);
        }).then(function (previousModel) {
          _.each(missing, function (item) {
            var index = item.index,
              argument = item.argument,
              areEqual = _.isEqual(previousModel.get(argument), this.get(argument));
            hasChanged.splice(index, 1, !areEqual);
          }, this);
        }).return(hasChanged);
    }
  });
};
