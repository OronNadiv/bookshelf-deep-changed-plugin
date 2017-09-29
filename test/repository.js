const knex = require('knex')({
  // debug: true,
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://postgres@localhost/bookshelf_deep_changed_plugin'
})
const bookshelf = require('bookshelf')(knex)

bookshelf.plugin(require('../src/index'))
module.exports = bookshelf
