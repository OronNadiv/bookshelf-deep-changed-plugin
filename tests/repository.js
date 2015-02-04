(function () {
  'use strict';

  module.exports = require('bookshelf')(require('knex')({
    //debug: true,
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://postgres@localhost/bookshelf_deep_changed'
  }));
}());
