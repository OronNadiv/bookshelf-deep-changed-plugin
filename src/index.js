import Promise from 'bluebird'
import _ from 'underscore'

module.exports = Bookshelf => {
  Bookshelf.Model = Bookshelf.Model.extend({
    // leave as function since it is bound to the model's scope.
    deepChanged: function () {
      'use strict'
      let options
      const missing = []
      const hasChanged = []

      _.each(arguments, (arg, index, args) => {
        if (!_.isString(arg)) {
          if (index !== args.length - 1) {
            throw new Error(`Expecting strings only.  You can pass an 'Options' parameter as the last argument.  Position: ${index}, Given non-string argument: ${arg}`)
          } else if (_.isObject(arg)) {
            options = arg
          } else {
            throw new Error(`Last argument can either be a string or an options object.  Given last argument: ${arg}`)
          }
          return
        }

        if (this.isNew() || !this.hasChanged(arg)) {
          hasChanged.push(false)
        } else {
          const previousValue = this.previous(arg)
          if (_.isUndefined(previousValue)) {
            missing.push({index, argument: arg})
            hasChanged.push(undefined) // we do not know.
          } else {
            hasChanged.push(!_.isEqual(previousValue, this.get(arg)))
          }
        }
      }, this)

      // it is important to bind the promise since the caller's
      // may continue chaining the promise and may relay on "this" to be the model.

      let promise = Promise.bind(this)
      if (!missing.length) {
        promise = promise.return(hasChanged)
      } else {
        promise = promise
          .then(() => {
            return new this.constructor().query({where: {id: this.id}}).fetch(options)
          })
          .then((previousModel) => {
            missing.forEach((item) => {
              const index = item.index
              const argument = item.argument
              const areEqual = _.isEqual(previousModel.get(argument), this.get(argument))
              hasChanged.splice(index, 1, !areEqual)
            })
          })
      }
      return promise.return(hasChanged)
    }
  })
}
