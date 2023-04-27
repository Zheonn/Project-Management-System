/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('stock', table => {
        table.string('brand').notNullable().defaultTo('Sem Marca')
        table.float('price').notNullable().defaultTo(0.00)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('stock', table => {
        table.dropColumn('brand')
        table.dropColumn('price')
    })
};
