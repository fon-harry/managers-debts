module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      port: "3306",
      user: "managers_debts",
      password: "managers_debts",
      database: "managers_debts"
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + "/db/migrations"
    }
    // debug: true
  }
};
