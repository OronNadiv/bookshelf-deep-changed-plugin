const Promise = require('bluebird')

const drops = [
  'users'
]

module.exports = (Bookshelf) => {
  return () => {
    const schema = Bookshelf.knex.schema

    return Promise
      .map(drops, (val) => {
        return schema.dropTableIfExists(val)
      })
      .then(() => {
        return schema.createTable('users', (table) => {
          table.increments('id')
          table.string('name')
          table.timestamp('name_changed_at')
          table.string('email')
          table.timestamp('email_changed_at')
        })
      })
  }
}
