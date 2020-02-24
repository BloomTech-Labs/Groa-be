exports.up = function(knex) {
  return knex.schema.createTable("Users", tbl => {
    tbl.increments();
    tbl
      .string("username")
      .unique()
      .notNullable();
    tbl.string("password").notNullable();
    tbl.boolean("has_letterboxd").defaultTo(null);
    tbl.boolean("has_imdb").defaultTo(null);
    tbl.date("last_login");
    tbl.date("user_preferences");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Users");
};
