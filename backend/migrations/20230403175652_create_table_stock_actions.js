/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('stock_actions', table => {
        table.increments('id').primary()
        table.string('employeeName').notNullable()
        table.string('item').notNullable()
        table.integer('amount').notNullable().defaultTo(1)
        table.date('date').notNullable()
        table.string('action').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('stock_actions')
};
