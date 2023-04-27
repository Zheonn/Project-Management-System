// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    client: 'postgresql',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      database: 'your database name',
      user:     'your database user',
      password: 'your database password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
  }
};
