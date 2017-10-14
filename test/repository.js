import Knex from 'knex'
import plugin from '../dist/index'

const knex = Knex({
  // debug: true,
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://postgres:@localhost/bookshelf_deep_changed_plugin'
})
const bookshelf = require('bookshelf')(knex)

bookshelf.plugin(plugin)
export default bookshelf
