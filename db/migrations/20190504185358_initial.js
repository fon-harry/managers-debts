exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("managers", function(table) {
      table.increments("id").primary();
      table.uuid("id_8");
      table.string("name");
    }),

    knex.schema.createTable("clients", function(table) {
      table.increments("id").primary();
      table.uuid("id_8");
      table.string("name");
      table.integer("manager_id").unsigned();
      table.foreign("manager_id").references("managers.id");
    }),

    knex.schema.createTable("contracts", function(table) {
      table.increments("id").primary();
      table.uuid("id_8");
      table.string("name");
      table.decimal("debt", 14, 2);
      table.integer("client_id").unsigned();
      table.foreign("client_id").references("clients.id");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("contracts"),
    knex.schema.dropTable("clients"),
    knex.schema.dropTable("managers")
  ]);
};
