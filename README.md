# bookshelf-deep-changed-plugin

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![devDependencies][devdependencies-image]][devdependencies-url]  
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Allows bookshelf models to check whether a value you save is different than the existing value in the database.

#### Installation:
```
$ npm install --save bookshelf-deep-changed-plugin
```

Usage:
```
module.exports = Repository.Model.extend({
  tableName: 'users',
  initialize: function () {
    this.on('updating', function (model, attrs, options) {
      return this
        .deepChanged('name', 'email', options)
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
const knex = require('knex')({
    /// knex initialization
  })
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin(require('bookshelf-deep-changed-plugin'));
```

### License
[MIT](https://tldrlegal.com/license/mit-license)

### Author
[Oron Nadiv](https://github.com/OronNadiv) ([oron@nadiv.us](mailto:oron@nadiv.us))

[npm-image]: https://img.shields.io/npm/v/bookshelf-deep-changed-plugin.svg?style=flat-square
[npm-url]: https://npmjs.org/package/bookshelf-deep-changed-plugin
[travis-image]: http://img.shields.io/travis/OronNadiv/bookshelf-deep-changed-plugin.svg?style=flat-square
[travis-url]: https://travis-ci.org/OronNadiv/bookshelf-deep-changed-plugin
[coveralls-image]: http://img.shields.io/coveralls/OronNadiv/bookshelf-deep-changed-plugin.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/OronNadiv/bookshelf-deep-changed-plugin?branch=master

[dependencies-image]: https://david-dm.org/OronNadiv/bookshelf-deep-changed-plugin/status.svg?style=flat-square
[devdependencies-image]: https://david-dm.org/OronNadiv/bookshelf-deep-changed-plugin/dev-status.svg?style=flat-square

[dependencies-url]: https://david-dm.org/OronNadiv/bookshelf-deep-changed-plugin
[devdependencies-url]: https://david-dm.org/OronNadiv/bookshelf-deep-changed-plugin?type=dev
