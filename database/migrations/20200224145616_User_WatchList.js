exports.up = function(knex) {
  return knex.schema.createTable("User_WatchList", tbl => {
    tbl.increments();
    tbl.string("name");
    tbl.date("date");
    tbl.integer("year");
    tbl.string("letterboxd_uri");
    tbl
      .integer("userid")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("User_WatchList");
};
