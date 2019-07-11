exports.up = async function(knex, Promise) {
  await knex.schema.createTable("managers", function(table) {
    table.increments("id").primary();
    table.uuid("id_8");
    table.string("name");
  });

  await knex.schema.createTable("clients", function(table) {
    table.increments("id").primary();
    table.uuid("id_8");
    table.string("name");
    table.integer("manager_id").unsigned();
    table.foreign("manager_id").references("managers.id");
  });

  await knex.schema.createTable("contracts", function(table) {
    table.increments("id").primary();
    table.uuid("id_8");
    table.string("name");
    table.decimal("debt", 14, 2);
    table.integer("client_id").unsigned();
    table.foreign("client_id").references("clients.id");
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable("contracts");
  await knex.schema.dropTable("clients");
  await knex.schema.dropTable("managers");
};
