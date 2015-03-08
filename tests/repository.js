'use strict';

var knex = require('knex')({
    //debug: true,
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://postgres@localhost/bookshelf_deep_changed_plugin'
  }),
  bookshelf = require('bookshelf')(knex);

bookshelf.plugin(require('../index'));
module.exports = bookshelf;
