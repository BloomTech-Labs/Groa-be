exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .string("user_name", 128)
      .unique()
      .notNullable();
    tbl.string("password", 128).notNullable();
    tbl.boolean("has_letterboxd").defaultTo(false);
    tbl.boolean("has_imdb").defaultTo(false);
    tbl.date("last_login");
    tbl
      .string("email")
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
