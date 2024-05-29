/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("niveis", (table) => {
            table.increments("id");
            table.string("nivel", 100).notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
        .then(() => {
            console.log("Criada tabela de Niveis");
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable("niveis")
        .then((result) => {
            console.log("Deletada tabela de Niveis");
        })
        .catch((err) => {
            console.log(err);
        });
};
