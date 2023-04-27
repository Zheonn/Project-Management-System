/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('stock_actions', table => {
        table.string('item').notNullable()
        table.integer('amount').notNullable().defaultTo(1)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('stock_actions', table => {
        table.dropColumn('item')
        table.dropColumn('amount')
    })
};
