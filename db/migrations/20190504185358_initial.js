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

  await knex.schema.createTable("users", function(table) {
    table.increments("id").primary();
    table
      .string("username")
      .unique()
      .notNullable();
    table.string("password").notNullable();
    table
      .boolean("isAdmin")
      .notNullable()
      .defaultTo(false);
    table
      .boolean("isSupervisor")
      .notNullable()
      .defaultTo(false);
  });

  await knex.schema.createTable("userManagers", function(table) {
    table.integer("user_id").unsigned();
    table.integer("manager_id").unsigned();
    table.foreign("user_id").references("users.id");
    table.foreign("manager_id").references("managers.id");
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable("userManagers");

  await knex.schema.dropTable("contracts");
  await knex.schema.dropTable("clients");
  await knex.schema.dropTable("managers");

  await knex.schema.dropTable("users");
};
