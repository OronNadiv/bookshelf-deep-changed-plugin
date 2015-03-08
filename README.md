[![Dependencies](https://david-dm.org/oronnadiv/bookshelf-deep-changed-plugin.svg?style=flat)](https://david-dm.org/oronnadiv/bookshelf-deep-changed-plugin)
[![devDependency Status](https://david-dm.org/oronnadiv/bookshelf-deep-changed-plugin/dev-status.svg?style=flat)](https://david-dm.org/oronnadiv/bookshelf-deep-changed-plugin#info=devDependencies)
[![Build Status](https://travis-ci.org/OronNadiv/bookshelf-deep-changed-plugin.svg?style=flat)](https://travis-ci.org/OronNadiv/bookshelf-deep-changed-plugin)
# bookshelf-deep-changed-plugin
Allows bookshelf models to check whether a value you are saving is different than the existing value in the database.

Usage:
```
module.exports = Repository.Model.extend({
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
});

```

Do not forget to add ```bookshelf-deep-changed-plugin``` to the list of bookshelf's plugins when you require bookshelf:

```
var knex = require('knex')({
    /// knex initialization
  }),
  bookshelf = require('bookshelf')(knex);

bookshelf.plugin(require('bookshelf-soft-delete-plugin'));
```
