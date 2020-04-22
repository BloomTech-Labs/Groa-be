exports.up = function(knex) {
  return knex.schema.createTable("user_letterboxd_watched", tbl => {
    tbl.increments();
    tbl.string("name");
    tbl.date("date");
    tbl.integer("year");
    tbl.string("letterboxd_uri");
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user_letterboxd_watched");
};
