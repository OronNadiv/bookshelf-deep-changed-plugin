[![Dependencies](https://david-dm.org/lanetix/bookshelf-deep-changed.svg?style=flat)](https://david-dm.org/lanetix/bookshelf-deep-changed)
[![devDependency Status](https://david-dm.org/lanetix/bookshelf-deep-changed/dev-status.svg?style=flat)](https://david-dm.org/lanetix/bookshelf-deep-changed#info=devDependencies)
[![Build Status](https://travis-ci.org/lanetix/bookshelf-deep-changed.svg?style=flat)](https://travis-ci.org/lanetix/bookshelf-deep-changed)
[![Coverage Status](https://coveralls.io/repos/lanetix/bookshelf-deep-changed/badge.svg)](https://coveralls.io/r/lanetix/bookshelf-deep-changed)
# bookshelf-deep-changed
Allows bookshelf models to check whether a value you are saving is different than the existing value in the database.

Usage:
```
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
}, require('bookshelf-deep-changed')));

```
