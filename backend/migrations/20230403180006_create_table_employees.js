/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('employees', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('cpf').notNullable()
        table.string('role').notNullable()
        table.boolean('intermittent').notNullable().defaultTo(false)
        table.string('cardNumber').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('employees')
};
