/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('stock', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('type').notNullable()
        table.integer('amount').notNullable().defaultTo(1)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('stock')
};
