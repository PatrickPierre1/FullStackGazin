/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("desenvolvedores", (table) => {
            table.increments("id");
            table.integer("nivel_id").unsigned()
            table.foreign("nivel_id").references("niveis.id");
            table.string("nome", 100).notNullable();
            table.specificType("sexo", "char(8)").notNullable();
            table.date("data_nascimento").notNullable();
            table.integer("idade").notNullable();
            table.string("hobby", 100).notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
        .then(() => {
            console.log("Criada tabela de Desenvolvedores");
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable("desenvolvedores")
        .then((result) => {
            console.log("Deletada tabela de Desenvolvedores");
        })
        .catch((err) => {
            console.log(err);
        });
};
