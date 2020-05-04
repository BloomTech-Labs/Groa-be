exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .string("user_name", 128).notNullable() //email will be duplicated here
      .unique();
    tbl.string("okta_id", 128); //from OKTA API
    tbl.string("password", 128);
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
