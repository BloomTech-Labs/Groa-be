exports.up = function(knex) {
  return knex.schema.createTable("User_watched", tbl => {
    tbl.increments();
    tbl.string("name");
    tbl.string("date");
    tbl.integer("year");
    tbl.string("Letterboxd_URI");
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
  return knex.schema.dropTableIfExists("User_watched");
};
